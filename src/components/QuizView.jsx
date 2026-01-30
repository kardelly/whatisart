import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { SwipeCard } from './SwipeCard'
import { ProgressBar } from './ProgressBar'
import { motion, AnimatePresence } from 'framer-motion'
import './components.css'

export function QuizView({ questions, onGameEnd }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [feedback, setFeedback] = useState(null) // { type: 'correct'|'wrong', title: string, explanation: string }

    const currentCard = questions[currentIndex]

    const handleSwipe = (direction) => {
        // direction: 'left' (AI) or 'right' (REAL)
        const isReal = currentCard.type === 'real'
        const isAi = currentCard.type === 'ai'

        let isCorrect = false
        if (direction === 'right' && isReal) isCorrect = true
        if (direction === 'left' && isAi) isCorrect = true

        if (isCorrect) {
            setScore(s => s + 1)
        }

        // Haptic feedback if supported
        if ('vibrate' in navigator) navigator.vibrate(isCorrect ? 20 : [50, 50, 50])

        // Show Feedback
        setFeedback({
            type: isCorrect ? 'correct' : 'wrong',
            title: isCorrect ? 'Correct!' : 'Not quite.',
            explanation: currentCard.explanation,
            isReal: isReal,
            artist: currentCard.artist,
            src: currentCard.src
        })
    }

    const handleNext = () => {
        setFeedback(null)
        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(c => c + 1)
        } else {
            onGameEnd(score, questions.length)
        }
    }

    // Pre-load next image for performance
    useEffect(() => {
        if (currentIndex + 1 < questions.length) {
            const img = new Image()
            img.src = questions[currentIndex + 1].src
        }
    }, [currentIndex, questions])


    if (!currentCard) return null

    return (
        <div className="quiz-container animate-fade-in" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <ProgressBar current={currentIndex + 1} total={questions.length} />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>

                {/* The Card */}
                <div style={{
                    opacity: feedback ? 0.2 : 1,
                    transition: 'opacity 0.3s',
                    pointerEvents: feedback ? 'none' : 'auto'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            This is Real or AI?
                        </h3>
                    </div>

                    <SwipeCard
                        key={currentCard.id}
                        src={currentCard.src}
                        title={currentCard.title}
                        onSwipe={handleSwipe}
                        disabled={!!feedback}
                        isFirstCard={currentIndex === 0}
                    />

                    <div style={{ textAlign: 'center', marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', padding: '0 1rem' }}>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', fontWeight: '500', letterSpacing: '0.05em' }}>
                            ← AI GENERATED
                        </p>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', fontWeight: '500', letterSpacing: '0.05em' }}>
                            REAL ART →
                        </p>
                    </div>
                </div>

                {/* Feedback Overlay via Portal */}
                {createPortal(
                    <AnimatePresence>
                        {feedback && (
                            <motion.div
                                key="feedback-backdrop"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    width: '100vw',
                                    height: '100vh',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 9999,
                                    background: 'rgba(0,0,0,0.6)',
                                    backdropFilter: 'blur(8px)'
                                }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="glass-panel"
                                    style={{
                                        width: 'min(450px, 90%)',
                                        padding: '32px 24px',
                                        textAlign: 'center',
                                        border: `1px solid ${feedback.type === 'correct' ? 'var(--success-color)' : 'var(--error-color)'}`,
                                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                                        background: 'rgba(20, 20, 20, 0.98)',
                                        position: 'relative'
                                    }}
                                >
                                    <h2 style={{ color: feedback.type === 'correct' ? 'var(--success-color)' : 'var(--error-color)', marginBottom: '8px', fontSize: '2rem' }}>
                                        {feedback.title}
                                    </h2>
                                    <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px', fontSize: '1.1rem' }}>
                                        It was {feedback.isReal ? `a real work by ${feedback.artist}` : 'AI Generated'}.
                                    </p>

                                    {/* Thumbnail for Context */}
                                    <div style={{
                                        width: '100%',
                                        height: '160px',
                                        borderRadius: 'var(--radius-sm)',
                                        overflow: 'hidden',
                                        marginBottom: '20px',
                                        border: '1px solid var(--bg-tertiary)',
                                        background: 'var(--bg-secondary)'
                                    }}>
                                        <img
                                            src={feedback.src}
                                            alt="Artwork Thumbnail"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>

                                    <p style={{ fontSize: '0.95rem', marginBottom: '24px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                        {feedback.explanation}
                                    </p>

                                    <button
                                        className="btn-primary"
                                        onClick={handleNext}
                                        style={{ width: '100%', padding: '16px', fontWeight: 'bold' }}
                                    >
                                        Continue Challenge
                                    </button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}

            </div>
        </div>
    )
}
