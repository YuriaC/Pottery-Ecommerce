import express from 'express';
import morgan from 'morgan';  // for logger middleware
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();
const app = express();
const port = process.env.PORT;
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// routers
import userRouter from './routers/user.js';
import brandRouter from './routers/brand.js';
import productRouter from './routers/product.js';

// utility middlewares
app.use(
    cors({
        origin: `http://127.0.0.1:${port}`,
        credentials: true,  // enable cookies
    }),
);
app.use(cookieParser());  // enable cookies for express
app.use(express.json());  // enable json for express
app.use(express.urlencoded({ extended: true }));  // enable urlencoded for express
app.use(morgan(':method :url :status :response-time ms'));  // enable morgan for logging
app.use(express.static('/view')); // use static files from ./view


// set URL 
app.use('/user', userRouter);
app.use('/brand', brandRouter)
app.use('/product', productRouter);

// all other url handling
app.all('*', (_req, res) => {
    return res.status(404).json({message: 'Page Not Found.'});
})

export { app, port };