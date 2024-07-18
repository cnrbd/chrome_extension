export const parseIngredientsArray = (ingredientsArr: string[]) => {
  return ingredientsArr.map((ingredient) => {
    if (ingredient.includes("Ingredients")) {
      return ingredient.replace("Ingredients", "").trim();
    } else if (ingredient.includes("▢")) {
      return ingredient.replace("▢", "").trim();
    }
    return ingredient.trim();
  });
};

export const ingredientsArrayIntoStr = (
  ingredientsArr: (string | undefined)[]
) => {
  let ingredientsStr: string = "";
  ingredientsArr.forEach((ingredient) => {
    ingredientsStr += ingredient + " \n";
  });
  console.log("ingredientsStr: ", ingredientsStr);
  return ingredientsStr;
};
