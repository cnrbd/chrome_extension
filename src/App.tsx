import "./App.css";
import { getCurrentTabUrl } from "./utils/getCurrentTabUrl";
import { useEffect, useState } from "react";
import { scrapeRecipePage, scrapeIngredients } from "./services/scraper";
// import { ingredientsArrayIntoStr } from "./utils/parseIngredientsArray";
import { useNavigate } from "react-router-dom";
import Checkbox from "./components/Checkbox.tsx";
// import { CheckboxFormValues } from "./components/Checkbox.tsx";
import { Header } from "./components/Header.tsx";
import { Button } from "./components/Button.tsx";

export default function App() {
  const navigate = useNavigate();
  const [currentTabUrl, setCurrentTabUrl] = useState<string>("");
  const [html, setHtml] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  // const [formValues, setFormValues] = useState<CheckboxFormValues>({
  //   calories: false,
  //   carbohydrates: false,
  //   protein: false,
  //   fat: false,
  //   fiber: false,
  //   sodium: false,
  // });

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
    <div className="flex flex-col px-5 items-stretch">
      <Header />
      {/* {currentTabUrl && <p>link: {currentTabUrl}</p>} */}
      {/* {html && <p>html: {html}</p>} */}
      <div className="flex justify-center w-full bg-primary border mt-1 mb-3 rounded-lg rounded-br-7xl">
        <p className="text-2xs font-BodoniModa font-thin text-white m-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <hr className="h-1 bg-divider mb-2" />

      <Checkbox
        button={<Button> Calculate </Button>}
        navigateFunction={navigate}
        ingredients={ingredients}
      />
    </div>
  );
}

