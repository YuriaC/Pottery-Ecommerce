import express from 'express';
const router = express.Router();

// import user controller modules
import {
    register,
    login,
    logout,
    // verifyToken,
} from '../controller/UserController.js';

// import user validator middlewares
// user validator middlewares
import {
    userRegistrationValidation,
    userLoginValidation,
} from '../middleware/UserValidation.js';


// import jwt validator middleware 


// set router
router
    .post('/register', userRegistrationValidation, register)
    .post('/login', userLoginValidation, login)
    .get('/logout', logout)
    // .get('/verifyToken')

export default router;