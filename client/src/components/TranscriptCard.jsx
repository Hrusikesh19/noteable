import { FileText, Copy, Trash2 } from "lucide-react";

function TranscriptCard({ transcript, onClear }) {

    const displayTranscript =
        transcript || "Your live lecture transcript will appear here...";

    const handleCopy = () => {
        if (!transcript) return;

        navigator.clipboard.writeText(transcript);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">

                <div className="flex items-center gap-2">
                    <FileText
                        className="text-blue-600"
                        size={24}
                    />

                    <h2 className="text-2xl font-bold">
                        Live Transcript
                    </h2>
                </div>

                <div className="flex gap-2">

                    {/* Copy */}
                    <button
                        onClick={handleCopy}
                        disabled={!transcript}
                        className={`p-2 rounded-lg ${
                            transcript
                                ? "hover:bg-gray-100"
                                : "text-gray-300 cursor-not-allowed"
                        }`}
                        title="Copy transcript"
                    >
                        <Copy size={20} />
                    </button>

                    {/* Clear */}
                    <button
                        onClick={onClear}
                        disabled={!transcript}
                        className={`p-2 rounded-lg ${
                            transcript
                                ? "hover:bg-gray-100"
                                : "text-gray-300 cursor-not-allowed"
                        }`}
                        title="Clear transcript"
                    >
                        <Trash2 size={20} />
                    </button>

                </div>
            </div>

            {/* Transcript */}
            <div className="bg-gray-50 border rounded-xl p-4 min-h-[250px]">

                <p
                    className={`whitespace-pre-wrap ${
                        transcript
                            ? "text-gray-700"
                            : "text-gray-400"
                    }`}
                >
                    {displayTranscript}
                </p>

            </div>

        </div>
    );
}

export default TranscriptCard;