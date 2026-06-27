import TypeWriter from "../components/Typewriter";
import LandingBanner from "../components/LandingBanner";


function About() {
  return (
    <div className="about">
        <div className="about__header">    
            <LandingBanner speed={45} height={110} />
            <h1 className="about__title">Développeur Fullstack</h1>
        </div>
        <div className="about__content">
            <section className="about__section about__section--me">
                <h2 className="about__section-title">À propos de moi</h2>
                <p className="about__me-text">J’adore quand un<strong>e</strong> plan<strong>te</strong> se déroule sans accroc.</p>
                <TypeWriter className="about__me-text" text={`En 2001, un développeur fut condamné à résoudre des bugs que personne ne voulait toucher.

                            Aujourd’hui, recherché par les startups pour ses compétences improbables,
                            il survit en acceptant les missions que les autres considèrent comme impossibles:
                            -comprendre ce que personne ne comprend,
                            -réparer ce que personne n’ose toucher,
                            -et livrer ce qui devait être livré hier!

                            Votre cahier des charges tient sur un post-it ?
                            Votre API explose en production à 3h du matin ?
                            Votre développeur senior a mystérieusement disparu au moment du déploiement ?   

                            Si vous avez un problème, si personne d’autre ne peut vous aider, Il ne vous reste qu’une seule solution`} />
                <p className="about__me-text">contactez Juli<strong>A</strong>n Ritou <strong>Team</strong></p>
            </section>
            <section className="about__section about__section--training">
                <h2 className="about__section-title">Formation</h2>
            </section>
            <section className="about__section about__section--hobbies">
                <h2 className="about__section-title">Loisirs</h2>
            </section>
        </div>
    </div>
  );
}

export default About;