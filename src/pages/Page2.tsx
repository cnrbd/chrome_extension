
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Button } from '../components/Button';
import DisplayMetrics from "../components/DisplayMetrics";
import Graph from "../components/Visualization";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { stats } from "../openai/test";
import { createChosenMetricsObject } from "../utils/displayMetricsHelpers";


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
    <div className="flex flex-col px-5 items-center justify-center w-full">
      <p className="my-3">
        <Header />
        Learn about this recipe with our AI-powered assistant
      </p>

      <DisplayMetrics
        ingredients={ingredients}
        chosenMetrics={formValues}
        aiResponse={response}
      />

      <Graph aiResponse={response} />
      <div className="w-full">
        <Link to="/">
          <Button> Return </Button>
        </Link>
      </div>
    </div>
  );
}