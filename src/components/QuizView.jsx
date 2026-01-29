import { useState, useEffect } from 'react'
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

        if (isCorrect) setScore(s => s + 1)

        // Show Feedback
        setFeedback({
            type: isCorrect ? 'correct' : 'wrong',
            title: isCorrect ? 'Correct!' : 'Not quite.',
            explanation: currentCard.explanation,
            isReal: isReal
        })

        // Advance after delay
        // Note: In a real "stack", we might animate the card flying off. 
        // Here, we'll delay the INDEX update so the user sees the feedback, then reset.
    }

    const handleNext = () => {
        setFeedback(null)
        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(c => c + 1)
        } else {
            onGameEnd(score + (feedback?.type === 'correct' ? 1 : 0), questions.length)
            // Careful with score update: score state is async. 
            // But our score update was setScore(s => s+1). 
            // If we call onGameEnd NOW, 'score' might be stale in this render cycle?
            // Actually, handleNext is called via button click, so 'score' should be updated?
            // No, if handleNext is called instantly, maybe not. 
            // Safer: Pass calculated final score.

            // Actually: Score updates in handleSwipe. 
            // User stares at feedback.
            // THEN clicks Next.
            // So score IS updated.
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
                {/* We hide the card if feedback is showing? Or keep it visible? */}
                {/* Keep visible, maybe dimmed. */}
                <div style={{
                    opacity: feedback ? 0.2 : 1,
                    transition: 'opacity 0.3s',
                    pointerEvents: feedback ? 'none' : 'auto'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
                            Swipe Right = Real / Left = AI
                        </h3>
                    </div>

                    <SwipeCard
                        key={currentCard.id} // Re-mount on change to reset position
                        src={currentCard.src}
                        title={currentCard.title}
                        onSwipe={handleSwipe}
                        disabled={!!feedback}
                    />
                </div>

                {/* Feedback Overlay (Absolute centered) */}
                <AnimatePresence>
                    {feedback && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="glass-panel"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                x: '-50%',
                                y: '-50%',
                                width: '90%',
                                padding: '24px',
                                textAlign: 'center',
                                zIndex: 100,
                                border: `1px solid ${feedback.type === 'correct' ? 'var(--success-color)' : 'var(--error-color)'}`
                            }}
                        >
                            <h2 style={{ color: feedback.type === 'correct' ? 'var(--success-color)' : 'var(--error-color)', marginBottom: '8px' }}>
                                {feedback.title}
                            </h2>
                            <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>
                                It was {feedback.isReal ? 'Real Art' : 'AI Generated'}.
                            </p>
                            <p style={{ fontSize: '0.95rem', marginBottom: '24px' }}>
                                {feedback.explanation}
                            </p>

                            <button
                                className="btn-primary"
                                onClick={handleNext}
                                style={{ width: '100%' }}
                            >
                                Continue
                            </button>

                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    )
}
