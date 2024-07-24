import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.OPENAI_API_KEY);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const test = async () => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: "What chemical compounds are computers mostly made from?",
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



test();
