const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => {
  // Convert string topics to array by splitting on spaces
  const topicsArray = typeof topicsToFocus === 'string' 
    ? topicsToFocus.split(' ').filter(Boolean) // split by space and remove empty strings
    : [];

  return `
You are an AI trained to generate technical interview questions and answers.

Task:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${topicsArray.join(', ')}
- Generate ${numberOfQuestions} interview questions
- For each question, generate a detailed but beginner-friendly answer.
- If the answer needs a code example, include a small code block.
- Keep the formatting very clean and readable.
- Return a pure JSON array like:

[
  {
    "question": "Question here?",
    "answer": "Answer here."
  },
  ...
]

Important: Do not add any extra text. Only return valid JSON.
  `;
};


const conceptExplainPrompt = (question) => (
  `
You are an AI trained to generate explanations for interview questions.

Task:
- Explain the following interview question in depth as if you're teaching a beginner developer.
- Question: "${question}"
- After the explanation, provide a short and clear title that summarizes the concept.
- If the explanation includes a code example, include a small code block.
- Keep the formatting clean and easy to read.
- Return a valid JSON object in the following format:

{
  "title": "Short title here",
  "explanation": "Explanation here."
}

Important: Do not add any extra text outside the JSON format. Only return valid JSON.
  `
);

module.exports={conceptExplainPrompt,questionAnswerPrompt};