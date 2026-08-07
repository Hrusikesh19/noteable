/*
Prompt Template for Quiz Generation

This prompt helps Gemini generate multiple-choice
questions from a lecture transcript.
*/

const quizPrompt = (transcript) => `
You are an expert teacher.

Generate a quiz based ONLY on the lecture transcript.

Rules:

- Generate exactly 5 multiple-choice questions.
- Each question must have:
  - Question
  - Four options (A, B, C, D)
  - Correct Answer
- Do not invent information.
- Keep questions clear and student-friendly.

Format exactly like this:

Question 1:
What is Binary Search?

A. Sorting Algorithm
B. Searching Algorithm
C. Graph Algorithm
D. Hashing Algorithm

Answer: B

Question 2:
...

Lecture Transcript:

${transcript}
`;

module.exports = quizPrompt;