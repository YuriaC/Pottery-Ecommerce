import validator from 'validator';
import {    
    NAME_MIN_LEN,
    NAME_MAX_LEN,
    DESC_MIN_LEN,
    DESC_MAX_LEN,
    MIN_STOCK,
    MAX_STOCK,
} from '../model/global_variables.js';
import {nameValidator, MIN_PRICE, MAX_PRICE} from '../model/Product.js'

const productRegistrationValidation = (req, res, next) => {
    const {name, brand, description, stock, price, productType, img} = req.body;
    if ( // if any input fields are empty
        !name ||
        !brand ||
        !stock || 
        !price || 
        !productType || 
        validator.isEmpty(name) ||
        validator.isEmpty(brand) ||
        validator.isEmpty(stock.toString()) ||
        validator.isEmpty(price.toString()) ||
        validator.isEmpty(productType)
    ) {
        return res.status(400).json({ message: 'Missing required fields!' });
    }

    // product name must be of alphanumeric
    if (!(nameValidator(name))) {
        return res.status(400).json({ message: 'Product name must not contain special symbol' });
    }

    // if product name too short
    if (name.length < NAME_MIN_LEN) {
        return res.status(400).json({ message: `Product name must contain at least ${NAME_MIN_LEN} characters` });
    }
    
    // if product name too long
    if (name.length > NAME_MAX_LEN) {
        return res.status(400).json({ message: `name contains ${name.length} characters, exceeding max ${NAME_MAX_LEN} characters` });
    }

    if (description) {  // validate description if provided 
        // if description too short
        if (description.length < DESC_MIN_LEN) {
            return res.status(400).json({ message: `description is too short.` });
        }

        // if description too long
        if (description.length > DESC_MAX_LEN) {
            return res.status(400).json({ message: `description exceeds max ${DESC_MAX_LEN} characters` });
        }
    }
    
    // validate stock
    if (stock < MIN_STOCK || stock > MAX_STOCK) {
        return res.status(400).json({ message: `Invalid stock quantity. Can't be negative or greater than ${MAX_STOCK}` });
    }

    // validate price
    if (isNaN(price) || price < MIN_PRICE || price > MAX_PRICE) {
        return res.status(400).json({ message: `Price must be a number between ${MIN_PRICE} and ${MAX_PRICE}` });
    }

    // if product type name too short
    if (productType.length < NAME_MIN_LEN) {
        return res.status(400).json({ message: `Product type's name must contain at least ${NAME_MIN_LEN} characters` });
    }
    
    // if product type name too long
    if (productType.length > NAME_MAX_LEN) {
        return res.status(400).json({ message: `Product type's name exceeds max ${NAME_MAX_LEN} characters` });
    }

    if (!validator.isAlphanumeric(productType)) {
        return res.status(400).json({ message: 'Product type must not contain special symbol' });
    }

    // validate img route
    if(img) {
        if (!validator.isURL(url, 
            { protocols: ['http','https','ftp'], 
                require_tld: true, require_protocol: true 
            })) 
        {
            return res.status(400).json({ message: "Invalid url!" });
        }          
    }

    next();
}

const multiRegistrationValidation = (req, res, next) => {
    const productList = req.body;
    if (!Array.isArray(productList) || productList.length === 0) {
        return res.status(400).json({ message: 'Request body must be a non-empty array!' });
    }
    for (let i = 0; i < productList.length; i++) {
        const {name, brand, description, stock, price, productType, img} = productList[i];
        if ( // if any input fields are empty
            !name ||
            !brand ||
            !stock || 
            !price || 
            !productType || 
            validator.isEmpty(name) ||
            validator.isEmpty(brand) ||
            validator.isEmpty(stock.toString()) ||
            validator.isEmpty(price.toString()) ||
            validator.isEmpty(productType)
        ) {
            return res.status(400).json({ message: `Item ${i} missing required fields!` });
        }
    
        // product name must be of alphanumeric
        if (!(nameValidator(name))) {
            return res.status(400).json({ message: `Product name ${name} contain special symbol` });
        }
    
        // if product name too short
        if (name.length < NAME_MIN_LEN) {
            return res.status(400).json({ message: `Product name must contain at least ${NAME_MIN_LEN} characters` });
        }
        
        // if product name too long
        if (name.length > NAME_MAX_LEN) {
            return res.status(400).json({ message: `Name ${name} contains ${name.length} characters, exceeding max ${NAME_MAX_LEN} characters` });
        }
    
        if (description) {  // validate description if provided 
            // if description too short
            if (description.length < DESC_MIN_LEN) {
                return res.status(400).json({ message: `description is too short.` });
            }
    
            // if description too long
            if (description.length > DESC_MAX_LEN) {
                return res.status(400).json({ message: `description exceeds max ${DESC_MAX_LEN} characters` });
            }
        }
        
        // validate stock
        if (stock < MIN_STOCK || stock > MAX_STOCK) {
            return res.status(400).json({ message: `Invalid stock quantity. Can't be negative or greater than ${MAX_STOCK}` });
        }
    
        // validate price
        if (isNaN(price) || price < MIN_PRICE || price > MAX_PRICE) {
            return res.status(400).json({ message: `Price must be a number between ${MIN_PRICE} and ${MAX_PRICE}` });
        }
    
        // if product type name too short
        if (productType.length < NAME_MIN_LEN) {
            return res.status(400).json({ message: `Product type's name must contain at least ${NAME_MIN_LEN} characters` });
        }
        
        // if product type name too long
        if (productType.length > NAME_MAX_LEN) {
            return res.status(400).json({ message: `Product type's name exceeds max ${NAME_MAX_LEN} characters` });
        }
    
        // valid productType
        if (!validator.isAlphanumeric(productType)) {
            return res.status(400).json({ message: 'Product type must not contain special symbol' });
        }
    
        // validate img route
        if(img) {
            if (!validator.isURL(url, 
                { protocols: ['http','https','ftp'], 
                    require_tld: true, require_protocol: true 
                })) 
            {
                return res.status(400).json({ message: "Invalid url!" });
            }          
        }
    }

    next();
}

export {productRegistrationValidation, multiRegistrationValidation};