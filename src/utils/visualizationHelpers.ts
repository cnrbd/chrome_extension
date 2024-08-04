const recommmnededAmountsPerMeal: { [key: string]: number } = {
  calories: 600,
  carbohydrates: 50,
  protein: 20,
  fat: 20,
  fiber: 10,
  sodium: 500,
};

const r = /\d+/;

export function calculatePercentage(
  statsArray: number[],
  metrics: string[]
): number[] {
  const percentageArray = [];
  for (let i = 0; i < metrics.length; i++) {
    const recommendedMetrics = recommmnededAmountsPerMeal[metrics[i]];
    const percentage = (statsArray[i] / recommendedMetrics) * 100;
    percentageArray.push(percentage);
  }
  console.log("percentageArray: ", percentageArray);
  return percentageArray;
}

export const extractStats = (aiResponse: { [key: string]: string[] }) => {
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
  return tempArray;
};
