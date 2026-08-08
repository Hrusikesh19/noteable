import { BookOpen } from "lucide-react";

function FlashcardsCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="text-orange-500" size={24} />
        <h2 className="text-2xl font-bold">Flashcards</h2>
      </div>

      <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 min-h-[180px]">
        <p className="text-gray-600">
          AI-generated flashcards will appear here.
        </p>
      </div>

      <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl transition">
        Generate Flashcards
      </button>
    </div>
  );
}

export default FlashcardsCard;