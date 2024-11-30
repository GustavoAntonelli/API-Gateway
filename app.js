import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import loginRouter from './routes/login.js'
import singUpRouter from './routes/singUp.js';
import taskRouter from './routes/task.js';
import myAccountRouter from './routes/myAccount.js';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";

dotenv.config()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRouter);
app.use('/sing-up', singUpRouter);
app.use('/task', taskRouter);
app.use('/my-account', myAccountRouter);

export default app;
