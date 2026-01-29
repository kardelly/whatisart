import './components.css'

export function ProgressBar({ current, total }) {
    const progress = Math.min(((current) / total) * 100, 100)

    return (
        <div className="progress-container">
            <div className="progress-label">
                <span>Question {current} / {total}</span>
            </div>
            <div className="progress-track">
                <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    )
}
