import Plot from "react-plotly.js";
import { useState, useEffect } from "react";
import { stringObjectToJSON } from "../utils/displayMetricsHelpers";
import {
  extractStats,
  calculatePercentage,
} from "../utils/visualizationHelpers";
type GraphProps = {
  aiResponse: string;
};

export default function Graph({ aiResponse }: GraphProps) {
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

  useEffect(() => {
    if (aiResponse && responseJSON) {
      const tempArray = extractStats(responseJSON);
      setStatsArray(tempArray);
      console.log(statsArray);
    }
  }, [responseJSON]);

  return (
    aiResponse &&
    responseJSON && (
      <Plot
        data={[
          {
            x: keys,
            y: calculatePercentage(statsArray, keys),
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
