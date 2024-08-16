import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    recipeId: {
      type: Array,
      default: [],
      required: true,
    },
  },
  { timestamps: true }
);

const SavedRecipes = mongoose.model("SavedRecipes", RecipeSchema);

export default SavedRecipes;
