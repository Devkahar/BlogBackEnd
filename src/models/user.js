const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    countryCode:{
        type: String,
        required: true,
    },
    mobileNumber:{
        type: String,
        required: true,
    },
    profilePic:{
        type: String,

    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['user','admin']
    },
});


userSchema.methods.matchPassword = async function(passw){
    return await bcrypt.compare(passw,this.password);
}

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

const User = mongoose.model('User',userSchema);

module.exports = User;
