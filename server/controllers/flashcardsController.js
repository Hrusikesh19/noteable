const ai = require("../config/gemini");
const flashcardsPrompt = require("../prompts/flashcardsPrompt");
const askQuestion = async (req, res) => {
    try {

        const { transcript, question } = req.body;

        if (!transcript || transcript.trim() === "") {
            return res.status(400).json({
                error: "Transcript is required."
            });
        }

        if (!question || question.trim() === "") {
            return res.status(400).json({
                error: "Question is required."
            });
        }

        const response = await ai.models.generateContent({
          model: "models/gemini-3.5-flash-lite",
            contents: askPrompt(transcript, question),
        });

        res.json({
            answer: response.text || "No answer generated."
        });

    } catch (error) {

        console.error("Gemini Error:", error);

        res.status(500).json({
            error: "Failed to answer the question."
        });

    }
};

module.exports = askQuestion;

const generateFlashcards = async (req, res) => {
    try {

        const { transcript } = req.body;

        if (!transcript || transcript.trim() === "") {
            return res.status(400).json({
                error: "Transcript is required."
            });
        }

        const response = await ai.models.generateContent({
       model: "models/gemini-3.5-flash-lite",
            contents: flashcardsPrompt(transcript),
        });

        res.json({
            flashcards: response.text
        });

    } catch (error) {

        console.error("FULL ERROR:");
console.error(error);
console.error("MESSAGE:", error.message);
console.error("STATUS:", error.status);
console.error("RESPONSE:", error.response);

        res.status(500).json({
            error: "Failed to generate flashcards."
        });

    }
};

module.exports = generateFlashcards;