import { useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import './components.css'

export function SwipeCard({ src, title, onSwipe, disabled }) {
    const x = useMotionValue(0)
    const rotate = useTransform(x, [-200, 200], [-25, 25])
    const opacityReal = useTransform(x, [50, 150], [0, 1])
    const opacityAI = useTransform(x, [-150, -50], [1, 0])
    const [loaded, setLoaded] = useState(false)

    const handleDragEnd = (event, info) => {
        if (disabled) return
        const offset = info.offset.x
        const velocity = info.velocity.x

        // Threshold to trigger swipe
        if (offset > 100 || velocity > 500) {
            onSwipe('right')
        } else if (offset < -100 || velocity < -500) {
            onSwipe('left')
        }
    }

    return (
        <motion.div
            className="swipe-card-container"
            style={{ x, rotate, touchAction: 'none' }}
            drag={disabled ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            whileTap={{ cursor: "grabbing" }}
        >
            <div className="swipe-card-content">
                {!loaded && <div className="skeleton absolute-fill" />}
                <img
                    src={src}
                    alt={title}
                    onLoad={() => setLoaded(true)}
                    className={loaded ? 'fade-in' : 'hidden'}
                    draggable="false"
                />

                {/* Feedback Overlays */}
                <motion.div className="swipe-overlay real" style={{ opacity: opacityReal }}>
                    <span>REAL ART</span>
                </motion.div>

                <motion.div className="swipe-overlay ai" style={{ opacity: opacityAI }}>
                    <span>AI GENERATED</span>
                </motion.div>
            </div>
        </motion.div>
    )
}
