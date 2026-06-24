import { useParams } from "react-router-dom";

function Project() {
  const { id } = useParams();
  return <h1>Fiche projet {id}</h1>;
}

export default Project;