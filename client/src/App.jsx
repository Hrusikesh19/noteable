import Header from "./components/Header";

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-3xl font-bold">
            Welcome to NoteAble 🚀
          </h2>

          <p className="mt-3 text-gray-600">
            Your AI-powered lecture assistant.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;