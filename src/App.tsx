import "./App.css";
import { getCurrentTabUrl } from "./utils/getCurrentTabUrl";
import { useEffect, useState } from "react";
import { scrapeRecipePage, scrapeIngredients } from "./services/scraper";
// import { ingredientsArrayIntoStr } from "./utils/parseIngredientsArray";
import { useNavigate } from "react-router-dom";
import Checkbox from "./components/Checkbox.tsx";
import { CheckboxFormValues } from "./components/Checkbox.tsx";
import { Header } from "./components/Header.tsx";
import { Button } from "./components/Button.tsx";

export default function App() {
  const navigate = useNavigate();
  const [currentTabUrl, setCurrentTabUrl] = useState<string>("");
  const [html, setHtml] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<CheckboxFormValues>({
    calories: false,
    carbohydrates: false,
    protein: false,
    fat: false,
    fiber: false,
    sodium: false,
  });

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
    const currentTabIngredients = () => {
      const ingredientArr = scrapeIngredients(html);
      setIngredients(ingredientArr);
    };
    currentTabIngredients();
  }, [html]);

  return (
    <div className=" flex flex-col px-5 items-stretch">
      <Header />
      {/* {currentTabUrl && <p>link: {currentTabUrl}</p>} */}
      {/* {html && <p>html: {html}</p>} */}
      <div className="w-full bg-gray-300 border mt-1 mb-3">
        <p className="text-xs">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
      <hr className="h-px bg-gray-400 mb-2" />

      <Checkbox
        setFunction={setFormValues}
        button={<Button> Calculate </Button>}
        navigateFunction={navigate}
        ingredients={ingredients}
      />
      {formValues && <p>formValues: {JSON.stringify(formValues)}</p>}
      {ingredients && <p>ingredients</p>}
    </div>
  );
}

