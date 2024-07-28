// takes in props of the ingredients and the currentPrompts object
// useEffect for openai api response
// imports are openai api functions, diplaymetricshelpers functions
import { stats } from "../openai/test";
import { useEffect, useState } from "react";
import {
  createChosenMetricsObject,
  stringObjectToJSON,
  keysToUpperCase,
} from "../utils/displayMetricsHelpers";

type DisplayMetricsProps = {
  ingredients: string[];
  chosenMetrics: { [key: string]: boolean };
};

export default function DisplayMetrics({
  ingredients,
  chosenMetrics,
}: DisplayMetricsProps) {
  const [response, setResponse] = useState("");
  const [responseJSON, setResponseJSON] = useState<{ [key: string]: string[] }>(
    {}
  );
  const currentPrompts = createChosenMetricsObject(chosenMetrics);
  useEffect(() => {
    const aiResponse = async () => {
      //   console.log("being passed: ", currentPrompts);
      const response = await stats(ingredients, currentPrompts);
      console.log("response: ", typeof response);
      setResponse(response ?? "");
    };
    aiResponse();
  }, [ingredients, chosenMetrics]);

  useEffect(() => {
    if (response) {
      try {
        const parsedResponse = stringObjectToJSON(response);
        const formattedResponse = keysToUpperCase(parsedResponse);
        setResponseJSON(formattedResponse);
      } catch (error) {
        console.error("Failed to parse response JSON:", error);
      }
    }
  }, [response]);

  return (
    <div className="flex flex-col">
      {/* {ingredients} */}
      {/* {chosenMetrics && JSON.stringify(chosenMetrics)} */}
      {/* {responseJSON && <p>response: {JSON.stringify(responseJSON)}</p>} */}
      {responseJSON && (
        <ul>
          {Object.entries(responseJSON).map(([key, value]) => (
            <div key={key}>
              <h3>{key}</h3>
              <ul>
                {value.map((stat, index) => (
                  <li key={index}>{stat}</li>
                ))}
              </ul>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
