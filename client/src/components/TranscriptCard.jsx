import { useState } from "react";
import { FileText, Copy, Trash2 } from "lucide-react";

function TranscriptCard() {
  const [transcript, setTranscript] = useState(
  "Your live lecture transcript will appear here..."
);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex justify-between items-center mb-6">

        <div className="flex items-center gap-2">
          <FileText className="text-blue-600" size={24} />
          <h2 className="text-2xl font-bold">Live Transcript</h2>
        </div>

        <div className="flex gap-2">
          <button
  onClick={() => navigator.clipboard.writeText(transcript)}
  className="p-2 rounded-lg hover:bg-gray-100"
>
            <Copy size={20} />
          </button>

          <button
  onClick={() => setTranscript("")}
  className="p-2 rounded-lg hover:bg-gray-100"
>
            <Trash2 size={20} />
          </button>
        </div>

      </div>

      <div className="bg-gray-50 border rounded-xl p-4 min-h-[250px]">
        <p className="text-gray-700 whitespace-pre-wrap">
          {transcript}
        </p>
      </div>
    </div>
  );
}

export default TranscriptCard;