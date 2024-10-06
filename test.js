
function isStrongPassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);   // Checks for uppercase letter
    const hasLowerCase = /[a-z]/.test(password);   // Checks for lowercase letter
    const hasDigit = /[0-9]/.test(password);       // Checks for digit
    const hasSpecialChar = /[!_@#$%^&*(),.?":{}|<>]/.test(password);  // Checks for special character
    
    if (password.length < minLength) {
        return { valid: false, message: 'Password must be at least 8 characters long.' };
    }
    if (!hasUpperCase) {
        return { valid: false, message: 'Password must contain at least one uppercase letter.' };
    }
    if (!hasLowerCase) {
        return { valid: false, message: 'Password must contain at least one lowercase letter.' };
    }
    if (!hasDigit) {
        return { valid: false, message: 'Password must contain at least one digit.' };
    }
    if (!hasSpecialChar) {
        return { valid: false, message: 'Password must contain at least one special character.' };
    }
    
    return { valid: true, message: 'Password is strong.' };
}

const password = 'passWord';

console.log(isStrongPassword(password).valid);