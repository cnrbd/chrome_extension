import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "",
});

const test = async () => {
  const response = await openai.completions.create({
    model: "gpt-3.5-turbo",
    prompt: "What chemical compounds are computers mostly made from?",
    maxTokens: 100,
    temperature: 1,
  });
  console.log(response.data);
};

test();
