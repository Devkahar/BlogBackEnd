const User = require('../models/user');
const generateToken = require('../utils/generateToken');


// @desc    Register a new user
// @route   POST /api/users
// @access  Public

exports.registerUser = async (req,res) =>{
    const {email,password,firstName,lastName,countryCode,mobileNumber} = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        throw new Error('User already Exists');
    }
    const image = req.file.filename;
    const user =  await User.create({
        email,
        password,
        firstName,
        lastName,
        profilePic: image,
        role: 'user',
        countryCode,
        mobileNumber
    });
    if(user){
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error('Invalid Details');
    }

}


// @desc    User LogIn
// @route   POST /api/users/login
// @access  Public

exports.loginUser = async (req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        })
    }
    else{
        res.status(400)
        throw new Error('Invaild Login Details');
    }
}
