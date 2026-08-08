import { useState } from "react";
import { Sparkles } from "lucide-react";

function NotesCard({ transcript }) {
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const generateNotes = async () => {
        if (!transcript || transcript.trim() === "") {
            setError("Please record a lecture first.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await fetch("http://localhost:3000/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    transcript: transcript,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate notes.");
            }

            setNotes(data.notes);
        } catch (error) {
            console.error("Notes Error:", error);
            setError("Failed to generate notes.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6">

            <div className="flex items-center gap-2 mb-4">
                <Sparkles
                    className="text-purple-600"
                    size={24}
                />

                <h2 className="text-2xl font-bold">
                    AI Smart Notes
                </h2>
            </div>

            <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 min-h-[220px]">
                {loading ? (
                    <p className="text-purple-600">
                        Generating notes...
                    </p>
                ) : error ? (
                    <p className="text-red-500">
                        {error}
                    </p>
                ) : notes ? (
                    <p className="text-gray-700 whitespace-pre-wrap">
                        {notes}
                    </p>
                ) : (
                    <p className="text-gray-600">
                        AI-generated lecture notes will appear here.
                    </p>
                )}
            </div>

            <button
                onClick={generateNotes}
                disabled={loading}
                className={`mt-6 w-full text-white py-3 rounded-xl transition ${
                    loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-purple-600 hover:bg-purple-700"
                }`}
            >
                {loading ? "Generating..." : "✨ Generate Notes"}
            </button>

        </div>
    );
}

export default NotesCard;