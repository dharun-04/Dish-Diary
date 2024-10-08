import SavedRecipes from "../models/SavedRecipes.js";

export const getSavedRecipe = async (req, res) => {
  try {
    const { userId } = req.params;
    const savedRecipes = await SavedRecipes.find({ userId });
    res.status(200).json(savedRecipes[0].recipeId);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const updateSavedRecipe = async (req, res) => {
  try {
    const { userId } = req.params;
    const { recipeId } = req.body;
    const userSavedRecipe = await SavedRecipes.find({ userId });
    if(userSavedRecipe.length === 0) {
      const newSavedRecipes = new SavedRecipes({
        userId, 
        recipeId: recipeId
      })
      await newSavedRecipes.save();
    }
    else if (
      userSavedRecipe.length !== 0 &&
      userSavedRecipe[0].recipeId.includes(recipeId)
    ) {
      userSavedRecipe[0].recipeId = userSavedRecipe[0].recipeId.filter(
        (id) => id !== recipeId
      );
    }
    else{
      userSavedRecipe[0].recipeId.push(recipeId);
    } 
    const updatedSavedRecipes = await SavedRecipes.findByIdAndUpdate(
      userSavedRecipe[0]._id,
      { 
        userId,
        recipeId: [...userSavedRecipe[0].recipeId]
       },
      { new: true }
    );
    res.status(200).json(updatedSavedRecipes.recipeId);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
