import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { UserRouter } from './routes/user.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const PORT=process.env.PORT;
const app=express();
app.use(cookieParser());

const allowedOrigins = [
  'http://localhost:5173',
  'https://gemini-mind.onrender.com'
];

app.use(cors({
   origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
})
app.use(express.json());
app.use('/auth',UserRouter);
const passKEY=process.env.MONGODB
mongoose.connect(`mongodb+srv://21A91A05C3:${passKEY}@cluster0.ulmfisc.mongodb.net/AUTHENTICATION?retryWrites=true&w=majority&appName=Cluster0`) 
.then(() => {
   console.log("Connected to MongoDB");
})
.catch((error) => {
   console.error("Error connecting to MongoDB:", error);
});

app.get('/', async (req,res)=>{
   res.send("welcome")
})
app.listen(PORT,()=>{
   console.log("Server is running")
})

