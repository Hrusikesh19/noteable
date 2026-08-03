import { useState, useEffect } from "react";
import { Mic, Square } from "lucide-react";

function RecordingCard() {
    const [isRecording, setIsRecording] = useState(false);
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
  let interval;

  if (isRecording) {
    interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  } else {
    setSeconds(0);
  }

  return () => clearInterval(interval);
}, [isRecording]);
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          🎤 Live Recording
        </h2>

        <span
  className={`px-3 py-1 rounded-full text-sm font-medium ${
    isRecording
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-600"
  }`}
>
  {isRecording ? "Recording..." : "Not Recording"}
</span>
      </div>

      <div className="mb-6 space-y-2">
  <p className="text-gray-600">
    Click the button below to start recording your lecture.
  </p>

  <div className="flex items-center gap-4 text-sm">
    <span className="font-semibold text-gray-700">
      ⏱ {String(Math.floor(seconds / 60)).padStart(2, "0")}:
{String(seconds % 60).padStart(2, "0")}
    </span>

    <span className="text-gray-500">
      Status: {isRecording ? "Listening..." : "Waiting to start"}
    </span>
  </div>
</div>

      <div className="flex gap-4">
        <button
  onClick={() => setIsRecording(true)}
  disabled={isRecording}
  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition text-white ${
    isRecording
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  <Mic size={20} />
  Start Recording
</button>

       <button
  onClick={() => setIsRecording(false)}
  disabled={!isRecording}
  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition ${
    isRecording
      ? "bg-red-500 hover:bg-red-600 text-white"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
>
  <Square size={20} />
  Stop
</button>
      </div>
    </div>
  );
}

export default RecordingCard;