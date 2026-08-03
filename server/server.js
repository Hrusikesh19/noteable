require("dotenv").config();

const express = require("express");
const notesRoutes = require("./routes/notes");

const app = express();

app.use(express.json());

const PORT = 3000;

/*
    Root Route

    Used only to verify that the backend
    server is running successfully.
*/
app.get("/", (req, res) => {
    res.send("Welcome to Noteable Backend 🚀");
});

/*
    Notes Route

    Handles all note-generation requests.
*/
app.use("/notes", notesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});