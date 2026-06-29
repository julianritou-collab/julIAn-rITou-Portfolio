import LandingBanner from '../components/LandingBanner'
import Landing1 from '../assets/images/techno/Code1.jpg'
import Landing2 from '../assets/images/techno/Code2.jpg'
import Landing3 from '../assets/images/techno/Code3.jpg'
import Landing4 from '../assets/images/techno/Code4.jpg'

const LANDING_IMAGES = [
    { name: 'Landing1', src: Landing1 },
    { name: 'Landing2', src: Landing2 },
    { name: 'Landing3', src: Landing3 },
    { name: 'Landing4', src: Landing4 },
]

function Skills() {
    return (
        <div className="skills">
            <div className="skills__header">
                <LandingBanner speed={20} images={LANDING_IMAGES} />
                <h1 className="skills__title">Développeur Full-Stack</h1>
            </div>
        </div>
    )
}

export default Skills
