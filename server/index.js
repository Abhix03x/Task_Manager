import dotenv from 'dotenv';

dotenv.config();
import mongoose from 'mongoose';
import app from './src/app.js';
const PORT = process.env.PORT;

import connectDB from './src/config/db.js';
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`);
    });
})

