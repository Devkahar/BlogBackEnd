const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth:{
        user: process.env.EMAILID,
        pass: process.env.PASSWORD
    },
})

module.exports = transport;