const jwt = require('jsonwebtoken');
const transport = require('./mailTransport');
const generateToken = (id,email) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  }
  /*
  ,async (error, token) => {
    try {
      const url = `https://localhost:5000/confirmation/${token}`;
    const info = await transport.sendMail({
      from: process.env.EMAILID,
      to: email,
      subject: 'Confirmation Email',
      html: `Click On link to Confirm your account <a href="${url}">${url}</a>`
    })
    if(info) console.log("Success",info);
    } catch (error) {
      console.log(error);
    }
    
  }
  */
  );
  
}

module.exports =generateToken;