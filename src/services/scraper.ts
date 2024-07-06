import * as cheerio from "cheerio";
import axios from "axios";
// import { parseIngredients } from "../utils/parseIngredients";

const ingredientClass = "wprm-recipe-ingredients";

export const setApiURL = (url: string) => {
  const options = {
    method: "POST",
    url: "https://dripcrawler.p.rapidapi.com/",
    headers: {
      "x-rapidapi-key": "557db26a53mshc3acaf4c42ecb2ep1fdbe5jsn78d9dd306fea",
      "x-rapidapi-host": "dripcrawler.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      url: `${url}`,
      javascript_rendering: "False",
    },
  };
  return options;
};

export const scrapeRecipePage = async (url: string) => {
  try {
    const options = setApiURL(url);
    const response = await axios.request(options);
    return response.data.extracted_html;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const scrapeIngredients = (html: string) => {
  const $ = cheerio.load(html);
  const arr = $(`.${ingredientClass}>li`).contents().text();
  const liElements = $(`.${ingredientClass}`).find("li").toArray();
  const $ingredients = $(`.${ingredientClass}>li`).text();
  const arr2 = arr.split("▢");
  console.log("test: ", arr);
  console.log("test2: ", arr2);
  console.log("all elements: ", liElements);
  liElements.forEach((li) => {
    console.log($(li).text().trim());
  }); //use this which would get you an array of the text of li elements on each line

  return $ingredients;
};
