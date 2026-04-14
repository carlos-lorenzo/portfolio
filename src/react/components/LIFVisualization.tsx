import { useState, useEffect, useRef } from 'react';

export default function LIFVisualization() {
    const [currentAmount, setCurrentAmount] = useState<number>(1.2);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const historyRef = useRef<number[]>(new Array(400).fill(0));
    const vRef = useRef<number>(0);
    const currentAmountRef = useRef<number>(currentAmount);

    useEffect(() => {
        currentAmountRef.current = currentAmount;
    }, [currentAmount]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        const tau = 20; 
        const vThresh = 1.0; 
        const vReset = 0.0; 
        const dt = 1; 
        const maxDisplayV = 1.3; 

        const draw = () => {
            const rect = canvas.getBoundingClientRect();
            if (canvas.width !== rect.width || canvas.height !== rect.height) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            }

            let v = vRef.current;
            const I = currentAmountRef.current;
            
            const dv = (-(v - vReset) + I) / tau * dt;
            v += dv;

            let spiked = false;
            if (v >= vThresh) {
                spiked = true;
                v = vReset; 
            }
            vRef.current = v;

            historyRef.current.push(spiked ? 1.2 : vRef.current);
            historyRef.current.shift();

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const threshY = canvas.height - (vThresh / maxDisplayV) * canvas.height;
            ctx.strokeStyle = 'rgba(244, 63, 94, 0.6)'; 
            ctx.setLineDash([5, 5]);
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(0, threshY);
            ctx.lineTo(canvas.width, threshY);
            ctx.stroke();
            
            ctx.fillStyle = 'rgba(244, 63, 94, 0.8)';
            ctx.font = '12px monospace';
            ctx.fillText('Threshold', 10, threshY - 5);

            ctx.setLineDash([]);
            ctx.strokeStyle = '#38bdf8'; 
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            
            const history = historyRef.current;
            const len = history.length;
            for (let i = 0; i < len; i++) {
                const x = (i / (len - 1)) * canvas.width;
                const y = canvas.height - (history[i] / maxDisplayV) * canvas.height;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            animationId = requestAnimationFrame(draw);
        };

        animationId = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animationId);
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
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: 'var(--text)' }}>Membrane Potential vs. Time</h3>
                <p style={{ margin: 0, opacity: 0.7, fontSize: '0.9rem' }}>
                    Simulating the LIF equation under a constant input current I(t).
                </p>
            </div>
            
            <canvas 
                ref={canvasRef} 
                style={{ 
                    width: '100%', 
                    height: '200px', 
                    background: 'rgba(0,0,0,0.3)', 
                    borderRadius: '8px',
                    display: 'block' 
                }} 
            />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', fontFamily: 'monospace', color: 'var(--accent)' }}>
                    Input Current I(t): {currentAmount.toFixed(2)}
                </label>
                <input 
                    type="range" 
                    min="0.5" 
                    max="3.0" 
                    step="0.05" 
                    value={currentAmount} 
                    onChange={(e) => setCurrentAmount(parseFloat(e.target.value))} 
                    style={{ width: '80%', maxWidth: '300px', cursor: 'pointer', accentColor: 'var(--accent)' }}
                />
            </div>
        </div>
    );
}
