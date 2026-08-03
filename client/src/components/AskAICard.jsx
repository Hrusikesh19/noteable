import { Bot } from "lucide-react";

function AskAICard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="text-green-600" size={24} />
        <h2 className="text-2xl font-bold">AI Assistant</h2>
      </div>

      <textarea
        placeholder="Ask anything about today's lecture..."
        className="w-full border rounded-xl p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition">
        Ask AI
      </button>
    </div>
  );
}

export default AskAICard;