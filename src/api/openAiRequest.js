import axios from "axios";

const messages = [];

export default async function askQuestion(input) {
  const question = input;
  if (messages.length === 0) {
    messages.push({
      role: "system",
      content:
        "You are a helpful assistant for a pharmacy chatbot called 'Your pharmacy'. You provide accurate information about pain relief medications, including the drug names, countries of origin (manufacturer), prices, and quantities per package. The pharmacy sells only pain relief drugs.",
    });
  }

  messages.push({ role: "user", content: question });
 // console.log(messages);
  try {
    const response = await axios.post(`http://localhost:5000/api/chat`, {
      messages: messages,
    });
    console.log("SENT:", messages);
    // const response = await axios.post(
    //     "https://api.openai.com/v1/chat/completions",
    //   {
    //     model: "ft:gpt-3.5-turbo-0125:personal:pharmacy:BIBVYS1J",
    //     messages: messages,
    //     temperature: 0.2,
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${apiKey}`,
    //     },
    //   }
    // );

    const answer = response.data.choices[0].message.content;
    console.log("Received :", messages);
    // messages.push({
    //   role: "assistant",
    //   content: answer,
    // });

    console.log(messages);

    messages.splice(messages.length - 1, 0, {
      role: "assistant",
      content: answer,
    })

    return [...messages];
  } catch (error) {
    console.error(error);
    return "Request error.";
  }
}
