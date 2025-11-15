require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateLogin } = require('../validators/registerValidator');
const { asyncHandler, AppError } = require('../utils/errorHandler');

const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password, persist } = req.body;

    // Validate input
    const { isValid, errors } = validateLogin({ email, password });
    if (!isValid) {
        return next(new AppError(JSON.stringify(errors), 400));
    }

    // Search for user in the db
    const foundUser = await User.findOne({ email: email.toLowerCase() });
    if (!foundUser) {
        return next(new AppError('Invalid email or password', 401));
    }

    // Compare passwords
    const pwdMatch = await bcrypt.compare(password, foundUser.password);
    if (!pwdMatch) {
        return next(new AppError('Invalid email or password', 401));
    }

    // Generate access token
    const accessToken = jwt.sign(
        {
            id: foundUser._id,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            username: foundUser.username,
            email: foundUser.email,
            role: foundUser.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
        {
            id: foundUser._id,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            username: foundUser.username,
            email: foundUser.email,
            role: foundUser.role
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' }
    );

    // Save refreshToken and update last login
    foundUser.refreshToken = refreshToken;
    foundUser.lastLogin = new Date();
    await foundUser.save();

    // Remove sensitive data before sending back
    const userData = foundUser.toObject();
    delete userData.password;
    delete userData.refreshToken;

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: persist ? 15 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000
    });

    res.json({
        message: `Welcome back, ${userData.firstName}!`,
        user: userData,
        accessToken
    });
});

module.exports = {
    loginUser
};