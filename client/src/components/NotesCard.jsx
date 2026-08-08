import { Sparkles } from "lucide-react";

function NotesCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-purple-600" size={24} />
        <h2 className="text-2xl font-bold">AI Smart Notes</h2>
      </div>

      <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 min-h-[220px]">
        <p className="text-gray-600">
          AI-generated lecture notes will appear here.
        </p>
      </div>

      <button className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl transition">
        ✨ Generate Notes
      </button>
    </div>
  );
}

export default NotesCard;