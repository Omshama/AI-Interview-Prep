const Question = require('../models/Question');
const Session=require('../models/Session');

// adding addtional Questions to an existing session 
exports.addQuestionToSession = async (req, res) => {
    try {
        const { sessionId, questions } = req.body;

        if (!sessionId || !questions || !Array.isArray(questions)) {
            return res.status(400).json({
                success: false,
                message: "Invalid input data",
            });
        }

        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Session not found",
            });
        }

        // Create new questions
        const createdQuestions = await Question.insertMany(
            questions.map((q) => ({
                session: sessionId,
                question: q.question,
                answer: q.answer,
            }))
        );

        // Push question IDs to the session
        session.questions.push(...createdQuestions.map((q) => q._id));
        await session.save();

        res.status(201).json({
            success: true,
            createdQuestions,
        });

    } catch (err) {
        console.error(err); // helpful for debugging
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

//Pin and Unpin Question
exports.togglePinQuestion=async(req,res)=>{
    try{
        const question = await Question.findById(req.params.id);
        if(!question)
        {
            return res
            .status(404)
            .json({
                success:false,
                message:"Question Not Found"
            });
        }
        question.isPinned=!question.isPinned;
        await question.save();
        res.status(200)
        .json({
            success:true,
            question
        })


    }
    catch(err)
    {
        res.status(500)
        .json({
            message:"Server Error "
        });
    }
};

exports.updateQuestionNote=async(req,res)=>{
    try{
        const{note} =req.body;
        const question=await Question.findById(req.params.id);
        if(!question)
        {
            return res
            .status(404)
            .json({
                success:false,
                message:"Question Not Found"
            });
        }
        question.note=note||"";
        await question.save();
        res.status(200)
        .json({
            success:true,
            question
        });
    }
    catch(err)
    {
        res.status(500)
        .json({
            message:"Server Error "
        });
    }
    
}
