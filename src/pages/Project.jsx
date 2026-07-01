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

    const currentProject = projects.find((p) => p.id === id)

    if (!currentProject) {
        navigate('/not-found')
        return null
    }

    const photos = currentProject.pictures.map((pic, i) => ({
        ...pic,
        alt: `${currentProject.title} - image ${i + 1}`,
    }))

    return (
        <div className="project">
            <h1>{currentProject.title}</h1>
            <section className="project__description">
                <h2>{currentProject.subtitle}</h2>

                {currentProject.objective && <p>{currentProject.objective}</p>}
                {currentProject.context && <p>{currentProject.context}</p>}

                {currentProject.goals && currentProject.goals.length > 0 && (
                    <Collapse title="Objectifs du projet" isOpen={true}>
                        <ul>
                            {currentProject.goals.map((goal, index) => (
                                <li key={index}>
                                    <BoldText text={goal} />
                                </li>
                            ))}
                        </ul>
                    </Collapse>
                )}
                {currentProject.skills && currentProject.skills.length > 0 && (
                    <Collapse title="Technologies utilisées" isOpen={true}>
                        <ul>
                            {currentProject.skills.map((skill, index) => (
                                <li key={index}>
                                    <BoldText text={skill} />
                                </li>
                            ))}
                        </ul>
                    </Collapse>
                )}
                {currentProject.result && (
                    <>
                        <h2>Résultats obtenus</h2>
                        <p>{currentProject.result}</p>
                        {currentProject.link && currentProject.link !== '' && (
                            <Button
                                href={currentProject.link}
                                variant="tertiary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Voir le projet
                            </Button>
                        )}

                        {currentProject.strengths && currentProject.strengths.length > 0 && (
                            <Collapse title="Points forts du projet" isOpen={true}>
                                <ul>
                                    {currentProject.strengths.map((strength, index) => (
                                        <li key={index}>
                                            <BoldText text={strength} />
                                        </li>
                                    ))}
                                </ul>
                            </Collapse>
                        )}
                        {currentProject.improvements && currentProject.improvements.length > 0 && (
                            <Collapse title="Axes d'amélioration" isOpen={true}>
                                <ul>
                                    {currentProject.improvements.map((improvement, index) => (
                                        <li key={index}>
                                            <BoldText text={improvement} />
                                        </li>
                                    ))}
                                </ul>
                            </Collapse>
                        )}
                    </>
                )}
            </section>
            <section className="project__photo-album">
                <h2>Galerie de photos</h2>
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
            </section>
        </div>
    )
}

export default Project
