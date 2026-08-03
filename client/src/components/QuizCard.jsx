import { CircleHelp } from "lucide-react";

function QuizCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-center gap-2 mb-4">
        <CircleHelp className="text-red-500" size={24} />
        <h2 className="text-2xl font-bold">Quiz Generator</h2>
      </div>

      <div className="bg-red-50 border border-red-100 rounded-xl p-4 min-h-[180px]">
        <p className="text-gray-600">
          Generate a quiz based on today's lecture.
        </p>
      </div>

      <button className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition">
        Generate Quiz
      </button>
    </div>
  );
}

export default QuizCard;