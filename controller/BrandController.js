import {Brand} from '../model/Brand.js';

// add a brand
const addBrand = async (req, res) => {
    const {name, description, country, established} = req.body;
    try {
        // brand name duplication check 
        const brandNameCheck = await Brand.findOne({name: name});
        if (brandNameCheck) {return res.status(409).json({message:'Brand already exists'});}

        // create brand document
        const brand = await Brand.create({
            name,
            country,
            description,
            established,
        });
        // console.log(`Brand document for ${brand.name} created. \n`);  // debug
        return res.status(201).json({message:`Added brand ${name}!`});
        } catch (e) {
        return res.status(500).json({message: `ERROR: ${e}.`});
    }
};

// add multiple brands
const addBrands = async (req, res) => {
    try {
        let counter = 0;
        const brandList = req.body;
        for (let brand of brandList) {
            const {name, description, country, established} = brand;
            // brand name duplication check 
            const brandNameCheck = await Brand.findOne({name: name});
            if (brandNameCheck) {return res.status(409).json({message:'Brand already exists'});}

            // create brand document
            const newBrand = await Brand.create({
                name,
                country,
                description,
                established,
            });
            counter++;
            // console.log(`Brand document for ${newBrand.name} created. \n`);  // debug
        }
        return res.status(201).json({message:`Added ${counter} brands!`});
    } catch (e) {
        return res.status(500).json({message: `ERROR: ${e}.`});
    }
};

const getOne = async (req, res) => {
        // // Step 1. get userID from body
        // const { userId, username } = req.body;
        // console.log(userId, username);
        try {
            const brand = await Brand.find().select('-_id -__v').lean().exec();
            if (!brand) {return res.status(404).json({ message: 'Brand does not exist.' });}
            return res.status(200).json({ data : brand, message: 'Found 1 brand' });
        } catch (err) {
            return res.status(500).json({message: 'Internal server error',});
        }
};

const getAll = async (req, res) => {
    // Step 1. get userID from body
    const { userId, username } = req.body;
    console.log(userId, username);

    try {
        const todos = await Todo.find().select('-_id -__v').lean().exec();
        return res.status(200).json({ todos });
    } catch (err) {
        return res.status(500).json({message: 'Internal server error',});
    }
};

export { addBrand, addBrands, getOne, getAll };