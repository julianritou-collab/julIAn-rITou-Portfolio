import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { RowsPhotoAlbum } from 'react-photo-album'
import 'react-photo-album/rows.css'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { useGetProjects } from '../hooks/useGetProjects'
import Spinner from '../components/Spinner'
import Button from '../components/Button'

function Project() {
    const { id } = useParams()
    const { projects, loading, error } = useGetProjects()
    const [index, setIndex] = useState(-1)

    if (loading) {
        return <Spinner message="Chargement du projet..." />
    }

    if (error) {
        return <p>Erreur lors du chargement du projet : {error.message}</p>
    }

    const project = projects.find((p) => p.id === id)

    if (!project) return null

    const photos = project.pictures.map((src, i) => ({
        src,
        width: 1600,
        height: 900,
        alt: `${project.title} - image ${i + 1}`,
    }))

    return (
        <div className="project">
            <h1>{project.title}</h1>
            <div className="project__description">
                <p>{project.description}</p>
                {project.link && project.link !== '' && (
                    <Button
                        href={project.link}
                        variant="tertiary"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Voir le projet
                    </Button>
                )}
            </div>
            <div className="project__photo-album">
                <RowsPhotoAlbum
                    photos={photos}
                    onClick={({ index }) => setIndex(index)}
                    renderPhoto={({ photo, imageProps }) => (
                        <img {...imageProps} aria-label={`Ouvrir ${photo.alt}`} />
                    )}
                />
                <Lightbox
                    open={index >= 0}
                    index={index}
                    slides={photos}
                    close={() => setIndex(-1)}
                    labels={{
                        Close: 'Revenir à la galerie',
                        Previous: 'Photo précédente',
                        Next: 'Photo suivante',
                    }}
                />
            </div>
        </div>
    )
}

export default Project
