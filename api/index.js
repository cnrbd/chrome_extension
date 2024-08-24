import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fetch from "node-fetch";
import Groq from "groq-sdk";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const groq = new Groq({ apiKey: process.env.OPENAI_API_KEY });

const PORT = process.env.PORT || 3000;

app.post("/test", async (req, res) => {
  const { ingredients, currentPrompts } = req.body;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a dietician that has access nutritional values of food from recipes by USDA standards",
          },
          {
            role: "user",
            content: `Given the following ingredients string from a recipe: ${ingredients}, answer the nutritional value questions based on the keys in the provided object: ${JSON.stringify(
              currentPrompts
            )}. Return the result as an object with the same keys as the input object, where each key's value is an array of strings that correspond to the answers for that key. Rememeber to close and open the object with curly braces, Express calories in kcal, sodium in mg, and all other nutrients in grams. Write other answers in full sentences.`,
          },
        ],
        max_tokens: 1000,
        temperature: 1,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API response not ok: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("OpenAI API response:", result);

    if (result && Array.isArray(result.choices) && result.choices.length > 0) {
      console.log(result.choices[0].message.content);
      return res.json(result.choices[0].message.content);
    } else {
      console.error("No choices found or result.choices is not an array.");
      return res.status(500).send("Invalid response from OpenAI API");
    }
  } catch (error) {
    console.error("Error fetching completion:", error);
    res.status(500).send("Server Error");
  }
});

app.get("/openai", async (req, res) => {
  console.log(process.env.OPENAI_API_KEY);
  try {
    console.log("req ", req);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a dietician that has access nutritional values of food from recipes by USDA standards",
          },
          {
            role: "user",
            content: "what is 1 +1 ",
          },
        ],
        max_tokens: 1000,
        temperature: 1,
      }),
    });

    const result = await response.json();
    console.log("result: ", result);
    console.log("ans: ", result.choices[0].message.content);
    res.status(200).json(result.choices[0].message.content);
  } catch (error) {
    console.error("Error fetching completion: ", error);
    res.status(500).send("Server Error");
  }
});

app.get("/groq", async (req, res) => {
  console.log(process.env.OPENAI_API_KEY);
  const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: "what is 1+1",
        },
      ],
      model: "mixtral-8x7b-32768",
    })
    .then((chatCompletion) => {
      console.log(chatCompletion.choices[0]?.message?.content || "");
      res.status(200).json(chatCompletion.json());
    });

});


app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
});

export default app;
