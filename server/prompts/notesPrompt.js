/*
  This is Prompt Template for Note Generation

  Keeping prompts in a separate file follows the Separation of Concerns principle.
  If the quality or format of AI-generated notes needs to be improved,
  only this file needs to be modified without touching the backend logic.
*/




const notesPrompt = (transcript) => `
You are an expert note-taking assistant.

Convert the following lecture transcript into clean, well-organized study notes.

Instructions:
- Use clear headings and subheadings.
- Use bullet points where appropriate.
- Explain concepts in simple language.
- Highlight important keywords using **bold**.
- Include definitions if mentioned.
- Preserve formulas, equations, or numbered steps.
- Remove filler words or repeated sentences.
- End with a short "Summary" section.
- Do not invent information that is not present in the transcript.

Lecture Transcript:

${transcript}
`;

module.exports = notesPrompt;