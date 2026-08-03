/*
  This is Prompt Template for Note Generation

  Keeping prompts in a separate file follows the Separation of Concerns principle.
  If the quality or format of AI-generated notes needs to be improved,
  only this file needs to be modified without touching the backend logic.
*/




const notesPrompt = (transcript) => `
You are an expert note-taking assistant.

Convert the following lecture transcript into well-structured study notes.

Rules:
- Use proper headings and subheadings.
- Use bullet points where appropriate.
- Keep the notes concise but complete.
- Highlight important keywords in bold.
- If definitions exist, write them clearly.
- If formulas or steps are mentioned, preserve them.
- End with a short summary.

Lecture Transcript:

${transcript}
`;

module.exports = notesPrompt;