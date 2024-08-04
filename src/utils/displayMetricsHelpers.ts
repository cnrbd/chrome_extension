
import  allPrompts from "../openai/prompts.json" with { type: "json" };

export type MetricKeys = keyof typeof allPrompts;

let currentPrompts: { [key in MetricKeys]?: string[] } = {}
//currents prompts is an object where the keys are metrickeys and the values are string arrays of allprompts

export function createChosenMetricsObject(chosenMetrics: { [key in MetricKeys]?: boolean }) {
  currentPrompts = {};
  for (const metric  in chosenMetrics) {
    const metricIndex = metric as MetricKeys
    if (chosenMetrics[metricIndex]) {
      currentPrompts[metricIndex] = allPrompts[metricIndex];
    }
  }
//   console.log("current prompts: ",currentPrompts);

  return currentPrompts;
}

export function stringObjectToJSON(stringObject : string): { [key: string]: string[] } {
    return JSON.parse(stringObject);
}

export function keysToUpperCase(obj: { [key: string]: string[] }) {
  for (const key in obj) {
    const keyUpperCase = key.substring(0,1).toUpperCase() + key.substring(1);
    obj[keyUpperCase] = obj[key];
    delete obj[key];
  }
  return obj
}