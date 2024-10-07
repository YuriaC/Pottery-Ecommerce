import { Schema, model } from 'mongoose';
import validator from 'validator';
import {    
    NAME_MIN_LEN,
    NAME_MAX_LEN,
    DESC_MIN_LEN,
    DESC_MAX_LEN,
    MIN_STOCK,
    MAX_STOCK,
    DEFAULT_IMG_PATH
} from './global_variables.js';

const MIN_PRICE = 0; 
const MAX_PRICE = Number.MAX_SAFE_INTEGER;

function nameValidator(name) {  
    const re = /^[a-zA-Z0-9\-.,_' ]+$/;
    return re.test(name)
}

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "A product has to have a name!"],
        minLength: [NAME_MIN_LEN, `Product name should be at least ${NAME_MIN_LEN} characters long.`],
        maxLength: [NAME_MAX_LEN, `Product name exceeds the limit of ${NAME_MAX_LEN} characters.`],
        validate: {
            validator: nameValidator,
            message: "No special character allowed in the username."
        },
    },

    productType: {
        type: String, 
        trim: true,
        required: true,
        minLength: [NAME_MIN_LEN, `Product type name should be at least ${NAME_MIN_LEN} characters long.`],
        maxLength: [NAME_MAX_LEN, `Product type name exceeds the limit of ${NAME_MAX_LEN} characters.`],
        validate: [validator.isAlphanumeric, "No special character allowed in the product type."]
    },

    brand: {
        type: Schema.Types.ObjectId,  // ObjectId reference to the Brand schema
        ref: 'Brand',  // 'Brand' is the name of the Brand model
        required: true,
    },

    description: {
        type: String,
        trim: true,
        minLength: [DESC_MIN_LEN, `Product description should be at least ${DESC_MIN_LEN} characters long.`],
        maxLength: [DESC_MAX_LEN, `Product description exceeds the limit of ${DESC_MAX_LEN} characters.`],
    },

    price: {
        type: Number,
        required: true,
        min: [MIN_PRICE, `Product price can't be lower than ${MIN_PRICE}! `],
        max: [MAX_PRICE, "Price exceeds upper limit!"]
    },

    stock: {
        type: Number,
        required: true,
        min: [MIN_STOCK, `Product stock can't be lower than ${MIN_STOCK}! `],
        max: [MAX_STOCK, "{VALUE} exceeds storage limit."]
    },

    // available: {
    //     type: Boolean,
    //     required: true,
    //     default: true,
    //     // need to be validated by checking stock property
    // },

    img: {
        type: String,
        default: DEFAULT_IMG_PATH,
        // validate: { 
        //     validator: value => validator.isURL(value, { protocols: ['http','https','ftp'], require_tld: true, require_protocol: true }),
        //     message: 'Must be a Valid URL' 
        // }
    },

    imgDescription: {
        type: String,
        default: "default product image",
    },

    createdAt: {
        type: Date,
        default:() => Date.now(),
        immutable: true
    },

    updatedAt: {
        type: Date,
        default:() => Date.now(),
    },
});

// Getter
productSchema.path('price').get(function(num) {
    return (num / 100).toFixed(2);
});

// Setter
productSchema.path('price').set(function(num) {
    return num * 100;
});


const Product = model('Product', productSchema); 
export {Product, nameValidator, MIN_PRICE, MAX_PRICE};


// to populate the brand reference
// Product.find()
//     .populate('brand')  // this will populate the brand field with brand details
//     .then(products => {
//         console.log(products);
//     })
//     .catch(err => {
//         console.error(err);
//     });