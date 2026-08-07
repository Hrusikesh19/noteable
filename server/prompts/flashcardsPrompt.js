/*
Prompt Template for Flashcard Generation

This prompt helps Gemini convert a lecture transcript
into concise question-answer flashcards.
*/

const flashcardsPrompt = (transcript) => `
You are an expert study assistant.

Convert the following lecture transcript into flashcards.

Rules:
- Generate 5-10 flashcards.
- Each flashcard must have:
  - Question
  - Answer
- Keep answers short and clear.
- Cover the most important concepts only.
- Do not invent information.
- Format exactly like this:

Q: Question 1
A: Answer 1

Q: Question 2
A: Answer 2

Lecture Transcript:

${transcript}
`;

module.exports = flashcardsPrompt;