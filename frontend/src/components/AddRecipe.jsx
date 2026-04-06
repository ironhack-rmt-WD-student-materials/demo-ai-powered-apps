import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../../config/api";


function AddRecipe() {
    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState("easy");
    const [ingredients, setIngredients] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault();
        const ingredientsArray = ingredients.split("\n").filter(ing => ing.trim() !== "");
        const requestBody = {
            title,
            description,
            difficulty,
            ingredients: ingredientsArray
        };

        // Get the token from the localStorage
        const storedToken = localStorage.getItem('authToken');

        // Send the token through the request "Authorization" Headers
        axios
            .post(
                `${API_URL}/api/recipes`,
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                navigate("/recipes")
            })
            .catch((error) => console.log(error));
    };


    return (
        <div className="AddRecipe">
            <h3>Add Recipe</h3>

            <form onSubmit={handleSubmit}>
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

                <label>Description:</label>
                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddRecipe;
