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

  try {
    // const response = await axios.post(`http://localhost:5000/api/chat`, {
    //   messages: messages,
    // });
    const response = await axios.post(`/api/chat`, {
      messages: messages,
    });
    console.log("SENT:", messages);
 

    const answer = response.data.choices[0].message.content;
    console.log("Received :", messages);

    console.log(messages);

    messages.splice(messages.length - 1, 0, {
      role: "assistant",
      content: answer,
    })

    return [...messages];
  } catch (error) {
    console.error(error);
    messages.splice(messages.length - 1, 0, {
      role: "assistant",
      content: "Connection error !",
    })
    return [...messages];
  }
}
