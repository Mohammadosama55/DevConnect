const validator = require('validator');

// Register Validator
const validateRegister = (data) => {
    const errors = {};

    if (!data.email || !validator.isEmail(data.email)) {
        errors.email = 'Valid email is required';
    }

    if (!data.username || data.username.length < 3) {
        errors.username = 'Username must be at least 3 characters';
    }

    if (!data.firstName || data.firstName.trim().length === 0) {
        errors.firstName = 'First name is required';
    }

    if (!data.lastName || data.lastName.trim().length === 0) {
        errors.lastName = 'Last name is required';
    }

    if (!data.password || data.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// Login Validator
const validateLogin = (data) => {
    const errors = {};

    if (!data.email || !validator.isEmail(data.email)) {
        errors.email = 'Valid email is required';
    }

    if (!data.password || data.password.length === 0) {
        errors.password = 'Password is required';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

module.exports = {
    validateRegister,
    validateLogin
};
