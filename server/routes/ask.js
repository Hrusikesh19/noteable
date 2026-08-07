const express = require("express");
const askQuestion = require("../controllers/askController");

const router = express.Router();

/*
    POST /ask

    Receives the lecture transcript and student's question
    and forwards them to the AI Assistant controller.
*/
router.post("/", askQuestion);

module.exports = router;