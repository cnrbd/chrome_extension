
import  allPrompts from "../openai/prompts.json" with { type: "json" };

type MetricKeys = keyof typeof allPrompts;

let currentPrompts: { [key in MetricKeys]?: string[] } = {}
//currents prompts is an object where the keys are metrickeys and the values are string arrays of allprompts

export function createChosenMetricsObject(chosenMetrics: { [key in MetricKeys]?: boolean }) {
  console.log((allPrompts.calories));
  for (const metric  in chosenMetrics) {
    const metricIndex = metric as MetricKeys
    if (chosenMetrics[metricIndex]) {
      currentPrompts[metricIndex] = allPrompts[metricIndex];
    }
  }

  return currentPrompts;
}
