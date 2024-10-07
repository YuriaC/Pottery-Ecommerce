import express from 'express';
const router = express.Router();
import {Product} from '../model/Product.js';
import {getBrandNames} from '../controller/BrandController.js';

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
    .post('/add', productRegistrationValidation, addProduct)
    .post('/addMany', multiRegistrationValidation, addProducts)
    .get('/', paginatedResults(Product), viewProducts)
    // .get('/all', async (req, res) => {
    //     try {
    //         const page = req.query.page ? parseInt(req.query.page) - 1 : 0;
    //         const limit = parseInt(req.query.limit) || 9;  // Default display 9 items per page
    //         const search = req.query.search || "";
    //         // let sort = req.query.sort || 'name';  // Default sort by name
    //         let brandSearch = req.query.brand || 'All';
    //         let type = req.query.productType || 'All';
    
    //         const typeOptions = ["kitchenware", "teaware", "decor"];
    //         const brandOptions = await getBrandNames();
    
    //         // Search by brand
    //         brandSearch = brandSearch === 'All' ? brandOptions : [brandSearch];
            
    //         // Search by type
    //         type = type === 'All' ? typeOptions : [type];
    
    //         // Sorting preferences
    //         // sort = req.query.sort ? req.query.sort.split(",") : [sort];
    //         // let sortBy = {};
    //         // sortBy[sort[0]] = sort[1] === 'desc' ? -1 : 1;
    
    //         // Get filtered products
    //         const products = await Product.find({
    //             name: { $regex: search, $options: "i" },  // Case-insensitive search
    //             brand: { $in: brandSearch },
    //             productType: { $in: type }  // Filter by type
    //         })
    //         // .sort(sortBy)
    //         .skip(page * limit)
    //         .limit(limit);
    
    //         // Get total count of filtered products
    //         const total = await Product.countDocuments({
    //             name: { $regex: search, $options: "i" },
    //             brand: { $in: brand },
    //             productType: { $in: type }
    //         });
    
    //         const response = {
    //             error: false,
    //             total,
    //             page: page + 1,
    //             limit,
    //             brands: brandOptions,
    //             types: typeOptions,
    //             products,
    //         };
    
    //         res.status(200).json(response);
    
    //     } catch (err) {
    //         console.error('Error in fetching products:', err);
    //         res.status(500).json({ error: true, message: "Internal Server Error" });
    //     }
    // })

    

export default router;