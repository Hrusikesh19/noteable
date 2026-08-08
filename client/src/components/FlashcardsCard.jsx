import { useState } from "react";
import { BookOpen } from "lucide-react";

function FlashcardsCard({ transcript }) {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const generateFlashcards = async () => {
        if (!transcript || transcript.trim() === "") {
            setError("Please record a lecture first.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setFlashcards([]);
            setCurrentIndex(0);
            setShowAnswer(false);

            const response = await fetch(
                "http://localhost:3000/flashcards",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        transcript: transcript,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Failed to generate flashcards."
                );
            }

            const parsedCards = parseFlashcards(data.flashcards);

            if (parsedCards.length === 0) {
                throw new Error(
                    "Could not understand the generated flashcards."
                );
            }

            setFlashcards(parsedCards);

        } catch (error) {
            console.error("Flashcards Error:", error);
            setError(
                error.message || "Failed to generate flashcards."
            );
        } finally {
            setLoading(false);
        }
    };

    const parseFlashcards = (text) => {
        const cards = [];

        const blocks = text
            .split(/\n\s*\n/)
            .map((block) => block.trim())
            .filter(Boolean);

        blocks.forEach((block) => {
            const questionMatch = block.match(
                /Q:\s*(.*?)(?=\nA:|$)/is
            );

            const answerMatch = block.match(
                /A:\s*(.*)/is
            );

            if (questionMatch && answerMatch) {
                cards.push({
                    question: questionMatch[1].trim(),
                    answer: answerMatch[1].trim(),
                });
            }
        });

        return cards;
    };

    const nextCard = () => {
        if (currentIndex < flashcards.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setShowAnswer(false);
        }
    };

    const previousCard = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
            setShowAnswer(false);
        }
    };

    const currentCard = flashcards[currentIndex];

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6">

            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <BookOpen
                    className="text-orange-500"
                    size={24}
                />

                <h2 className="text-2xl font-bold">
                    Flashcards
                </h2>
            </div>

            {/* Flashcard */}
            {currentCard ? (
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 min-h-[220px] flex flex-col justify-between">

                    <div>
                        <div className="flex justify-between items-center mb-5">
                            <span className="text-sm font-medium text-orange-600">
                                Card {currentIndex + 1} of {flashcards.length}
                            </span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-800">
                            {currentCard.question}
                        </h3>

                        {showAnswer && (
                            <div className="mt-6 pt-5 border-t border-orange-200">
                                <p className="text-sm font-semibold text-orange-600 mb-2">
                                    Answer
                                </p>

                                <p className="text-gray-700 whitespace-pre-wrap">
                                    {currentCard.answer}
                                </p>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => setShowAnswer(!showAnswer)}
                        className="mt-6 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-xl transition"
                    >
                        {showAnswer
                            ? "Hide Answer"
                            : "Reveal Answer"}
                    </button>
                </div>
            ) : (
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 min-h-[220px] flex items-center justify-center">
                    <p className="text-gray-600 text-center">
                        AI-generated flashcards will appear here.
                    </p>
                </div>
            )}

            {/* Navigation */}
            {flashcards.length > 0 && (
                <div className="flex gap-3 mt-4">
                    <button
                        onClick={previousCard}
                        disabled={currentIndex === 0}
                        className={`flex-1 py-2 rounded-xl transition ${
                            currentIndex === 0
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }`}
                    >
                        ← Previous
                    </button>

                    <button
                        onClick={nextCard}
                        disabled={
                            currentIndex === flashcards.length - 1
                        }
                        className={`flex-1 py-2 rounded-xl transition ${
                            currentIndex === flashcards.length - 1
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }`}
                    >
                        Next →
                    </button>
                </div>
            )}

            {/* Error */}
            {error && (
                <p className="mt-3 text-red-500">
                    {error}
                </p>
            )}

            {/* Generate */}
            <button
                onClick={generateFlashcards}
                disabled={loading}
                className={`mt-6 w-full text-white py-3 rounded-xl transition ${
                    loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-600"
                }`}
            >
                {loading
                    ? "Generating..."
                    : flashcards.length > 0
                    ? "Regenerate Flashcards"
                    : "Generate Flashcards"}
            </button>

        </div>
    );
}

export default FlashcardsCard;