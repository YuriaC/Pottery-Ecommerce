import validator from 'validator';
import {    
    NAME_MIN_LEN,
    NAME_MAX_LEN,
    DESC_MIN_LEN,
    DESC_MAX_LEN,
    MIN_STOCK,
    MAX_STOCK,
} from './global_variables.js';

const productRegistrationValidation = (req, res, next) => {
    const {name, brand, description, stock, img} = req.body;
    if ( // if any input fields are empty
        !name ||
        !brand ||
        !stock || 
        validator.isEmpty(name) ||
        validator.isEmpty(brand) ||
        validator.isEmpty(stock)
    ) {
        return res.status(400).json({ message: 'Missing required fields!' });
    }

    // product name must be of alphanumeric
    if (!validator.isAlphanumeric(name)) {
        return res.status(400).json({ message: 'Product name must not contain special symbol' });
    }

    // if product name too short
    if (name.length < NAME_MIN_LEN) {
        return res.status(400).json({ message: `Product name must contain at least ${NAME_MIN_LEN} characters` });
    }
    
    // if product name too long
    if (name.length > NAME_MAX_LEN) {
        return res.status(400).json({ message: `Username contains ${userName.length} characters, exceeding max ${NAME_MAX_LEN} characters` });
    }

    if (description) {  // validate description if provided 
        // if description too short
        if (description.length < DESC_MIN_LEN) {
            return res.status(400).json({ message: `description is too short.` });
        }

        // if description  too long
        if (description.length > DESC_MAX_LEN) {
            return res.status(400).json({ message: `description exceeds max ${DESC_MAX_LEN} characters` });
        }
    }

    // validate stock
    if (stock < MIN_STOCK || stock > MAX_STOCK) {
        return res.status(400).json({ message: `Invalid stock quantity. Can't be negative or greater than ${MAX_STOCK}` });
    }

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

export default productRegistrationValidation;