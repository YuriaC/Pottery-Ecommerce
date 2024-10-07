import { Schema, model } from 'mongoose';
import validator from 'validator';
import {    
    NAME_MIN_LEN,
    NAME_MAX_LEN,
    DESC_MIN_LEN,
    DESC_MAX_LEN,
    DEFAULT_IMG_PATH
} from './global_variables.js';

const MIN_YEAR = 1500;
const MAX_YEAR = new Date().getFullYear();

const brandSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "A brand has to have a name!"],
        unique: true,
        minLength: [NAME_MIN_LEN, `Brand name should be at least ${NAME_MIN_LEN} characters long.`],
        maxLength: [NAME_MAX_LEN, `Brand name exceeds the limit of ${NAME_MAX_LEN} characters.`],
        validate: [validator.isAlphanumeric, "No special character allowed in the brand name."],
    },

    description: {
        type: String,
        trim: true,
        minLength: [DESC_MIN_LEN, `Brand description should be at least ${DESC_MIN_LEN} characters long.`],
        maxLength: [DESC_MAX_LEN, `Brand description exceeds the limit of ${DESC_MAX_LEN} characters.`],
    },

    country: {
        type: String,
        trim: true,
        required: true,
        minLength: [NAME_MIN_LEN, `Country name should be at least ${NAME_MIN_LEN} character-long.`],
        maxLength: [NAME_MAX_LEN, `Country name exceeds the limit of ${NAME_MAX_LEN} characters.`],
    },

    established: {
        type: Number,
        required: true,
        min: [MIN_YEAR, "Year is too early!"],
        max: [MAX_YEAR, "Future years are not allowed!"]
    },

    img: {  // logo
        type: String,
        default: DEFAULT_IMG_PATH,
        // validate: { 
        //     validator: value => validator.isURL(value, { protocols: ['http','https','ftp'], require_tld: true, require_protocol: true }),
        //     message: 'Must be a Valid URL' 
        // }
    },

    imgDescription: {
        type: String,
        default: "default brand logo",
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

const Brand = model('Brand', brandSchema);
export {Brand, MIN_YEAR, MAX_YEAR};