import { Link } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function RecipeCard ( { title, difficulty, description, _id } ) {
  
  return (
    <div className="RecipeCard card">
      <h3>{title}</h3>
      <p><strong>Difficulty:</strong> {difficulty}</p>
      <p>{description}</p>
      <Link to={`/recipes/${_id}`}>
        <button>More Details</button>
      </Link>
    </div>
  );
}

export default RecipeCard;
