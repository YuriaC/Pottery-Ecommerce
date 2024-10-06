import validator from 'validator';
import {    
    NAME_MIN_LEN,
    NAME_MAX_LEN,
    DESC_MIN_LEN,
    DESC_MAX_LEN,
} from './global_variables.js'; 
import {MIN_YEAR, MAX_YEAR} from '../model/Brand.js'

const brandRegistrationValidation = (req, res, next) => {
    const {name, description, country, established, img} = req.body;
    if ( // if any input fields are empty
        !name ||
        !country ||
        !established ||
        validator.isEmpty(name) ||
        validator.isEmpty(country) ||
        validator.isEmpty(established)
    ) {
        return res.status(400).json({ message: 'Missing required fields!' });
    }

    // brand name must be of alphanumeric
    if (!validator.isAlphanumeric(name)) {
        return res.status(400).json({ message: 'Brand name must not contain special symbol' });
    }

    // if brand name too short
    if (name.length < NAME_MIN_LEN) {
        return res.status(400).json({ message: `Product name must contain at least ${NAME_MIN_LEN} characters` });
    }
    
    // if brand name too long
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

    // if country name too short
    if (country.length < NAME_MIN_LEN) {
        return res.status(400).json({ message: `Country name too short.`});
    }

    // if country name too long
    if (country.length > NAME_MAX_LEN) {
        return res.status(400).json({ message: `Country name exceeds max ${NAME_MAX_LEN} characters` });
    }

    if (established < MIN_YEAR || established > MAX_YEAR) {
        return res.status(400).json({ message: `Invalid year. Can't be earlier than ${MIN_YEAR} or be future year!`});
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

export default brandRegistrationValidation;