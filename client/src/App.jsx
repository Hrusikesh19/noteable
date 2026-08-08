import { useState } from "react";

import Header from "./components/Header";
import TranscriptCard from "./components/TranscriptCard";
import RecordingCard from "./components/RecordingCard";
import NotesCard from "./components/NotesCard";
import AskAICard from "./components/AskAICard";
import FlashcardsCard from "./components/FlashcardsCard";
import QuizCard from "./components/QuizCard";
import ResourcesCard from "./components/ResourcesCard";

function App() {
    const [transcript, setTranscript] = useState("");

    const handleTranscriptChange = (newTranscript) => {
        setTranscript(newTranscript);
    };

    const handleClearTranscript = () => {
        setTranscript("");
    };

    return (
        <div>
            <Header />

            <main className="max-w-7xl mx-auto p-6 space-y-8">

                {/* Welcome Section */}
                <div className="mb-2">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Welcome to NoteAble
                    </h1>

                    <p className="text-gray-600 mt-2 text-lg">
                        Record lectures, generate AI notes, create quizzes
                        and study smarter.
                    </p>
                </div>

                {/* Row 1 */}
                <div className="grid lg:grid-cols-2 gap-6">
                    <RecordingCard
                        onTranscriptChange={handleTranscriptChange}
                    />

                    <NotesCard transcript={transcript} />
                </div>

                {/* Row 2 */}
                <div className="grid lg:grid-cols-2 gap-6">
                    <TranscriptCard
                        transcript={transcript}
                        onClear={handleClearTranscript}
                    />

                    <AskAICard transcript={transcript} />
                </div>

                {/* Row 3 */}
                <div className="grid lg:grid-cols-2 gap-6">
                    <FlashcardsCard transcript={transcript} />
                    <QuizCard />
                </div>

                {/* Row 4 */}
                <div>
                    <ResourcesCard />
                </div>

            </main>
        </div>
    );
}

export default App;