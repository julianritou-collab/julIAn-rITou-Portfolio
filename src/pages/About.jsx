import TypeWriter from "../components/Typewriter";


function About() {
  //return <h1>À propos</h1>;
  return <TypeWriter text={`En 2001, un développeur fut condamné à résoudre des bugs que personne ne voulait toucher.
                            Aujourd’hui, recherché par les startups pour ses compétences improbables,
                            il survit en acceptant les missions que les autres considèrent comme impossibles:

                            comprendre ce que personne ne comprend, réparer ce que personne n’ose toucher, et livrer ce qui devait être livré hier.

                            Votre cahier des charges tient sur un post-it ?
                            Votre API explose en production à 3h du matin ?
                            Votre développeur senior a mystérieusement disparu au moment du déploiement ?
                            Votre chasseur de têtes cherche une licorne capable de faire du front, du back, de l’infra, de l’IA… avec le budget d’un stagiaire ?

                            Si vous avez un problème, si personne d’autre ne peut vous aider, Il ne vous reste qu’une seule solution`} />;
}

export default About;