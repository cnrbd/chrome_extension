import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
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
