import express from 'express';
const router = express.Router();

// import product validator middlewares
import {
    productRegistrationValidation, 
    multiRegistrationValidation
} from '../middleware/ProductValidation.js';

// import product controllers
import {
    addProduct,
    addProducts
} from '../controller/ProductController.js'

// set router
router
    .post('/add', productRegistrationValidation, addProduct)
    .post('/addMany', multiRegistrationValidation, addProducts)

export default router;