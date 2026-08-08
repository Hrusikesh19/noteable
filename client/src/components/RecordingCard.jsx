import { useState, useEffect, useRef } from "react";
import { Mic, Square } from "lucide-react";

function RecordingCard({ onTranscriptChange }) {
    const [isRecording, setIsRecording] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [transcript, setTranscript] = useState("");
    const [cleaning, setCleaning] = useState(false);

    const recognitionRef = useRef(null);
    const transcriptRef = useRef("");

    useEffect(() => {
        let interval;

        if (isRecording) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRecording]);

    const startRecording = () => {
        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert(
                "Speech recognition is not supported in this browser. Please use Google Chrome."
            );
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event) => {
            let finalTranscript = "";

            for (let i = 0; i < event.results.length; i++) {
                finalTranscript +=
                    event.results[i][0].transcript;
            }

            transcriptRef.current = finalTranscript;

            setTranscript(finalTranscript);

            // Keep the live transcript available to App
            if (onTranscriptChange) {
                onTranscriptChange(finalTranscript);
            }
        };

        recognition.onerror = (event) => {
            console.error(
                "Speech Recognition Error:",
                event.error
            );
        };

        recognition.onend = () => {
            setIsRecording(false);
        };

        recognitionRef.current = recognition;

        transcriptRef.current = "";
        setTranscript("");
        setSeconds(0);
        setIsRecording(true);

        recognition.start();
    };

    const cleanTranscript = async (rawTranscript) => {
        if (!rawTranscript || rawTranscript.trim() === "") {
            return;
        }

        try {
            setCleaning(true);

            const response = await fetch(
                "http://localhost:3000/transcript",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        transcript: rawTranscript,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error ||
                        "Failed to clean transcript."
                );
            }

            const cleanedTranscript =
                data.transcript || rawTranscript;

            setTranscript(cleanedTranscript);

            if (onTranscriptChange) {
                onTranscriptChange(cleanedTranscript);
            }

        } catch (error) {
            console.error(
                "Transcript Cleanup Error:",
                error
            );

            // If cleanup fails, keep the original transcript
            setTranscript(rawTranscript);

            if (onTranscriptChange) {
                onTranscriptChange(rawTranscript);
            }

        } finally {
            setCleaning(false);
        }
    };

    const stopRecording = async () => {
        const rawTranscript = transcriptRef.current;

        if (recognitionRef.current) {
            recognitionRef.current.stop();
            recognitionRef.current = null;
        }

        setIsRecording(false);

        // Clean the complete transcript only once
        await cleanTranscript(rawTranscript);
    };

    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const remainingSeconds = totalSeconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6">

            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                    🎤 Live Recording
                </h2>

                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isRecording
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                    }`}
                >
                    {isRecording
                        ? "Recording..."
                        : "Not Recording"}
                </span>
            </div>

            <div className="mb-6 space-y-2">
                <span className="text-gray-500">
                    Status:{" "}
                    {cleaning
                        ? "Cleaning transcript..."
                        : isRecording
                        ? "Listening..."
                        : "Waiting to start"}
                </span>

                <div className="text-2xl font-mono font-semibold">
                    {formatTime(seconds)}
                </div>
            </div>

            <div className="flex gap-4">

                <button
                    onClick={startRecording}
                    disabled={isRecording || cleaning}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl transition text-white ${
                        isRecording || cleaning
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    <Mic size={20} />
                    Start Recording
                </button>

                <button
                    onClick={stopRecording}
                    disabled={!isRecording || cleaning}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl transition ${
                        isRecording
                            ? "bg-red-500 hover:bg-red-600 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                    <Square size={20} />
                    Stop Recording
                </button>

            </div>

            <div className="mt-6">

                <h3 className="font-semibold mb-2">
                    Speech Preview
                </h3>

                <div className="bg-gray-50 rounded-xl p-4 text-gray-700 min-h-[80px]">
                    {cleaning
                        ? "🤖 Cleaning and correcting the transcript..."
                        : transcript ||
                          "Your speech will appear here..."}
                </div>

            </div>

        </div>
    );
}

export default RecordingCard;