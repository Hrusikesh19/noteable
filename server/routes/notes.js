const express = require("express");
const generateNotes = require("../controllers/notesController");

const router = express.Router();

/*
    POST /notes

    Receives the lecture transcript from the frontend
    and forwards it to the notes controller.
*/
router.post("/", generateNotes);

module.exports = router;