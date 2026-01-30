import { useState } from 'react'
import { QuizView } from './components/QuizView'
import { ResultsView } from './components/ResultsView'
import { GlitchBackground } from './components/GlitchBackground'
import { questions as questionPool } from './data/questions'
import './index.css'

function App() {
  const [gameState, setGameState] = useState('home') // home, quiz, results
  const [gameResult, setGameResult] = useState({ score: 0, total: 0 })
  const [sessionQuestions, setSessionQuestions] = useState([])

  const startQuiz = () => {
    // Session Logic: 1 pair per round (2 cards)
    // Use a Map to get unique pieces by their base ID (ignoring the '_2' duplicates)
    const uniquePieces = new Map()
    questionPool.forEach(q => {
      const baseId = q.id.replace('_2', '')
      if (!uniquePieces.has(baseId)) {
        uniquePieces.set(baseId, q)
      }
    })

    const deck = Array.from(uniquePieces.values()).map(piece => {
      // Pick one random image from this piece (Real or AI)
      const randomImg = piece.images[Math.floor(Math.random() * piece.images.length)]
      return {
        id: randomImg.id,
        src: randomImg.src,
        type: randomImg.type,
        title: piece.title,
        artist: piece.artist,
        explanation: piece.explanation
      }
    })

    // Shuffle the 10 unique pieces
    setSessionQuestions(deck.sort(() => Math.random() - 0.5))
    setGameState('quiz')
  }

  const handleGameEnd = (score, total) => {
    setGameResult({ score, total })
    setGameState('results')
  }

  const restartGame = () => {
    setGameState('home')
  }

  return (
    <div className="container">
      {gameState === 'home' && (
        <>
          <GlitchBackground />
          <div className="animate-fade-in center-all" style={{ flex: 1, flexDirection: 'column', zIndex: 2, position: 'relative' }}>

            <header className="glass-panel" style={{ padding: '1rem 2rem', marginBottom: '3rem', display: 'inline-block', border: '1px solid rgba(255,255,255,0.2)' }}>
              <h1 style={{ fontSize: 'var(--font-size-xl)', margin: 0 }}>What Is Art?</h1>
            </header>

            <div style={{ marginBottom: '4rem', padding: '0 1rem' }}>
              <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Can you distinguish human emotion from algorithm? <br />
                <span style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-base)' }}>Test your eye against the machine.</span>
              </p>
            </div>

            <button
              className="btn-primary"
              style={{
                padding: '16px 48px',
                fontSize: 'var(--font-size-base)',
                borderRadius: 'var(--radius-sm)'
              }}
              onClick={startQuiz}
            >
              Start Challenge
            </button>
          </div>
        </>
      )}

      {gameState === 'quiz' && (
        <QuizView
          questions={sessionQuestions}
          onGameEnd={handleGameEnd}
        />
      )}

      {gameState === 'results' && (
        <ResultsView
          score={gameResult.score}
          total={gameResult.total}
          onRestart={restartGame}
        />
      )}
    </div>
  )
}

export default App
