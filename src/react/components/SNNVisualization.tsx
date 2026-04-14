import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function SNNVisualization() {
    const [spikes, setSpikes] = useState<number[]>([]);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        // Simple stochastic spike generator
        const interval = setInterval(() => {
            if (Math.random() > 0.65) {
                const now = Date.now();
                setSpikes(s => [...s.slice(-10), now]);
                setIsActive(true);
                setTimeout(() => setIsActive(false), 150); // Reset visual state
            }
        }, 300);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ 
            padding: '2rem', 
            background: 'rgba(255, 255, 255, 0.05)', 
            borderRadius: '12px', 
            margin: '2rem 0', 
            border: '1px solid rgba(255,255,255,0.1)' 
        }}>
            <h3 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.1rem', opacity: 0.9 }}>
                Sparse Spiking Visualisation
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', minHeight: '60px' }}>
                <motion.div
                    animate={{ 
                        scale: isActive ? 1.3 : 1, 
                        backgroundColor: isActive ? '#38bdf8' : '#1e293b' 
                    }}
                    transition={{ duration: 0.1 }}
                    style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '50%', 
                        boxShadow: isActive ? '0 0 15px #38bdf8' : 'none',
                        flexShrink: 0
                    }}
                />
                <div style={{ flex: 1, height: '2px', background: 'rgba(255,255,255,0.2)', position: 'relative' }}>
                    {spikes.map(time => (
                        <motion.div
                            key={time}
                            initial={{ left: '0%', opacity: 1 }}
                            animate={{ left: '100%', opacity: 0 }}
                            transition={{ duration: 1.5, ease: 'linear' }}
                            style={{ 
                                position: 'absolute', 
                                top: '-10px', 
                                width: '4px', 
                                height: '22px', 
                                background: '#38bdf8', 
                                borderRadius: '2px' 
                            }}
                        />
                    ))}
                </div>
            </div>
            <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', opacity: 0.6, fontFamily: 'var(--font-mono, monospace)', margin: 0 }}>
                The neuron isn't firing constantly.
            </p>
        </div>
    );
}