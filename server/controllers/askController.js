const ai = require("../config/gemini");
const askPrompt = require("../prompts/askPrompt");

const askQuestion = async (req, res) => {
    try {
        const {
            transcript,
            question,
            conversation = []
        } = req.body;

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
            contents: askPrompt(
                transcript,
                question,
                conversation
            ),
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