const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signInRequired = (req,res,next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token,process.env.JWT_SECRET);
        req.user = user;
        console.log(token);
        next();
    }
    else{
        return res.status(500).json({
            message: "Auth required"
        })
    }
}

exports.adminMiddleware = (req,res,next)=>{
    const role = req.user.role;
    if(role==="admin"){
        next();
    }else{
        return res.status(403).json({message: "Access Denide"});
    }
}