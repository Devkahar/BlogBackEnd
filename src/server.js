const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

require('colors');
const connectDB = require('./db/conn');
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
connectDB();
const userRoutes = require('./route/authRoute');


app.use(express.json());
const dir = path.resolve();
app.use('/uploads', express.static(path.join(dir, '/uploads')));
app.use('/api',userRoutes);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`.underline.yellow);
}); 