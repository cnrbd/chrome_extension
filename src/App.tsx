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
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [error_message, setError_message] = useState<string>("");

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
    if (currentTabUrl) {
      console.log("hello");
      const currentTabHTML = async () => {
        try {
          const html = await scrapeRecipePage(currentTabUrl);
          if (html.includes("[Error]: 403 Client Error")) {
            console.log("error");
            setIsDisabled(true);
            setError_message("Website is blocking our extension");
          } else {
            setHtml(html);
          }
        } catch (error) {
          setIsDisabled(true);
        }
      };
      currentTabHTML();
    }
  }, [currentTabUrl]);

  useEffect(() => {
    if (html) {
      const currentTabIngredients = () => {
        const ingredientArr = scrapeIngredients(html);
        if (!ingredientArr.length) {
          console.log("missing ing");
          setError_message("This is likely not a recipe page");
          setIsDisabled(true);
        } else {
          setIngredients(ingredientArr);
        }
      };
      currentTabIngredients();
    }
  }, [html]);

  return (
    <div className=" flex flex-col px-5 items-stretch">
      <Header />
      {/* {currentTabUrl && <p>link: {currentTabUrl}</p>} */}
      {/* {html && <p>html: {html}</p>} */}
      <div className="flex justify-center w-full bg-primary border mt-1 mb-3 rounded-lg rounded-br-7xl">
        <p className="text-2xs font-BodoniModa font-thin text-white m-3">
          Our tool promotes transparency about food statistics, ensuring you
          understand what your food stats actually mean. Know more about the
          nutritional content of your meals and make informed dietary choices
          with our detailed breakdowns. Empower yourself with the knowledge to
          lead a healthier lifestyle.
        </p>
      </div>
      <hr className="h-1 bg-divider mb-2" />

      <Checkbox
        button={
          <Button isDisabled={isDisabled} error_message={error_message}>
            Calculate
          </Button>
        }
        navigateFunction={navigate}
        ingredients={ingredients}
      />
    </div>
  );
}

