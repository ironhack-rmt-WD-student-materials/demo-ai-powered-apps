const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const recipeSchema = new Schema({
  title: String,
  difficulty: {
    type: String,
    enum: ["easy", "medium", "difficult"]
  },
  ingredients: [String],
  description: String
});

module.exports = model("Recipe", recipeSchema);
