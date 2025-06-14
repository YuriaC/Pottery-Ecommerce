import {Product} from '../model/Product.js';
import { Brand } from '../model/Brand.js';

// add a brand
const addProduct = async (req, res) => {
    const {name, brand, productType, description, stock, price, img} = req.body;
    try {
        // brand check 
        const brandId = await Brand.findOne({name: brand}).select('_id').lean().exec();
        if (!brandId) {return res.status(404).json({message:'Brand does not exist.'});}
        
        // product duplication check

        // create product document
        const product = await Product.create({
            name,
            brand: brandId,
            productType,
            description,
            stock,
            price,
            img
        });
        // console.log(`Product document for ${product.name} created. \n`);  // debug
        return res.status(201).json({message:`Added product ${product.name} of brand ${brand}!`});
        } catch (e) {
        return res.status(500).json({message: `ERROR: ${e}.`});
    }
};

// add multiple brands
const addProducts = async (req, res) => {
    try {
        let counter = 0;
        const productList = req.body;
        for (let product of productList) {
            const {name, brand, productType, description, stock, price, img} = product;

            // brand check 
            const brandId = await Brand.findOne({name: brand}).select('_id').lean().exec();
            if (!brandId) {return res.status(404).json({message:'Brand does not exist.'});}
            
            // product duplication check

            // create product document
            const newProduct = await Product.create({
                name,
                brand: brandId,
                productType,
                description,
                stock,
                price,
                img
            });
            counter++;
            console.log(`Product document for ${newProduct.name} created. \n`);  // debug
        } 
        return res.status(201).json({message:`Added ${counter} products!`});
    } catch (e) {
        return res.status(500).json({message: `ERROR: ${e}.`});
    }
};

export { addProduct, addProducts };