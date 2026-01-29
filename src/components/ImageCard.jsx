import { useState } from 'react'
import './components.css'

export function ImageCard({ src, alt, onClick, disabled, result, type }) {
    const [loaded, setLoaded] = useState(false)

    // result can be 'correct' or 'wrong' based on the selection logic
    // type is 'real' or 'ai' - helpful for debugging or explicit reveals

    return (
        <div className={`image-card-container ${result ? 'has-result' : ''}`}>
            <button
                className={`image-card ${result ? result : ''}`}
                onClick={onClick}
                disabled={disabled}
                aria-label={alt}
            >
                {!loaded && <div className="skeleton absolute-fill" />}
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    onLoad={() => setLoaded(true)}
                    className={loaded ? 'fade-in' : 'hidden'}
                />

                {/* Reveal Overlay - Only shown when result is present */}
                {result && (
                    <div className={`reveal-overlay ${result}`}>
                        <span className="reveal-text">
                            {type === 'real' ? 'Real Art' : 'AI Generated'}
                        </span>
                    </div>
                )}
            </button>
        </div>
    )
}
