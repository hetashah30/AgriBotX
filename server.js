// const express = require("express");
// const cors = require("cors");
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const genAI = new GoogleGenerativeAI("YOUR_API_KEY_HERE"); // Replace with your actual API key

// app.post("/chat", async (req, res) => {
//     try {
//         const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Correct model name
//         const prompt = req.body.message;
//         const result = await model.generateContent(prompt);
//         const response = result.response.text();

//         res.json({ reply: response });
//     } catch (error) {
//         console.error("Error generating response:", error);
//         res.status(500).json({ error: "Failed to generate response" });
//     }
// });

// app.listen(5000, () => {
//     console.log("Server running on http://localhost:5000");
// });

// server.js (Backend)


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-pro-exp-02-05" });

        const response = await model.generateContent(userMessage);
        const botReply = response.response.text(); // Extract bot's response

        res.json({ reply: botReply });
    } catch (error) {
        console.error("Error generating response:", error);
        res.status(500).json({ error: "Failed to generate response from Gemini API" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

