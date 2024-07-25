import OpenAI from "openai";
import dotenv from "dotenv";
import { CheckboxFormValues } from "../components/Checkbox";

dotenv.config();

// console.log(process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//accepts currentPrompts object and ingredients string
export const stats = async (
  ingredients: string[],
  currentPrompts: CheckboxFormValues
) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a dietician that access nutritional values of food recipes which are a combination of calories, carbohydrates, proteins, fat, fiber, and sodium.",
        },
        {
          role: "user",
          content: `Given this ingredients string from a recipe: ${ingredients} and a person wants these value questions answered about the keys in this object: ${currentPrompts}. Return an object of the same keys in the given object with respective values which are an array of strings corresponding to your answers.`,
        },
      ],
      max_tokens: 100,
      temperature: 1,
    });
    if (response && response.choices && response.choices.length > 0) {
      console.log(response.choices[0].message.content);
    } else {
      console.error("No choices found in the response.");
    }
  } catch (error) {
    console.error("Error fetching completion: ", error);
  }
};
