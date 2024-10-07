import validator from 'validator';
import {    
    NAME_MIN_LEN,
    NAME_MAX_LEN,
    DESC_MIN_LEN,
    DESC_MAX_LEN,
} from '../model/global_variables.js';
import {MIN_YEAR, MAX_YEAR} from '../model/Brand.js'

const brandRegistrationValidation = (req, res, next) => {
    const {name, description, country, established} = req.body;
    if ( // if any input fields are empty
        !name ||
        !country ||
        !established ||
        validator.isEmpty(name) ||
        validator.isEmpty(country) ||
        validator.isEmpty(established.toString())
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
        return res.status(400).json({ message: `Brand name contains ${name.length} characters, exceeding max ${NAME_MAX_LEN} characters` });
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

    // if(img) {
    //     if (!validator.isURL(url, 
    //         { protocols: ['http','https','ftp'], 
    //             require_tld: true, require_protocol: true 
    //         })) 
    //     {
    //         return res.status(400).json({ message: "Invalid url!" });
    //     }          
    // }

    next();
}

const multiRegistrationValidation = (req, res, next) => {
    const brandList = req.body;
    if (!Array.isArray(brandList) || brandList.length === 0) {
        return res.status(400).json({ message: 'Request body must be a non-empty array!' });
    }
    for (let i = 0; i < brandList.length; i++) {
        const { name, description, country, established } = brandList[i];
        if ( // if any input fields are empty
            !name ||
            !country ||
            !established ||
            validator.isEmpty(name) ||
            validator.isEmpty(country) ||
            validator.isEmpty(established.toString())
        ) {
            return res.status(400).json({ message: 'Missing required fields!' });
        }
    
        // brand name must be of alphanumeric
        if (!validator.isAlphanumeric(name)) {
            return res.status(400).json({ message: `Brand name ${name} contains special symbol`});
        }
    
        // if brand name too short
        if (name.length < NAME_MIN_LEN) {
            return res.status(400).json({ message: `Product name must contain at least ${NAME_MIN_LEN} characters` });
        }
        
        // if brand name too long
        if (name.length > NAME_MAX_LEN) {
            return res.status(400).json({ message: `Brand name contains ${name.length} characters, exceeding max ${NAME_MAX_LEN} characters` });
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
    
        // if(img) {
        //     if (!validator.isURL(url, 
        //         { protocols: ['http','https','ftp'], 
        //             require_tld: true, require_protocol: true 
        //         })) 
        //     {
        //         return res.status(400).json({ message: "Invalid url!" });
        //     }          
        // }
    }

    next();
}


export { brandRegistrationValidation, multiRegistrationValidation };