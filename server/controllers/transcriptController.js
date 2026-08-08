const ai = require("../config/gemini");
const cleanTranscriptPrompt = require("../prompts/cleanTranscriptPrompt");

const cleanTranscript = async (req, res) => {
    try {
        const { transcript } = req.body;

        if (!transcript || transcript.trim() === "") {
            return res.status(400).json({
                error: "Transcript is required."
            });
        }

        const response = await ai.models.generateContent({
            model: "models/gemini-3.5-flash-lite",
            contents: cleanTranscriptPrompt(transcript),
        });

        res.json({
            transcript: response.text || transcript
        });

    } catch (error) {
        console.error("Transcript Cleanup Error:", error);

        res.status(500).json({
            error: "Failed to clean transcript."
        });
    }
};

module.exports = cleanTranscript;