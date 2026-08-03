
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");
const notesPrompt = require("../prompts/notesPrompt");



/*
    Create a single Gemini client instance.

    This avoids creating a new AI connection
    every time a request comes in.
*/


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const generateNotes = async (req, res) => {
    try {

        const { transcript } = req.body;

        if (!transcript) {
            return res.status(400).json({
                error: "Transcript is required."
            });
        }

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: notesPrompt(transcript),
        });

        res.json({
            notes: response.text
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to generate notes."
        });

    }
};

module.exports = generateNotes;