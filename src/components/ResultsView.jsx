import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './components.css'

const personalities = {
    0: { title: "The Robot's Pet", desc: "You might actually be an AI yourself. Human art is a mystery to you." },
    1: { title: "Digital Driftwood", desc: "Floating in the sea of content without a compass." },
    2: { title: "Glitch Blind", desc: "Those extra fingers looked totally fine to you." },
    3: { title: "Casual Scroller", desc: "You stopped, you looked, but the algorithm won." },
    4: { title: "Uncertain Critic", desc: "Hard to tell the soul from the syntax sometimes." },
    5: { title: "The Coin Flipper", desc: "Perfectly balanced. Random chance is your best friend." },
    6: { title: "Texture Seeker", desc: "You're starting to see the real brushstrokes." },
    7: { title: "Pixel Hunter", desc: "You can spot a rogue artifact from a mile away." },
    8: { title: "Soul Searcher", desc: "You know human emotion when you see it." },
    9: { title: "The Connoisseur", desc: "Almost nothing gets past your trained eye." },
    10: { title: "The Visionary", desc: "You see the humanity that machines simply cannot mimic." }
}

export function ResultsView({ score, total, onRestart }) {
    const [revState, setRevState] = useState('hidden') // hidden, revealing, revealed
    const personality = personalities[score] || personalities[5]

    useEffect(() => {
        const timer = setTimeout(() => setRevState('revealing'), 400)
        const timer2 = setTimeout(() => setRevState('revealed'), 1500)
        return () => { clearTimeout(timer); clearTimeout(timer2); }
    }, [])

    const shareText = `I scored ${score}/${total} and got "${personality.title}" in Why Is Art? Can you spot the difference?`
    const shareUrl = window.location.origin // Dynamic current URL

    const [copied, setCopied] = useState(false)

    const handleNativeShare = async () => {
        // This is the functional "Share to Instagram" path on mobile
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'What Is Art?',
                    text: shareText,
                    url: shareUrl
                })
            } catch (err) {
                console.log('Share canceled', err)
            }
        } else {
            // Fallback if native share not supported
            handleCopy()
        }
    }

    const handleWhatsapp = () => {
        const url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
        window.open(url, '_blank')
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="results-container animate-fade-in center-all" style={{ flexDirection: 'column', height: '100%', padding: '0 20px', paddingBottom: '40px' }}>

            <div className="glass-panel" style={{ padding: '8px 16px', borderRadius: '50px', marginBottom: '2rem', border: '1px solid var(--text-tertiary)' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Assessment Complete</span>
            </div>

            <div className="score-circle glass-panel center-all" style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                marginBottom: '2.5rem',
                flexDirection: 'column',
                boxShadow: '0 0 30px rgba(0,0,0,0.5)',
                border: '2px solid var(--accent-color)'
            }}>
                <div style={{ fontSize: '4rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.05em' }}>{score}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 500, textTransform: 'uppercase' }}>out of {total}</div>
            </div>

            <div style={{ textAlign: 'center', minHeight: '120px' }}>
                {revState !== 'hidden' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 style={{
                            marginBottom: '0.5rem',
                            fontSize: '2.5rem',
                            fontWeight: 800,
                            color: 'white',
                            background: revState === 'revealing' ? 'linear-gradient(90deg, #fff, #444, #fff)' : 'none',
                            backgroundSize: '200% auto',
                            animation: revState === 'revealing' ? 'shimmer 2s linear infinite' : 'none',
                            WebkitBackgroundClip: revState === 'revealing' ? 'text' : 'none',
                            WebkitTextFillColor: revState === 'revealing' ? 'transparent' : 'white',
                        }}>
                            {revState === 'revealing' ? 'Analyzing...' : personality.title}
                        </h1>

                        {revState === 'revealed' && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{ maxWidth: '320px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}
                            >
                                {personality.desc}
                            </motion.p>
                        )}
                    </motion.div>
                )}
            </div>

            {/* Main Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '3rem', width: '100%', maxWidth: '300px' }}>

                <button
                    className="btn-primary"
                    onClick={onRestart}
                    style={{ padding: '16px 0', fontSize: '1rem' }}
                >
                    Play Again
                </button>

                {/* Share Section */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {/* WhatsApp */}
                    <button
                        className="glass-panel"
                        onClick={handleWhatsapp}
                        style={{
                            padding: '12px 0',
                            fontSize: '0.9rem',
                            color: '#fff',
                            backgroundColor: 'var(--bg-tertiary)',
                            border: '1px solid var(--text-tertiary)'
                        }}
                    >
                        WhatsApp
                    </button>

                    {/* Copy */}
                    <button
                        className="glass-panel"
                        onClick={handleCopy}
                        style={{
                            padding: '12px 0',
                            fontSize: '0.9rem',
                            backgroundColor: 'var(--bg-tertiary)',
                            border: '1px solid var(--text-tertiary)'
                        }}
                    >
                        {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                </div>

                {/* Native Share (Instagram Context) */}
                <button
                    className="glass-panel"
                    onClick={handleNativeShare}
                    style={{
                        padding: '12px 0',
                        fontSize: '0.9rem',
                        background: 'var(--gradient-glass)',
                        border: '1px solid var(--text-tertiary)',
                        color: 'white'
                    }}
                >
                    Share (Instagram / More)
                </button>

            </div>

        </div>
    )
}
