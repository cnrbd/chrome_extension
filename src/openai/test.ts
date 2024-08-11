// import OpenAI from "openai";
import { MetricKeys } from "../utils/displayMetricsHelpers";

const openAIApiKey = import.meta.env.VITE_REACT_APP_API_KEY;
console.log(openAIApiKey);

const serverUrl = "http://localhost:3000/test";

// const openai = new OpenAI({
//   apiKey: openAIApiKey,
//   dangerouslyAllowBrowser: true,
// });

//accepts currentPrompts object and ingredients string
// export const stats = async (
//   ingredients: string[],
//   currentPrompts: { [key in MetricKeys]?: string[] }
// ) => {
//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are a dietician that has access nutritional values of food from recipes by USDA standards",
//         },
//         {
//           role: "user",
//           content: `Given the following ingredients string from a recipe: ${ingredients}, answer the nutritional value questions based on the keys in the provided object: ${JSON.stringify(
//             currentPrompts
//           )}. Return the result as an object with the same keys as the input object, where each key's value is an array of strings that correspond to the answers for that key. Rememeber to close and open the object with curly braces,
//           Express calories in kcal, sodium in mg, and all other nutrients in grams. Write other answers in full sentences.`,
//         },
//       ],
//       max_tokens: 1000,
//       temperature: 1,
//     });
//     if (response && response.choices && response.choices.length > 0) {
//       // console.log(response.choices[0].message.content);
//       return response.choices[0].message.content;
//     } else {
//       console.error("No choices found in the response.");
//     }
//   } catch (error) {
//     console.error("Error fetching completion: ", error);
//   }
// };

export const stats = async (
  ingredients: string[],
  currentPrompts: { [key in MetricKeys]?: string[] }
) => {
  try {
    const response = await fetch(serverUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients, currentPrompts }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    console.log("Server response:", result);
    return result;
  } catch (error) {
    console.error("Error sending data to server:", error);
  }
};
