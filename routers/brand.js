import express from 'express';
const router = express.Router();

// import brand controller modules
import {
    addBrand,
    addBrands,
} from '../controller/BrandController.js';

// import brand validator middlewares
import {
    brandRegistrationValidation,
    multiRegistrationValidation
} from '../middleware/BrandValidation.js'; // Your middleware path

// set router
router
    .post('/add', brandRegistrationValidation, addBrand)
    .post('/addMany', multiRegistrationValidation, addBrands)

export default router;