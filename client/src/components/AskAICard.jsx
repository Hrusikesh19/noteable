import { useState } from "react";
import { Bot } from "lucide-react";

function AskAICard({ transcript }) {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const askAI = async () => {
        if (!transcript || transcript.trim() === "") {
            setError("Please record a lecture first.");
            return;
        }

        if (!question.trim()) {
            setError("Please enter a question.");
            return;
        }

        const currentQuestion = question.trim();

        try {
            setLoading(true);
            setError("");

            const response = await fetch("http://localhost:3000/ask", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    transcript: transcript,
                    question: currentQuestion,
                    conversation: messages,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Failed to answer question."
                );
            }

            setMessages((prevMessages) => [
                ...prevMessages,

                {
                    role: "Student",
                    content: currentQuestion,
                },

                {
                    role: "AI",
                    content: data.answer,
                },
            ]);

            setQuestion("");

        } catch (error) {

            console.error("Ask AI Error:", error);

            setError(
                error.message || "Failed to answer the question."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6">

            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <Bot
                    className="text-green-600"
                    size={24}
                />

                <h2 className="text-2xl font-bold">
                    AI Assistant
                </h2>
            </div>


            {/* Conversation */}
            {messages.length > 0 && (
                <div className="mb-4 max-h-80 overflow-y-auto space-y-3">

                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`rounded-xl p-3 ${
                                message.role === "Student"
                                    ? "bg-gray-100"
                                    : "bg-green-50 border border-green-100"
                            }`}
                        >

                            <p className="font-semibold text-sm mb-1">
                                {message.role === "Student"
                                    ? "You"
                                    : "AI Assistant"}
                            </p>

                            <p className="text-gray-700 whitespace-pre-wrap">
                                {message.content}
                            </p>

                        </div>
                    ))}

                </div>
            )}


            {/* Question Input */}
            <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask anything about today's lecture..."
                className="w-full border rounded-xl p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />


            {/* Error */}
            {error && (
                <p className="mt-3 text-red-500">
                    {error}
                </p>
            )}


            {/* Ask Button */}
            <button
                onClick={askAI}
                disabled={loading}
                className={`mt-6 w-full text-white py-3 rounded-xl transition ${
                    loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                }`}
            >
                {loading ? "Thinking..." : "Ask AI"}
            </button>

        </div>
    );
}

export default AskAICard;