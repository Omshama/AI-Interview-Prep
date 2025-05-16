require('dotenv').config();
const express=require('express');
const cors =require("cors");
const path =require('path');
const connectDB=require('./config/db');
const authRoute=require('./routes/authRoute');
const questionRoute= require('./routes/questionRoute');
const sessionRoute=require('./routes/sessionRoute');

const app=express();

//Middleware to handle CORS
app.use(
    cors({
        origin:"*",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"],
    })
);
connectDB()
//Middleware 
app.use(express.json());

//Routes
app.use("/api/auth",authRoute);
// app.use("/api/question",questionRoute);
// app.use("/api/session",sessionRoute);

// app.use('/api/ai/generate-questions',protect,generateInterviewQuestions);
// app.use('/api/ai/generate-explanation',protect,generateConceptExplanation);
//Serve Uploads Folder 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Start Server
const PORT = process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log(`Server is Listening on ${PORT}`);
})