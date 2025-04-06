require('dotenv').config()
const cors = require('cors');
const OpenAI = require('openai');
const path = require('path');
const express = require('express');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: 'org-w9p8rhkAvl9JcwRikM9wPO0g'
});
  

app.post('/api/chat',async (req, res) => {
  const {messages} = req.body;
  console.log("Received messages from frontend:", messages);
  try{
    const chatCompletion = await openai.chat.completions.create(
        {
            model: "ft:gpt-3.5-turbo-0125:personal:pharmacy:BJM3Qa2a",
            messages: messages,
            temperature: 0.2,
        },
        
    );
    
    res.json(chatCompletion);
  }
  catch(err){
    console.error(err);
    res.status(500).json({ error: err.message });
  } 
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
