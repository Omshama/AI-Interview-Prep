const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Generate Jwt Token
const generateToken =(userId)=>{
    return jwt.sign(
        {
            id:userId
        },
        process.env.JWT_SECRET,
        {
            expiresIn:'7D'
        }
    );
};

const registerUser = async(req,res)=>{
    try{
         console.log("BODY:", req.body);
        const {name,email,password,profileImageUrl}= req.body;
        //Check user already exists

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                message:"User Already Exists"
            })
        };
        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        //create new user 
        const user =await User.create({
            name,
            email,
            password:hashedPassword,
            profileImageUrl,
        });
        //Return user data with Jwt 
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            profileImageUrl:user.profileImageUrl,
            token:generateToken(user._id),
        });
    }
    catch (err) {
  res.status(500).json({
    message: "Server Error",
    err: err.message,
  });
}

};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }); // ✅ Don't redeclare User

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message, // ✅ use correct error variable
    });
  }
};
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // ✅ use User model

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};
module.exports={registerUser,loginUser,getUserProfile};