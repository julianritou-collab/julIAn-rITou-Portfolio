import { useEffect, useState } from 'react'

export function useGetProjects() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('/data/projects.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((data) => {
                setProjects(data)
                setLoading(false)
            })
            .catch((fetchError) => {
                setError(fetchError)
                setLoading(false)
            })
    }, [])

    return { projects, loading, error }
}
