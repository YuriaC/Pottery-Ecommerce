import express from 'express';
const router = express.Router();
import {Product} from '../model/Product.js';

// import product validator middlewares
import {
    productRegistrationValidation, 
    multiRegistrationValidation
} from '../middleware/ProductValidation.js';

// import pagination middleware
import paginatedResults from '../middleware/paginatedView.js';

// import product controllers
import {
    addProduct,
    addProducts,
    viewProducts
} from '../controller/ProductController.js'

// set router
router
    .get('/', paginatedResults(Product), viewProducts)
    .post('/add', productRegistrationValidation, addProduct)
    .post('/addMany', multiRegistrationValidation, addProducts)


export default router;