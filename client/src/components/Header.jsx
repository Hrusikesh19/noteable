import { History, Settings, NotebookPen } from "lucide-react";

function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <NotebookPen className="text-blue-600" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              NoteAble
            </h1>
            <p className="text-sm text-slate-500">
              Voice-Activated Lecture Note Taker
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
            <History size={20} />
            History
          </button>

          <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
            <Settings size={20} />
            Settings
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;