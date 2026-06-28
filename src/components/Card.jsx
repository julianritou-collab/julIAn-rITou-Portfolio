import { Link } from 'react-router-dom'

function Card({ project }) {
    const rawImageSrc = project.cover ?? project.image ?? ''
    const imageSrc =
        rawImageSrc.startsWith('/') || rawImageSrc.startsWith('http')
            ? rawImageSrc
            : `/${rawImageSrc}`

    return (
        <Link to={`/project/${project.id}`} className="card">
            <div className="card__image-container">
                <img
                    src={imageSrc}
                    alt={`affiche du projet ${project.title}`}
                    className="card__image"
                    loading="lazy"
                />
            </div>
            <div className="card__content">
                <h2 className="card__title">{project.title}</h2>
                <p className="card__subtitle">{project.subtitle}</p>
            </div>
        </Link>
    )
}

export default Card
