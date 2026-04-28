import { useState, useEffect, useRef } from 'react';

export default function EMGSignalVisualizer() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [filters, setFilters] = useState({ hpf: false, lpf: false, rms: false });
    const filtersRef = useRef(filters);

    useEffect(() => {
        filtersRef.current = filters;
    }, [filters]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let time = 0;
        const history: number[] = new Array(400).fill(0);
        let rmsState = 0;

        const draw = () => {
            const rect = canvas.getBoundingClientRect();
            if (canvas.width !== rect.width || canvas.height !== rect.height) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            }

            // Simulate baseline wander + 60Hz noise + EMG bursts
            const wander = Math.sin(time * 0.05) * 0.3;
            const noise = (Math.random() - 0.5) * 0.4;
            const powerline = Math.sin(time * 0.6) * 0.5;
            const isBurst = Math.sin(time * 0.02) > 0.5;
            const emgBurst = isBurst ? (Math.random() - 0.5) * 1.5 : 0;
            
            let signal = emgBurst;
            
            if (!filtersRef.current.hpf) {
                signal += wander;
            }
            if (!filtersRef.current.lpf) {
                signal += powerline + noise;
            } else {
                signal += noise * 0.15; // some residual noise after LPF
            }

            if (filtersRef.current.rms) {
                // Simple envelope follower simulation (rectify and low-pass)
                rmsState = 0.92 * rmsState + 0.08 * Math.abs(signal);
                signal = rmsState * 1.5; // Scale up for visual clarity
            } else {
                rmsState = 0; // reset filter state if deactivated
            }

            history.push(signal);
            history.shift();

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw center line
            const centerY = canvas.height / 2;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.setLineDash([5, 5]);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, centerY);
            ctx.lineTo(canvas.width, centerY);
            ctx.stroke();

            // Draw signal
            ctx.setLineDash([]);
            ctx.strokeStyle = filtersRef.current.rms ? '#f43f5e' : '#38bdf8'; 
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            const len = history.length;
            for (let i = 0; i < len; i++) {
                const x = (i / (len - 1)) * canvas.width;
                // scale signal
                const y = centerY - (history[i] * 40);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            time += 1;
            animationId = requestAnimationFrame(draw);
        };

        animationId = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animationId);
    }, []); // Empty dependency array means loop only starts once, preserving 'history' and 'time'

    const toggleFilter = (key: keyof typeof filters) => {
        setFilters(prev => ({ ...prev, [key]: !prev[key] }));
    };

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
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: 'var(--text)' }}>CUPPER Signal Chain</h3>
                <p style={{ margin: 0, opacity: 0.7, fontSize: '0.9rem' }}>
                    Simulated EMG signal through the analog front-end stages.
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

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                {(['hpf', 'lpf', 'rms'] as const).map(f => (
                    <button 
                        key={f}
                        onClick={() => toggleFilter(f)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            border: '1px solid',
                            borderColor: filters[f] ? '#f43f5e' : 'rgba(255,255,255,0.2)',
                            background: filters[f] ? 'rgba(244, 63, 94, 0.1)' : 'transparent',
                            color: filters[f] ? '#f43f5e' : 'inherit',
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontFamily: 'monospace'
                        }}
                    >
                        {f} : {filters[f] ? 'ON' : 'OFF'}
                    </button>
                ))}
            </div>
        </div>
    );
}
