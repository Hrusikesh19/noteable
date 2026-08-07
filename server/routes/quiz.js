const express = require("express");
const generateQuiz = require("../controllers/quizController");

const router = express.Router();

/*
POST /quiz

Generates multiple-choice quiz questions
from a lecture transcript.
*/

router.post("/", generateQuiz);

module.exports = router;