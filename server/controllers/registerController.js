const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validateRegister, validateLogin } = require('../validators/registerValidator');
const { asyncHandler, AppError } = require('../utils/errorHandler');

const registerUser = asyncHandler(async (req, res, next) => {
    // Validate input
    const { isValid, errors } = validateRegister(req.body);
    if (!isValid) {
        return next(new AppError(JSON.stringify(errors), 400));
    }

    const { email, username, firstName, lastName, password } = req.body;

    // Check if user already exists
    const duplicateUser = await User.findOne({ $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }] });
    if (duplicateUser) {
        return next(new AppError('Email or username already in use.', 409));
    }

    // Hash password with bcrypt 10 salt rounds
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        firstName,
        lastName,
        password: hashedPassword
    });

    // Remove password before sending back
    const { password: _, ...userData } = newUser.toObject();

    res.status(201).json({ message: 'User registered successfully', user: userData });
});

module.exports = {
    registerUser
}