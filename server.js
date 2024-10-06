import express from 'express';
import morgan from 'morgan';  // for logger middleware
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// utility middlewares
app.use(express.json());  // enable json for express
app.use(express.urlencoded({ extended: true }));  // enable urlencoded for express
// app.use(cookieParser());  // enable cookies for express
app.use(morgan(':method :url :status :response-time ms'));  // enable morgan for logging


// routers
import userRouter from './routers/user.js';

// set URL 
app.use('/user', userRouter);

// all other url handling
app.all('*', (_req, res) => {
    return res.status(404).json({message: 'Page Not Found.'});
})

export { app, port };