
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Button } from '../components/Button';
import DisplayMetrics from "../components/DisplayMetrics";
import Graph from "../components/Visualization";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { stats } from "../openai/test";
import { createChosenMetricsObject } from "../utils/displayMetricsHelpers";
// import barchart from "../assets/barchart.png"


//comp1 = stats display
//comp2 = tbd but prob some kinda visualization of a chart and a health rating score for the user to gauge how healthy the dish is

export default function Page2() {
  const [response, setResponse] = useState("");

  const location = useLocation();
  const { formValues, ingredients } = location.state || {};
  const currentPrompts = createChosenMetricsObject(formValues);

  useEffect(() => {
    if (formValues && ingredients) {
      const aiResponse = async () => {
        console.log("being passed: ", currentPrompts);
        const response = await stats(ingredients, currentPrompts);
        console.log("response from page2: ", response);
        setResponse(response ?? "");
      };
      aiResponse();
    }
  }, [ingredients, formValues]);
  return (
    <div className="flex flex-col px-5 items-stretch">
      <Header />
      <p className="font-LibreBodoni mt-3 mb-2">
        —Learn about this recipe with our AI-powered assistant—
      </p>

      <div className="flex flex-col items-center justify-center w-full bg-primary rounded-3xl  h-48 p-4">
        <div
          className={`flex w-16 h-16 border-white border-4 rounded-full border-r-0 border-t-0 animate-spin my-8 ${
            response === "" ? "" : "hidden"
          }`}
        />
        <DisplayMetrics
          ingredients={ingredients}
          chosenMetrics={formValues}
          aiResponse={response}
        />
      </div>

      <div className="flex flex-col items-center justify-center w-full">
        <Graph aiResponse={response} />
      </div>

      <div className="w-full">
        <Link to="/">
          <Button> Return </Button>
        </Link>
      </div>
    </div>
  );
}