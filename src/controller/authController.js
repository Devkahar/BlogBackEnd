const User = require('../models/user');
const generateToken = require('../utils/generateToken');
const asyncHandler =  require('express-async-handler')

// @desc    Register a new user
// @route   POST /api/users
// @access  Public

exports.registerUser = asyncHandler(async (req,res) =>{
    const {email,password,name} = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        throw new Error('User already Exists');
    }
    // const image = req.file.filename;
    const user =  await User.create({
        email,
        password,
        name,
        // profilePic: image,
        role: 'user',
    });
    if(user){
        res.status(201).json({
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id,role= 'user'),
        })
    }else{
        res.status(400)
        throw new Error('Invalid Details');
    }

})


// @desc    User LogIn
// @route   POST /api/users/login
// @access  Public

exports.loginUser =  asyncHandler(async (req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.status(200).json({
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id,role= 'user'),
        })
    }
    else{
        res.status(400)
        throw new Error('Invaild Login Details');
    }
});
