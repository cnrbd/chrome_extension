import * as cheerio from "cheerio";
import axios from "axios";
import { parseIngredientsArray } from "../utils/parseIngredientsArray";


const ingredientsClassNames = [
  "wprm-recipe-ingredients",
  "structured-ingredients",
  "o-Ingredients__m-Body",
  "recipe__ingredients",
  "ingredients_ingredients__FLjsC",
  "parts",
  "recipe-ingredients",
  "ingredients__section",
  "ingredients-section",
  "ingredients",
  "ingredients-body",
  "ingredient-lists",
  "mntl-structured-ingredients__list",
  "recipe-ingredients__list",
  "mm-recipes-structured-ingredients__list",
  "recipe-ingredients__collection",
  "ingred-list",
  "List-iSNGTT",
  "recipe-division",
  "mv-create-ingredients",
  "css-rszk63",
  "tasty-recipes-ingredients",
  "tasty-recipes-ingredients-body",
  "cb101-recipe-ingredients",
  "ingredient-list",
  "recipe-ingredients wrapper",
];

export const setApiURL = (url: string) => {
  const options = {
    method: "GET",
    url: "https://scrapers-proxy2.p.rapidapi.com/standard",
    params: {
      url: `${encodeURI(url)}`,
    },
    headers: {
      "x-rapidapi-key": "557db26a53mshc3acaf4c42ecb2ep1fdbe5jsn78d9dd306fea",
      "x-rapidapi-host": "scrapers-proxy2.p.rapidapi.com",
    },
  };

  return options;
};

export const scrapeRecipePage = async (url: string) => {
  try {
    console.log("URL: ", url);
    const options = setApiURL(url);
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const scrapeIngredients = (html: string) => {
  const $ = cheerio.load(html);
  const recipeArray: string[] = [];
  let pagesIngredientsClass;

  for (const className of ingredientsClassNames) {
    const containsClass = $(`.${className}`).length;
    if (containsClass > 0) {
      pagesIngredientsClass = className;
      break;
    }
  }

  console.log("pagesIngredientsClass: ", pagesIngredientsClass);

  if (pagesIngredientsClass) {
    const liElements = $(`.${pagesIngredientsClass}`).find("li").toArray();

    if (!liElements.length) {
      const otherElements = $(`.${pagesIngredientsClass}`).toArray();
      otherElements.forEach((el) => {
        recipeArray.push($(el).text().trim());
      });
    } else {
      liElements.forEach((li) => {
        recipeArray.push($(li).text().trim());
      });
    }

    console.log("recipeArray: ", recipeArray);
  }
  return parseIngredientsArray(recipeArray);
};