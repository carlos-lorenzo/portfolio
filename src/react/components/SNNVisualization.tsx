import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

export default function SNNVisualization() {
    const [spikes, setSpikes] = useState<number[]>([])
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        // Simple stochastic spike generator
        const interval = setInterval(() => {
            if (Math.random() > 0.65) {
                setSpikes((s) => [...s.slice(-10), Date.now()])
                setIsActive(true)
                setTimeout(() => setIsActive(false), 150)
            }
        }, 300)
        return () => clearInterval(interval)
    }, [])

    return (
        <figure className="win win--titled viz">
            <span className="win__t">sparse_spiking</span>
            <span className="win__s">
                <i className="pip" /> firing
            </span>

            <div className="viz__stage">
                <motion.div
                    className="viz__soma"
                    animate={{ scale: isActive ? 1.25 : 1 }}
                    transition={{ duration: 0.1 }}
                    data-active={isActive || undefined}
                />

                <div className="viz__axon">
                    {spikes.map((time) => (
                        <motion.div
                            key={time}
                            className="viz__spike"
                            initial={{ left: '0%', opacity: 1 }}
                            animate={{ left: '100%', opacity: 0 }}
                            transition={{ duration: 1.5, ease: 'linear' }}
                        />
                    ))}
                </div>
            </div>

            <figcaption className="viz__caption">
                The neuron isn&apos;t firing constantly.
            </figcaption>
        </figure>
    )
}
