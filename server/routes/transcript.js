const express = require("express");
const cleanTranscript = require("../controllers/transcriptController");

const router = express.Router();

router.post("/", cleanTranscript);

module.exports = router;