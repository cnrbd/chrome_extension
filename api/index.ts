import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// configures dotenv to work in your application
dotenv.config();
const app = express();

app.use(cors());

const PORT = process.env.PORT;

// app.get("/", (request, response) => {
//   response.status(200).send("Hello MAN");
// });
// app.get("/api", (request, response) => {
//   const key = process.env.VITE_REACT_APP_API_KEY;

//   response.status(200).send("Hello API " + key);
// });

app.get("/openai", async (req, res) => {
  try {
    console.log(req);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.VITE_REACT_APP_API_KEY}`,
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

app.post("/test", async (req, res) => {
  const { ingredients, currentPrompts } = req.body;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.VITE_REACT_APP_API_KEY}`,
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
            )}. Return the result as an object with the same keys as the input object, where each key's value is an array of strings that correspond to the answers for that key. Remember to close and open the object with curly braces, Express calories in kcal, sodium in mg, and all other nutrients in grams. Write other answers in full sentences.`,
          },
        ],
        max_tokens: 1000,
        temperature: 1,
      }),
    });

    const result = await response.json();
    res.json(result);
  } catch (error) {
    console.error("Error fetching completion: ", error);
    res.status(500).send("Server Error");
  }
});

app
  .listen(3000, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
  });

module.exports = app;
