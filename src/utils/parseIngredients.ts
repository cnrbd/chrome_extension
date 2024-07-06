import * as cheerio from "cheerio";

export const parseIngredients = (
  ingredientElements: cheerio.Element[],
  $: cheerio.CheerioAPI
) => {
  //   const arr = [];
  ingredientElements.forEach((element) => {
    console.log("li: ", $(`${element} li`).text());
  });
};
