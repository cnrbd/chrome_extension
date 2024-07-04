import * as cheerio from "cheerio";

import axios from "axios";

const ingredientClass = "wprm-recipe-ingredient-group";

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
    console.log(response.data.extracted_html);
    return response.data.extracted_html;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const scrapeIngredients = (html: string) => {
  const $ = cheerio.load(html);
  const $ingredients = $(`.${ingredientClass}`).text();
  console.log($ingredients);
  return $ingredients;
};
