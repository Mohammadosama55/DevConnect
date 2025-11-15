const validator = require('validator');

// User Update Validator
const validateUserUpdate = (data) => {
    const errors = {};

    if (data.email && !validator.isEmail(data.email)) {
        errors.email = 'Valid email is required';
    }

    if (data.username && data.username.length < 3) {
        errors.username = 'Username must be at least 3 characters';
    }

    if (data.firstName && data.firstName.trim().length === 0) {
        errors.firstName = 'First name cannot be empty';
    }

    if (data.lastName && data.lastName.trim().length === 0) {
        errors.lastName = 'Last name cannot be empty';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

module.exports = {
    validateUserUpdate
};
