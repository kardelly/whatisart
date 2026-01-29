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

const masterPool = [
    {
        id: 'starry',
        title: "Starry Night Style",
        images: [
            { id: 'real_starry', src: realStarry, type: 'real' },
            { id: 'ai_starry', src: aiStarry, type: 'ai' }
        ],
        explanation: "Van Gogh's impasto usage is distinctively chaotic yet controlled."
    },
    {
        id: 'lilies',
        title: "Water Lilies",
        images: [
            { id: 'ai_lilies', src: aiLilies, type: 'ai' },
            { id: 'real_lilies', src: realLilies, type: 'real' }
        ],
        explanation: "Monet's loose brushwork captures light, not just form."
    },
    {
        id: 'pearl',
        title: "Girl with a Pearl Earring",
        images: [
            { id: 'real_pearl', src: realPearl, type: 'real' },
            { id: 'ai_pearl', src: aiPearl, type: 'ai' }
        ],
        explanation: "Vermeer's mastery of light (chiaroscuro) is subtle, while AI often over-smooths skin textures."
    },
    {
        id: 'wave',
        title: "The Great Wave",
        images: [
            { id: 'real_wave', src: realWave, type: 'real' },
            { id: 'ai_wave', src: aiWave, type: 'ai' }
        ],
        explanation: "Hokusai's woodblock lines are sharp and deliberate. AI often mistakes the foam for random noise or adds odd artifacts."
    },
    {
        id: 'kiss',
        title: "The Kiss",
        images: [
            { id: 'real_kiss', src: realKiss, type: 'real' },
            { id: 'ai_kiss', src: aiKiss, type: 'ai' }
        ],
        explanation: "Klimt's gold leaf patterns are intricate and specific. AI struggles with the consistent geometry of the patterns."
    },
    {
        id: 'jatte',
        title: "La Grande Jatte",
        images: [
            { id: 'real_jatte', src: realJatte, type: 'real' },
            { id: 'ai_jatte', src: aiJatte, type: 'ai' }
        ],
        explanation: "Seurat's pointillism consists of distinct dots of color. AI simulation often blends them into a digital noise filter."
    }
]

// To satisfy the 10 questions requirement with only 6 unique pairs, 
// we double the pool for now.
export const questions = [...masterPool, ...masterPool.map(q => ({ ...q, id: q.id + '_2' }))]
