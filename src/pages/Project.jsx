import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { RowsPhotoAlbum } from 'react-photo-album'
import 'react-photo-album/rows.css'
import Lightbox from 'yet-another-react-lightbox'
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow'
import 'yet-another-react-lightbox/styles.css'
import { useGetProjects } from '../hooks/useGetProjects'
import Spinner from '../components/Spinner'
import Button from '../components/Button'
import Collapse from '../components/Collapse'
import BoldText from '../components/BoldText'

function Project() {
    const { id } = useParams()
    const { projects, loading, error } = useGetProjects()
    const [index, setIndex] = useState(-1)
    const navigate = useNavigate()

    if (loading) {
        return <Spinner message="Chargement du projet..." />
    }

    if (error) {
        return <p role="alert">Erreur lors du chargement du projet : {error.message}</p>
    }

    const project = projects.find((p) => p.id === id)

    if (!project) {
        navigate('/not-found')
        return null
    }

    const photos = project.pictures.map((pic, i) => ({
        ...pic,
        alt: `${project.title} - image ${i + 1}`,
    }))

    return (
        <div className="project">
            <h1>{project.title}</h1>
            <div className="project__description">
                <Collapse title="Points forts du projet" isOpen={true}>
                    <ul>
                        {project.strengths.map((strength, index) => (
                            <li key={index}>
                                <BoldText text={strength} />
                            </li>
                        ))}
                    </ul>
                </Collapse>

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
                    plugins={[Slideshow]}
                    slideshow={{ autoplay: true, delay: 3000 }}
                    labels={{
                        Close: 'Revenir à la galerie',
                        Previous: 'Photo précédente',
                        Next: 'Photo suivante',
                        Pause: 'Mettre en pause le diaporama',
                        Play: 'Reprendre le diaporama',
                    }}
                />
            </div>
        </div>
    )
}

export default Project
