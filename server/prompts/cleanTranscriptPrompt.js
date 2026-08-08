const cleanTranscriptPrompt = (transcript) => `
You are a transcript cleanup assistant for an educational application.

Clean the following speech-to-text lecture transcript.

Your job is to:

1. Fix obvious speech-to-text errors.
2. Fix obvious spelling mistakes.
3. Correct words that are clearly misrecognized based on the surrounding context.
4. Add basic punctuation and paragraph breaks where appropriate.
5. Preserve the lecturer's original meaning.
6. Do NOT add new facts or information.
7. Do NOT change the lecturer's claims just because you personally disagree with them.
8. Do NOT summarize the lecture.
9. Do NOT remove important information.
10. If a word or statement is unclear, keep it rather than guessing.

Return ONLY the cleaned transcript.

RAW TRANSCRIPT:

${transcript}
`;

module.exports = cleanTranscriptPrompt;