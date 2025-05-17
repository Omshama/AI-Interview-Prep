const { GoogleGenerativeAI } = require('@google/generative-ai');
const { extractJSON } = require('../utils/helper');


const { questionAnswerPrompt,conceptExplainPrompt } = require('../utils/prompts');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateInterviewQuestions = async (req, res) => {
    try {
        let { role, experience, topicsToFocus, numberOfQuestions } = req.body;

        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        // Ensure topicsToFocus is an array
        if (typeof topicsToFocus === 'string') {
            topicsToFocus = topicsToFocus.split(/\s+/); // split on whitespace
        }

        // Pass the array directly to the prompt function (do NOT join here)
        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const rawText = response.text();

        // Clean and extract JSON from AI response
        const cleanedText = rawText
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        // Extract JSON array from first '[' to last ']'
        const firstBracket = cleanedText.indexOf('[');
        const lastBracket = cleanedText.lastIndexOf(']');
        const jsonString = cleanedText.substring(firstBracket, lastBracket + 1);

        const data = JSON.parse(jsonString);

        res.status(200).json({
            success: true,
            questions: data,
        });

    } catch (error) {
        console.error("Gemini API error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to generate questions",
            error: error.message,
        });
    }
};



const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = conceptExplainPrompt(question);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text();

    // Remove code block markers if present
    let cleanedText = rawText
      .replace(/^```json\s*/, '')
      .replace(/```$/, '')
      .trim();

    // Extract JSON substring only
    const jsonString = extractJSON(cleanedText);
    if (!jsonString) {
      throw new Error("No JSON found in the AI response");
    }

    const data = JSON.parse(jsonString);

    res.status(200).json({
      success: true,
      explanation: data,
    });

  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};


module.exports={generateInterviewQuestions,generateConceptExplanation};