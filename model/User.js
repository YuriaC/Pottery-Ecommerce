import { Schema, model } from 'mongoose';
import validator from "validator";


const USERNAME_MIN_LEN = 5;
const USERNAME_MAX_LEN = 20;
const EMAIL_MIN_LEN = 5;
const PWD_MIN_LEN = 8;

// Password error message function
function passWordValidationMsg(props, minLength = PWD_MIN_LEN) {
    const password = props.value;
    const hasUpperCase = /[A-Z]/.test(password);   // Checks for uppercase letter
    const hasLowerCase = /[a-z]/.test(password);   // Checks for lowercase letter
    const hasDigit = /[0-9]/.test(password);       // Checks for digit
    const hasSpecialChar = /[!_@#$%^&*(),.?":{}|<>]/.test(password);  // Checks for special character
    
    if (password.length < minLength) {
        return 'Password must be at least 8 characters long.';
    }
    if (!hasUpperCase) {
        return 'Password must contain at least one uppercase letter.';
    }
    if (!hasLowerCase) {
        return 'Password must contain at least one lowercase letter.';
    }
    if (!hasDigit) {
        return 'Password must contain at least one digit.';
    }
    if (!hasSpecialChar) {
        return 'Password must contain at least one special character.';
    }
    
    return 'Invalid password.';
}

const userSchema = new Schema({
    userName: {
        type: String, 
        trim: true, 
        required: true,
        unique: true,
        minLength: [USERNAME_MIN_LEN, `User name should be at least ${USERNAME_MIN_LEN} characters long.`],
        maxLength: [USERNAME_MAX_LEN, `User name length exceeds ${USERNAME_MAX_LEN} characters.`], 
        validate: [validator.isAlphanumeric, "No special character allowed in the username."],
    },

    adminAccess: {
        type: Boolean,
        default: false,
    },

    email: {
        type: String, 
        trim: true, 
        required: true, 
        unique: true,
        minLength: [EMAIL_MIN_LEN, "Email length too short!"],
        validate: [validator.isEmail, "Please enter a valid email address."],
    },

    password: {
        type: String, 
        trim: true, 
        required: true,
        validate : {
            validator: validator.isStrongPassword,
            message: passWordValidationMsg,
        },
    },


    salt: {
        type: String,
        trim: true,
        required: true,
    },
    

    createdAt: {
        type: Date, 
        default: () => Date.now(), 
        immutable: true,
    },
    
    updatedAt: {
        type: Date, 
        default: () => Date.now(),
    },
    
    likedProduct: {
        type: [String], 
        default: [],
    },

});

const User = model('User', userSchema);  // user model
export {User, USERNAME_MIN_LEN, USERNAME_MAX_LEN, EMAIL_MIN_LEN, PWD_MIN_LEN};
