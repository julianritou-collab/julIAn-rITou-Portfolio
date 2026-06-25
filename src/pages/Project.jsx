import { useParams } from "react-router-dom";

function Project() {
    const { id } = useParams();
    return (
        <div>
            <h1>Fiche projet {id}</h1>
            <a href='https://julianritou-collab.github.io/Nina-Carducci-Optimisation/' target="_blank" rel="noreferrer">
                Voir le site du projet
            </a>
        </div>
    );
}

export default Project;