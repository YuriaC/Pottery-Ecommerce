import express from 'express';
const router = express.Router();

// import user controller modules
import {
    register,
    login,
    logout,
    verifyToken,
} from '../controller/UserController.js';

// import user validator middlewares
import {
    userRegistrationValidation,
    userLoginValidation,
} from '../middleware/UserValidation.js';

// import jwt validator middleware 
import jwtValidation from '../middleware/AuthValidation.js';

// set router
router
    .post('/register', userRegistrationValidation, register)
    .post('/login', userLoginValidation, login)
    .get('/logout', logout)
    .get('/verifyToken', jwtValidation, verifyToken)

export default router;