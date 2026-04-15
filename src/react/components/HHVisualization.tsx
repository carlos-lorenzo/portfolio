import { useState, useEffect, useRef } from 'react';

export default function HHVisualization() {
    // Input is microA/cm^2 (typical HH units)
    const [inputCurrent, setInputCurrent] = useState<number>(10);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const historyRef = useRef<number[]>(new Array(800).fill(-65));

    // HH state: V (mV), m, h, n
    const stateRef = useRef({ V: -65, m: 0, h: 0, n: 0 });
    const inputRef = useRef<number>(inputCurrent);

    useEffect(() => { inputRef.current = inputCurrent; }, [inputCurrent]);

    // HH parameters (classic Hodgkin-Huxley)
    const Cm = 1.0; // uF/cm^2
    const gNa = 120; // mS/cm^2
    const gK = 36;
    const gL = 0.3;
    const ENa = 50;
    const EK = -77;
    const EL = -54.387;

    // helper: alpha/beta rates (V in mV)
    function alpha_n(V: number) { return 0.01 * (V + 55) / (1 - Math.exp(-(V + 55) / 10)); }
    function beta_n(V: number) { return 0.125 * Math.exp(-(V + 65) / 80); }
    function alpha_m(V: number) { return 0.1 * (V + 40) / (1 - Math.exp(-(V + 40) / 10)); }
    function beta_m(V: number) { return 4 * Math.exp(-(V + 65) / 18); }
    function alpha_h(V: number) { return 0.07 * Math.exp(-(V + 65) / 20); }
    function beta_h(V: number) { return 1 / (1 + Math.exp(-(V + 35) / 10)); }

    // initialize gating vars to steady state for V = -65
    useEffect(() => {
        const V0 = stateRef.current.V;
        const an = alpha_n(V0), bn = beta_n(V0);
        const am = alpha_m(V0), bm = beta_m(V0);
        const ah = alpha_h(V0), bh = beta_h(V0);
        stateRef.current.n = an / (an + bn);
        stateRef.current.m = am / (am + bm);
        stateRef.current.h = ah / (ah + bh);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let raf = 0;

        // integration settings
        const dt = 0.05; // ms per internal step
        const stepsPerFrame = 6; // control visual speed vs accuracy

        // derivatives for RK4
        function derivatives(s: { V: number; m: number; h: number; n: number }, I: number) {
            const V = s.V;
            const m = s.m;
            const h = s.h;
            const n = s.n;

            const INa = gNa * Math.pow(m, 3) * h * (V - ENa);
            const IK = gK * Math.pow(n, 4) * (V - EK);
            const IL = gL * (V - EL);

            const dV = ( -INa - IK - IL + I ) / Cm;
            const dm = alpha_m(V) * (1 - m) - beta_m(V) * m;
            const dh = alpha_h(V) * (1 - h) - beta_h(V) * h;
            const dn = alpha_n(V) * (1 - n) - beta_n(V) * n;

            return { dV, dm, dh, dn };
        }

        function rk4_step(s: { V: number; m: number; h: number; n: number }, I: number, hstep: number) {
            const k1 = derivatives(s, I);
            const s2 = { V: s.V + 0.5 * hstep * k1.dV, m: s.m + 0.5 * hstep * k1.dm, h: s.h + 0.5 * hstep * k1.dh, n: s.n + 0.5 * hstep * k1.dn };
            const k2 = derivatives(s2, I);
            const s3 = { V: s.V + 0.5 * hstep * k2.dV, m: s.m + 0.5 * hstep * k2.dm, h: s.h + 0.5 * hstep * k2.dh, n: s.n + 0.5 * hstep * k2.dn };
            const k3 = derivatives(s3, I);
            const s4 = { V: s.V + hstep * k3.dV, m: s.m + hstep * k3.dm, h: s.h + hstep * k3.dh, n: s.n + hstep * k3.dn };
            const k4 = derivatives(s4, I);

            s.V += (hstep / 6) * (k1.dV + 2 * k2.dV + 2 * k3.dV + k4.dV);
            s.m += (hstep / 6) * (k1.dm + 2 * k2.dm + 2 * k3.dm + k4.dm);
            s.h += (hstep / 6) * (k1.dh + 2 * k2.dh + 2 * k3.dh + k4.dh);
            s.n += (hstep / 6) * (k1.dn + 2 * k2.dn + 2 * k3.dn + k4.dn);
        }

        function step() {
            const s = stateRef.current;
            const I = inputRef.current;
            // perform several small RK4 steps per animation frame
            for (let k = 0; k < stepsPerFrame; k++) {
                rk4_step(s, I, dt);
            }
            historyRef.current.push(s.V);
            historyRef.current.shift();
        }

        function draw() {
            const rect = canvas.getBoundingClientRect();
            if (canvas.width !== rect.width || canvas.height !== rect.height) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            }

            // advance simulation
            step();

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // draw threshold (approx visual threshold at -40 mV)
            const minV = -90;
            const maxV = 60;
            const vThresh = -40;
            const threshY = canvas.height - ((vThresh - minV) / (maxV - minV)) * canvas.height;
            ctx.strokeStyle = 'rgba(244, 63, 94, 0.6)';
            ctx.setLineDash([5, 5]);
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(0, threshY);
            ctx.lineTo(canvas.width, threshY);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = 'rgba(244, 63, 94, 0.8)';
            ctx.font = '12px monospace';
            ctx.fillText('Approx. excitation threshold', 10, threshY - 6);

            // draw V trace
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            const hist = historyRef.current;
            const len = hist.length;
            for (let i = 0; i < len; i++) {
                const x = (i / (len - 1)) * canvas.width;
                const V = hist[i];
                const y = canvas.height - ((V - minV) / (maxV - minV)) * canvas.height;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            // label
            ctx.fillStyle = 'rgba(255,255,255,0.9)';
            ctx.font = '12px monospace';
            ctx.fillText(`I = ${inputRef.current.toFixed(2)} μA/cm²`, 10, 16);

            // small axis markers
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.font = '11px monospace';
            ctx.fillText(`${maxV} mV`, canvas.width - 60, 16);
            ctx.fillText(`${minV} mV`, canvas.width - 60, canvas.height - 6);

            raf = requestAnimationFrame(draw);
        }

        raf = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '2rem',
            borderRadius: '12px',
            margin: '2rem 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
        }}>
            <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: 'var(--text)' }}>Hodgkin–Huxley (RK4)</h3>
                <p style={{ margin: 0, opacity: 0.7, fontSize: '0.9rem' }}>
                    A standard Hodgkin-Huxley single-neuron solver (RK4). Slider controls injected current (μA/cm²).
                </p>
            </div>

            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '220px',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '8px',
                    display: 'block'
                }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <label htmlFor="hh-input-current" style={{ fontSize: '0.9rem', fontFamily: 'monospace', color: 'var(--accent)' }}>
                    Injected Current I: {inputCurrent.toFixed(2)} μA/cm²
                </label>
                <input
                    id="hh-input-current"
                    type="range"
                    min={0}
                    max={15}
                    step={0.1}
                    value={inputCurrent}
                    onChange={(e) => setInputCurrent(parseFloat(e.target.value))}
                    style={{ width: 320 }}
                    aria-label="Hodgkin-Huxley injected current"
                />
            </div>
        </div>
    );
}
