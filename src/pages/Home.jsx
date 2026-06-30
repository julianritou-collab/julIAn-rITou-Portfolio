import Spinner from '../components/Spinner'
import Card from '../components/Card'
import { useGetProjects } from '../hooks/useGetProjects'

function Home() {
    const { projects, loading, error } = useGetProjects()

    if (loading) {
        return <Spinner message="Chargement de la page d'accueil..." />
    }

    if (error) {
        return <p role="alert">Erreur lors du chargement des projets : {error.message}</p>
    }

    return (
        <div className="home">
            <div className="home__header">
                <h1 className="home__title">Bienvenue sur mon portfolio</h1>
                <p className="home__subtitle">
                    Découvrez mes réalisations en développement web, allant de sites vitrines à des
                    applications interactives.
                </p>
                <p className="home__subtitle">
                    Chaque projet reflète mon engagement envers la qualité, l'accessibilité et la
                    satisfaction des utilisateurs.
                </p>
                <p className="home__subtitle">
                    N'hésitez pas à explorer les projets et à me contacter pour toute collaboration.
                </p>
            </div>
            <section className="home__content-section">
                <h2 className="home__content-title">Mes Projets</h2>
                <div className="home__content-grid">
                    {projects.map((project) => (
                        <Card key={project.id} project={project} />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Home
