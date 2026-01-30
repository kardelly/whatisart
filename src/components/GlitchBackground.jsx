import { useState, useEffect } from 'react'
import realStarry from '../assets/images/real_starry.jpg'
import realLilies from '../assets/images/real_lilies.jpg'
import realPearl from '../assets/images/real_pearl.jpg'
import realWave from '../assets/images/real_wave.jpg'
import realKiss from '../assets/images/real_kiss.jpg'
import realJatte from '../assets/images/real_jatte.jpg'
import realFountain from '../assets/images/real_fountain.jpg'
import realHead from '../assets/images/real_head.jpg'
import realVarejao from '../assets/images/real_varejao.jpg'
import realCuca from '../assets/images/real_cuca.jpg'
import './glitch.css'

const images = [
    realStarry, realLilies, realPearl, realWave, realKiss,
    realJatte, realFountain, realHead, realVarejao, realCuca
]

export function GlitchBackground({ isIntense }) {
    const [currentImage, setCurrentImage] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [isLosingSignal, setIsLosingSignal] = useState(false)

    // Cycle Images with TV "Loss of Signal" Effect
    useEffect(() => {
        const interval = setInterval(() => {
            // 1. Start losing signal (noise builds up)
            setIsLosingSignal(true)

            setTimeout(() => {
                // 2. Total loss (moment of pure static) + Image Swap
                setCurrentImage(prev => (prev + 2) % images.length)
                setIsLosingSignal(false)
                setIsTransitioning(true)
            }, 200)

            setTimeout(() => {
                // 3. Regain signal (roll effect settles)
                setIsTransitioning(false)
            }, 700)

        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div
            className={`glitch-container ${isIntense ? 'intense' : ''} ${isLosingSignal ? 'signal-loss' : ''} ${isTransitioning ? 'transitioning' : ''}`}
            style={{ backgroundImage: `url(${images[currentImage]})` }}
        >
            {/* Black Filter Overlay */}
            <div className="black-overlay" />

            {/* Base Layer */}
            <div className="glitch-img" style={{ backgroundImage: `url(${images[currentImage]})` }} />

            {/* Exclusion/Glitch Layers */}
            <div className="glitch-layer" style={{ backgroundImage: `url(${images[currentImage]})` }} />
            <div className="glitch-layer" style={{ backgroundImage: `url(${images[currentImage]})` }} />
            <div className="glitch-layer" style={{ backgroundImage: `url(${images[currentImage]})` }} />

            <div className={`glitch-flash ${isTransitioning ? 'active' : ''}`} />
            <div className="scanlines"></div>
            <div className="noise-flicker"></div>
            <div className="noise-flicker move"></div>
        </div>
    )
}
