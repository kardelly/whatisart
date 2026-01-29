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
    // Session Logic: Create a Mixed Deck
    const uniqueMap = new Map()
    questionPool.forEach(q => {
      const baseId = q.id.replace('_2', '')
      if (!uniqueMap.has(baseId)) uniqueMap.set(baseId, q)
    })

    const uniques = Array.from(uniqueMap.values())
    const selectedPairs = uniques.sort(() => Math.random() - 0.5).slice(0, 5)

    let deck = []
    selectedPairs.forEach(pair => {
      deck.push({
        id: pair.images.find(i => i.type === 'real').id,
        src: pair.images.find(i => i.type === 'real').src,
        type: 'real',
        title: pair.title,
        explanation: pair.explanation
      })
      deck.push({
        id: pair.images.find(i => i.type === 'ai').id,
        src: pair.images.find(i => i.type === 'ai').src,
        type: 'ai',
        title: pair.title,
        explanation: pair.explanation
      })
    })

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
