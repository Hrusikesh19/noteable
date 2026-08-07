const express = require("express");
const generateFlashcards = require("../controllers/flashcardsController");

const router = express.Router();

/*
    POST /flashcards

    Generates study flashcards from a lecture transcript.
*/

router.post("/", generateFlashcards);

module.exports = router;