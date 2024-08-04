// takes in props of the ingredients and the currentPrompts object
// useEffect for openai api response
// imports are openai api functions, diplaymetricshelpers functions

import { useEffect, useState } from "react";
import {
  stringObjectToJSON,
  keysToUpperCase,
} from "../utils/displayMetricsHelpers";

type DisplayMetricsProps = {
  ingredients: string[];
  chosenMetrics: { [key: string]: boolean };
  aiResponse: string;
};

export default function DisplayMetrics({ aiResponse }: DisplayMetricsProps) {

  const [responseJSON, setResponseJSON] = useState<{ [key: string]: string[] }>(
    {}
  );


  useEffect(() => {
    if (aiResponse) {
      try {
        console.log("Test:", aiResponse);
        const parsedResponse = stringObjectToJSON(aiResponse);
        console.log("parsed response: ", parsedResponse);
        const formattedResponse = keysToUpperCase(parsedResponse);
        setResponseJSON(formattedResponse);
      } catch (error) {
        console.error("Failed to parse response JSON:", error);
      }
    }
  }, [aiResponse]);

  return (
    <div className="flex flex-col w-full">
      {/* {ingredients} */}
      {/* {chosenMetrics && JSON.stringify(chosenMetrics)} */}
      {/* {responseJSON && <p>response: {JSON.stringify(responseJSON)}</p>} */}
      {responseJSON && (
        <ul className="w-full h-44 overflow-y-auto bg-lime-600 px-1 py-1">
          {Object.entries(responseJSON).map(([key, value]) => (
            <div key={key}>
              <h1 className="text-lg font-bold">{key}:</h1>
              <ul className="list-disc pl-5">
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
