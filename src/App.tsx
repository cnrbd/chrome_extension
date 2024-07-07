import "./App.css";
import { getCurrentTabUrl } from "./utils/getCurrentTabUrl";
import { useEffect, useState } from "react";
import { scrapeRecipePage, scrapeIngredients } from "./services/scraper";
import { ingredientsArrayIntoStr } from "./utils/parseIngredientsArray";

export default function App() {
  const [currentTabUrl, setCurrentTabUrl] = useState<string>("");
  const [html, setHtml] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);

  //async function nested in useeffect to get the current tab url
  //dependecies should have the currentTabUrl since each remount should reset the currentTabUrl
  useEffect(() => {
    const url = async () => {
      const tab = await getCurrentTabUrl();
      setCurrentTabUrl(tab?.url ?? "");
    };
    url();
  }, []);

  useEffect(() => {
    const currentTabHTML = async () => {
      const html = await scrapeRecipePage(currentTabUrl);
      setHtml(html);
    };
    currentTabHTML();
  }, [currentTabUrl]);

  useEffect(() => {
    const currentTabHTML = () => {
      const ingredientArr = scrapeIngredients(html);
      setIngredients(ingredientArr);
    };
    currentTabHTML();
  }, [html]);

  return (
    <div>
      <h1> hello</h1>
      {currentTabUrl && <p>link: {currentTabUrl}</p>}
      {/* {html && <p>html: {html}</p>} */}
      {ingredients && (
        <p>ingredients: {ingredientsArrayIntoStr(ingredients)}</p>
      )}
    </div>
  );
}

//