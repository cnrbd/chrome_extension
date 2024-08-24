import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Groq from "groq-sdk";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const groq = new Groq({ apiKey: process.env.OPENAI_API_KEY });

const PORT = process.env.PORT || 3000;

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
      res.status(200).send(chatCompletion.choices[0]?.message?.content);
    });

});

app.post("/test", async (req, res) => {
  try {
    const { ingredients, currentPrompts } = req.body;

    const completion = await groq.chat.completions.create({
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
          )}. Return the result as a JSON with the same keys as the input object, where each key's value is an array of strings that correspond to the answers for that key. Rememeber to close and open the object with curly braces,
When asked how much of a nutrient is there, xxpress calories in kcal, sodium in mg, and all other nutrients in grams and output only one VALUE which is the numeric answer. Write other answers in full sentences.`,
        },
      ],
      model: "llama3-groq-70b-8192-tool-use-preview",
      max_tokens: 1000,
      temperature: 1,
    });

    // Successful completion, return the completion object
    console.log(completion.choices[0]?.message?.content);
    return res.json(completion.choices[0]?.message?.content);
  } catch (error) {
    console.error("Error processing request:", error);
    // Send appropriate error response to client
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
});


export default app;
