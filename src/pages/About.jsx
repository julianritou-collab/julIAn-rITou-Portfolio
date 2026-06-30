import TypeWriter from '../components/Typewriter'
import LandingBanner from '../components/LandingBanner'
import Landing1 from '../assets/images/banner/Landing1.jpg'
import Landing2 from '../assets/images/banner/Landing2.jpg'
import Landing3 from '../assets/images/banner/Landing3.jpg'
import Landing4 from '../assets/images/banner/Landing4.jpg'
import Landing5 from '../assets/images/banner/Landing5.jpg'

const LANDING_IMAGES = [
    { name: 'Landing1', src: Landing1 },
    { name: 'Landing2', src: Landing2 },
    { name: 'Landing3', src: Landing3 },
    { name: 'Landing4', src: Landing4 },
    { name: 'Landing5', src: Landing5 },
]

function About() {
    return (
        <div className="about">
            <div className="about__header">
                <LandingBanner images={LANDING_IMAGES} speed={45} height={110} />
                <h1 className="about__title">Qui suis-je ?</h1>
            </div>
            <div className="about__content">
                <section className="about__section about__section--me">
                    <h2 className="about__section-title">À propos de moi</h2>
                    <p className="about__me-text">
                        J’adore quand un<strong>e</strong> plan<strong>te</strong> se déroule sans
                        accroc.
                    </p>
                    <TypeWriter
                        className="about__me-text"
                        text={`En 2001, un développeur fut condamné à résoudre des bugs que personne ne voulait toucher.

                            Aujourd’hui, recherché par les startups pour ses compétences improbables,il survit en acceptant les missions que les autres considèrent comme impossibles:
                            - comprendre ce que personne ne comprend,
                            - réparer ce que personne n’ose toucher,
                            - et livrer ce qui devait être livré hier!

                            Votre cahier des charges tient sur un post-it ?
                            Votre API explose en production à 3h du matin ?
                            Votre développeur senior a mystérieusement disparu au moment du déploiement ?   

                            Si vous avez un problème, si personne d’autre ne peut vous aider, Il ne vous reste qu’une seule solution...`}
                    />
                    <p className="about__me-text">
                        ...contactez Juli<strong>A</strong>n Ritou <strong>Team</strong>
                    </p>
                </section>
                <section className="about__section about__section--training">
                    <h2 className="about__section-title">Formation</h2>
                </section>
                <section className="about__section about__section--hobbies">
                    <h2 className="about__section-title">Loisirs</h2>
                </section>
            </div>
        </div>
    )
}

export default About
