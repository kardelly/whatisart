import { useState, useEffect } from 'react'
import realStarry from '../assets/images/real_starry.jpg'
import realLilies from '../assets/images/real_lilies.jpg'
import realPearl from '../assets/images/real_pearl.jpg'
import realWave from '../assets/images/real_wave.jpg'
import realKiss from '../assets/images/real_kiss.jpg'
import './glitch.css'

const images = [realStarry, realLilies, realPearl, realWave, realKiss]

export function GlitchBackground() {
    const [currentImage, setCurrentImage] = useState(0)

    useEffect(() => {
        // Change image every 3 seconds
        const interval = setInterval(() => {
            setCurrentImage(prev => (prev + 1) % images.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="glitch-container">
            {/* Background Image Layer */}
            <div
                className="glitch-image"
                style={{ backgroundImage: `url(${images[currentImage]})` }}
            />

            {/* Glitch Overlay Layer (Copy for effect) */}
            <div
                className="glitch-image glitch-effect"
                style={{ backgroundImage: `url(${images[currentImage]})` }}
            />

            {/* Scanline / Darken Overlay */}
            <div className="scanlines"></div>
        </div>
    )
}
