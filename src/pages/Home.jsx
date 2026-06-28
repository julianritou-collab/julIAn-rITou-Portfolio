import Spinner from "../components/Spinner";
import Card from "../components/Card";
import { useGetProjects } from "../hooks/useGetProjects";

function Home() {
    const { projects, loading, error } = useGetProjects();

    if (loading) {
        return <Spinner message="Chargement de la page d'accueil..." />;
    }

    if (error) {
        return <p>Erreur lors du chargement des projets : {error.message}</p>;
    }

    return (
        <section className="home">
            <h1 className="home__title">Accueil</h1>
            <div className="home__grid">
                {projects.map((project) => (
                    <Card key={project.id} project={project} />
                ))}
            </div>
        </section>
    );
}

export default Home;