import Plot from "react-plotly.js";
import { useState, useEffect } from "react";
import { stringObjectToJSON } from "../utils/displayMetricsHelpers";

type GraphProps = {
  aiResponse: string;
};

export default function Graph({ aiResponse }: GraphProps) {
  const r = /\d+/;
  const [statsArray, setStatsArray] = useState<number[]>([]);
  const [responseJSON, setResponseJSON] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [keys, setKeys] = useState<string[]>([]);
  useEffect(() => {
    if (aiResponse) {
      try {
        const parsedResponse = stringObjectToJSON(aiResponse);
        console.log("keys ", parsedResponse);
        setResponseJSON(parsedResponse);
        setKeys(Object.keys(parsedResponse));
      } catch (error) {
        console.error("Failed to parse response JSON:", error);
      }
    }
  }, [aiResponse]);

  const extractStats = (aiResponse: { [key: string]: string[] }) => {
    const tempArray: number[] = [];
    for (const key in aiResponse) {
      const keyStats = aiResponse[key];
      if (keyStats) {
        const statValue = keyStats[0].match(r);
        if (statValue) {
          tempArray.push(Number(statValue[0]));
        }
      }
    }
    setStatsArray(tempArray);
  };

  useEffect(() => {
    if (aiResponse && responseJSON) {
      extractStats(responseJSON);
      console.log(statsArray);
    }
  }, [responseJSON]);

  //   const recommmnededAmountsPerMeal = {
  //     calories: 600,
  //     carbohydrates: 50,
  //     protein: 20,
  //     fat: 20,
  //     fiber: 10,
  //     sodium: 500,
  //   };
  return (
    aiResponse &&
    responseJSON && (
      <Plot
        data={[
          {
            x: keys,
            y: statsArray,
            type: "bar",
          },
        ]}
        layout={{ title: "Chart Title", width: 400, height: 400 }}
        config={{
          displayModeBar: false,
        }}
      />
    )
  );
}
