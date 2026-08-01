import Header from "./components/Header";
import RecordingCard from "./components/RecordingCard";

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="max-w-7xl mx-auto p-6">
        <RecordingCard />
      </main>
    </div>
  );
}

export default App;