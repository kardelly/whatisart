import { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion'
import './components.css'

export function SwipeCard({ src, title, onSwipe, disabled, isFirstCard }) {
    const x = useMotionValue(0)
    const rotate = useTransform(x, [-200, 200], [-30, 30])
    const scale = useTransform(x, [-150, 0, 150], [0.95, 1, 0.95])
    const opacityReal = useTransform(x, [0, 60, 120], [0, 0, 1])
    const opacityAI = useTransform(x, [-120, -60, 0], [1, 0, 0])
    const [loaded, setLoaded] = useState(false)
    const controls = useAnimation()

    // Tutorial animation for first card
    useEffect(() => {
        if (isFirstCard && !disabled) {
            const runTutorial = async () => {
                // Wait a bit before starting
                await new Promise(resolve => setTimeout(resolve, 800))

                // Animate right
                await controls.start({
                    x: 80,
                    transition: { duration: 0.6, ease: "easeInOut" }
                })

                // Return to center
                await controls.start({
                    x: 0,
                    transition: { duration: 0.4, ease: "easeInOut" }
                })

                // Wait a bit
                await new Promise(resolve => setTimeout(resolve, 200))

                // Animate left
                await controls.start({
                    x: -80,
                    transition: { duration: 0.6, ease: "easeInOut" }
                })

                // Return to center
                await controls.start({
                    x: 0,
                    transition: { duration: 0.4, ease: "easeInOut" }
                })
            }

            runTutorial()
        }
    }, [isFirstCard, disabled, controls])

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
            style={{ x, rotate, scale, touchAction: 'none' }}
            animate={controls}
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
                <motion.div
                    className="swipe-overlay real"
                    style={{
                        opacity: opacityReal,
                        scale: useTransform(x, [0, 150], [0.5, 1.2]),
                        x: "-50%",
                        y: "-50%"
                    }}
                >
                    <span>REAL ART</span>
                </motion.div>

                <motion.div
                    className="swipe-overlay ai"
                    style={{
                        opacity: opacityAI,
                        scale: useTransform(x, [0, -150], [0.5, 1.2]),
                        x: "-50%",
                        y: "-50%"
                    }}
                >
                    <span>AI IMAGE</span>
                </motion.div>
            </div>
        </motion.div>
    )
}
