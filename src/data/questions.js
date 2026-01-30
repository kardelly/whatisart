import realStarry from '../assets/images/real_starry.jpg'
import aiStarry from '../assets/images/ai_starry.png'
import realLilies from '../assets/images/real_lilies.jpg'
import aiLilies from '../assets/images/ai_lilies.png'
import realPearl from '../assets/images/real_pearl.jpg'
import aiPearl from '../assets/images/ai_pearl.png'
import realWave from '../assets/images/real_wave.jpg'
import aiWave from '../assets/images/ai_wave.png'
import realKiss from '../assets/images/real_kiss.jpg'
import aiKiss from '../assets/images/ai_kiss.png'
import realJatte from '../assets/images/real_jatte.jpg'
import aiJatte from '../assets/images/ai_jatte.png'
import realFountain from '../assets/images/real_fountain.jpg'
import aiFountain from '../assets/images/ai_fountain.png'
import realHead from '../assets/images/real_head.jpg'
import aiHead from '../assets/images/ai_head.png'
import realVarejao from '../assets/images/real_varejao.jpg'
import aiVarejao from '../assets/images/ai_varejao.png'
import realCuca from '../assets/images/real_cuca.jpg'
import aiCuca from '../assets/images/ai_cuca.png'

const masterPool = [
    {
        id: 'starry',
        title: "Starry Night Style",
        artist: "Vincent van Gogh",
        images: [
            { id: 'real_starry', src: realStarry, type: 'real' },
            { id: 'ai_starry', src: aiStarry, type: 'ai' }
        ],
        explanation: "Van Gogh's impasto usage is distinctively chaotic yet controlled."
    },
    {
        id: 'lilies',
        title: "Water Lilies",
        artist: "Claude Monet",
        images: [
            { id: 'ai_lilies', src: aiLilies, type: 'ai' },
            { id: 'real_lilies', src: realLilies, type: 'real' }
        ],
        explanation: "Monet's loose brushwork captures light, not just form."
    },
    {
        id: 'pearl',
        title: "Girl with a Pearl Earring",
        artist: "Johannes Vermeer",
        images: [
            { id: 'real_pearl', src: realPearl, type: 'real' },
            { id: 'ai_pearl', src: aiPearl, type: 'ai' }
        ],
        explanation: "Vermeer's mastery of light (chiaroscuro) is subtle, while AI often over-smooths skin textures."
    },
    {
        id: 'wave',
        title: "The Great Wave",
        artist: "Katsushika Hokusai",
        images: [
            { id: 'real_wave', src: realWave, type: 'real' },
            { id: 'ai_wave', src: aiWave, type: 'ai' }
        ],
        explanation: "Hokusai's woodblock lines are sharp and deliberate. AI often mistakes the foam for random noise or adds odd artifacts."
    },
    {
        id: 'kiss',
        title: "The Kiss",
        artist: "Gustav Klimt",
        images: [
            { id: 'real_kiss', src: realKiss, type: 'real' },
            { id: 'ai_kiss', src: aiKiss, type: 'ai' }
        ],
        explanation: "Klimt's gold leaf patterns are intricate and specific. AI struggles with the consistent geometry of the patterns."
    },
    {
        id: 'jatte',
        title: "La Grande Jatte",
        artist: "Georges Seurat",
        images: [
            { id: 'real_jatte', src: realJatte, type: 'real' },
            { id: 'ai_jatte', src: aiJatte, type: 'ai' }
        ],
        explanation: "Seurat's pointillism consists of distinct dots of color. AI simulation often blends them into a digital noise filter."
    },
    {
        id: 'fountain',
        title: "Fountain",
        artist: "Marcel Duchamp",
        images: [
            { id: 'real_fountain', src: realFountain, type: 'real' },
            { id: 'ai_fountain', src: aiFountain, type: 'ai' }
        ],
        explanation: "Duchamp's readymade is a porcelain urinal signed 'R. Mutt 1917'. It challenged the very definition of what art is."
    },
    {
        id: 'head',
        title: "Untitled (Head)",
        artist: "Jean-Michel Basquiat",
        images: [
            { id: 'real_head', src: realHead, type: 'real' },
            { id: 'ai_head', src: aiHead, type: 'ai' }
        ],
        explanation: "Basquiat's raw, neo-expressionist lines and frantic energy are difficult for AI to replicate without looking overly procedural."
    },
    {
        id: 'varejao',
        title: "Otros Cuerpos Detrás",
        artist: "Adriana Varejão",
        images: [
            { id: 'real_varejao', src: realVarejao, type: 'real' },
            { id: 'ai_varejao', src: aiVarejao, type: 'ai' }
        ],
        explanation: "Varejão's work explores the physicality of painting, often revealing 'meat' or internal structures behind colonial tiles. AI struggles with these complex, layered textures."
    },
    {
        id: 'cuca',
        title: "A Cuca",
        artist: "Tarsila do Amaral",
        images: [
            { id: 'real_cuca', src: realCuca, type: 'real' },
            { id: 'ai_cuca', src: aiCuca, type: 'ai' }
        ],
        explanation: "Tarsila's Brazilian Modernism uses bold, flat colors and stylized, dreamlike creatures. AI often over-complicates the simplicity or adds digital gradients that lose the 'flat' aesthetic."
    }
]

// To satisfy the 10 questions requirement with only 6 unique pairs, 
// we double the pool for now.
export const questions = [...masterPool, ...masterPool.map(q => ({ ...q, id: q.id + '_2' }))]
