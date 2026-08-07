const ai = require("../config/gemini");
const quizPrompt = require("../prompts/quizPrompt");

const generateQuiz = async (req, res) => {
    try {

        const { transcript } = req.body;

        if (!transcript || transcript.trim() === "") {
            return res.status(400).json({
                error: "Transcript is required."
            });
        }

        const response = await ai.models.generateContent({
            model: "models/gemini-3.5-flash-lite",
            contents: quizPrompt(transcript),
        });

        res.json({
            quiz: response.text
        });

    } catch (error) {

        console.error("Gemini Error:", error);

        res.status(500).json({
            error: "Failed to generate quiz."
        });

    }
};

module.exports = generateQuiz;