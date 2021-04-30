const express = require('express');
const router = express.Router();
const {upload} = require('../middleware/fileUploadMiddleware');
const { registerUser, loginUser } = require('../controller/authController');

router.post('/user',upload.single('image'),registerUser);

router.post('/user/login',loginUser);

module.exports = router;