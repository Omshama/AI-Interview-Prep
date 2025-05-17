const Session = require('../models/Session');
const Question = require('../models/Question');

// @desc Create a new Session and Linked Questions
exports.createSession = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, description, questions } = req.body;
        const userId = req.user._id;

        const session = await Session.create({
            user: userId,
            role,
            experience,
            topicsToFocus,
            description,
        });

        const questionDocs = await Promise.all(
            questions.map(async (q) => {
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer,
                });
                return question._id; 
            })
        );

        session.questions = questionDocs;
        await session.save();

        res.status(201).json({ success: true, session }); 
    } catch (err) {
        console.error(err); // helpful for debugging
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

exports.getMySession = async (req, res) => {
    try {
        const sessions = await Session.find({ user: req.user.id })
            .sort({ createdAt: -1 }) // Sorts newest first
            .populate("questions");  // Includes full question docs

        res.status(200).json({
            success: true,
            sessions,
        });
    } catch (err) {
        console.error(err); // for debugging
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

exports.getSessionById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id)
            .populate({
                path: "questions",
                options: { sort: { isPinned: -1, createdAt: 1 } } // pinned first, then oldest
            });

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Session Not Found"
            });
        }

        res.status(200).json({ success: true, session });

    } catch (err) {
        console.error(err); // for debugging
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


exports.deleteSession=async(req,res)=>{
    try{
        const session =await Session.findById(req.params.id);
        if(!session)
        {
            return res.status(404).json({
                message:"Session Not Found"
            });
        }
        if(session.user.toString()!=req.user.id)
        {
            return res
            .status(402)
            .json({
                message:"Not Authorized to delete the session"
            });
        }
        await Question.deleteMany({session:session._id});
        await session.deleteOne();
        res.status(200).json({message:"Session deleted Successfully"});
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:"Sever Error"
        });
    }
};
