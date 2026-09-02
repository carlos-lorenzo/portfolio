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
            ctx.strokeStyle = 'rgba(242, 111, 187, 0.55)'; 
            ctx.setLineDash([5, 5]);
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(0, threshY);
            ctx.lineTo(canvas.width, threshY);
            ctx.stroke();
            
            ctx.fillStyle = 'rgba(242, 111, 187, 0.8)';
            ctx.font = '12px monospace';
            ctx.fillText('Threshold', 10, threshY - 5);

            ctx.setLineDash([]);
            ctx.strokeStyle = '#79dcef'; 
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
        <figure className="win win--titled viz">
            <span className="win__t">lif_neuron</span>
            <p className="viz__lede">Simulating the LIF equation under a constant input current I(t).</p>
            
            <canvas ref={canvasRef} className="viz__canvas" />

            <div className="viz__controls">
                <label htmlFor="lif-input-current" className="viz__label">
                    Input Current I(t): {currentAmount.toFixed(2)}
                </label>
                <input 
                    id="lif-input-current"
                    type="range" 
                    min="0.5" 
                    max="3.0" 
                    step="0.05" 
                    value={currentAmount}
                    onChange={(e) => setCurrentAmount(parseFloat(e.target.value))}
                    className="viz__slider"
                    aria-label="Input Current I(t)"
                />
            </div>
        </figure>
    );
}
