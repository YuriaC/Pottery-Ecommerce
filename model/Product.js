import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "A product has to have a name!"],
        minLength: [2, "The product name is too short."],
        maxLength: [100, "The product name is too long (max 100 characters)."],
    },

    brand: {
        ref,  // needs to reference brand document
    }, 

    description: {
        type: String,
        trim: true,
        minLength: [5, "Product description too short. Has to be at least 5-character long."],
        maxLength: [300, "Product description too long. {VALUE} / 300."],
    },

    stock: {
        type: Number,
        required: true,
        min: [0, "product stock can't be lower than 0! "],
        max: [9999, "{VALUE} exceeds storage limit =["]
    },

    available: {
        type: Boolean,
        required: true,
        // need to be validated by checking stock property
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

    img: {
        type: String,
        description: String,
    }
});

const Product = model('Product', productSchema);  // user model
export default Product;