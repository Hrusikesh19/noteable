require("dotenv").config();
const cors = require("cors");

const express = require("express");
const notesRoutes = require("./routes/notes");
const askRoutes = require("./routes/ask");
const flashcardsRoutes = require("./routes/flashcards");
const quizRoutes = require("./routes/quiz");
const transcriptRoutes = require("./routes/transcript");

const app = express();
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Welcome to Noteable Backend 🚀");
});

app.use("/notes", notesRoutes);
app.use("/ask", askRoutes);
app.use("/flashcards", flashcardsRoutes);
app.use("/quiz", quizRoutes);
app.use("/transcript", transcriptRoutes);

app.post("/test", (req, res) => {
    res.json({
        message: "Test route works!"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});