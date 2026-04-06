import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from "../../config/api";

function EditRecipePage(props) {
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [ingredients, setIngredients] = useState("");

  const navigate = useNavigate();
  const { recipeId } = useParams();
  
  
  useEffect(() => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');
    
    // Send the token through the request "Authorization" Headers 
    axios
      .get(
        `${API_URL}/api/recipes/${recipeId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }    
      )
      .then((response) => {
        const oneRecipe = response.data;
        setTitle(oneRecipe.title);
        setInstructions(oneRecipe.instructions);
        setDifficulty(oneRecipe.difficulty);
        setIngredients(oneRecipe.ingredients ? oneRecipe.ingredients.join("\n") : "");
      })
      .catch((error) => console.log(error));
    
  }, [recipeId]);
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const ingredientsArray = ingredients.split("\n").filter(ing => ing.trim() !== "");
    const requestBody = { 
      title, 
      instructions,
      difficulty,
      ingredients: ingredientsArray
    };
  
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');  

    // Send the token through the request "Authorization" Headers   
    axios
      .put(
        `${API_URL}/api/recipes/${recipeId}`,
        requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } }              
      )
      .then((response) => {
        navigate(`/recipes/${recipeId}`)
      });
  };
  
  
  const deleteRecipe = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');      
    
    // Send the token through the request "Authorization" Headers   
    axios
      .delete(
        `${API_URL}/api/recipes/${recipeId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }           
      )
      .then(() => navigate("/recipes"))
      .catch((err) => console.log(err));
  };  

  
  return (
    <div className="EditRecipePage">
      <h3>Edit the Recipe</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Difficulty:</label>
        <select
          name="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="difficult">Difficult</option>
        </select>

        <label>Ingredients (one per line):</label>
        <textarea
          name="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients, one per line"
        />

        <label>Instructions:</label>
        <textarea
          name="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />

        <button type="submit">Update Recipe</button>
      </form>

      <button onClick={deleteRecipe}>Delete Recipe</button>
    </div>
  );
}

export default EditRecipePage;
