const validator = require('validator');

// Profile Validator
const validateProfile = (data) => {
    const errors = {};

    if (data.bio && data.bio.length > 500) {
        errors.bio = 'Bio must be less than 500 characters';
    }

    if (data.website && !validator.isURL(data.website)) {
        errors.website = 'Please provide a valid website URL';
    }

    if (data.github && !validator.isURL(data.github)) {
        errors.github = 'Please provide a valid GitHub URL';
    }

    if (data.linkedin && !validator.isURL(data.linkedin)) {
        errors.linkedin = 'Please provide a valid LinkedIn URL';
    }

    if (data.skills && !Array.isArray(data.skills)) {
        errors.skills = 'Skills must be an array';
    }

    if (data.skills && data.skills.length > 20) {
        errors.skills = 'Maximum 20 skills allowed';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

module.exports = {
    validateProfile
};
