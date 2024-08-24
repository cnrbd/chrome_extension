// import OpenAI from "openai";
import { MetricKeys } from "../utils/displayMetricsHelpers";


const serverUrl = "https://chrome-extension-5ogv.vercel.app/test";

export const stats = async (
  ingredients: string[],
  currentPrompts: { [key in MetricKeys]?: string[] }
) => {
  try {
    console.log(`INGREDIENTS: ${typeof ingredients}`);
    console.log(`CURRENT PROMPTS: ${typeof currentPrompts}`);
    const response = await fetch(serverUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients, currentPrompts }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(` API response not ok: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    console.log("Server response:", result);
    return result;
  } catch (error) {
    console.error("Error sending data to server:", error);
  }
};
