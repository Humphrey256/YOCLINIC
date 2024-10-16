const { check, validationResult } = require('express-validator');

// Validation Rules for Registration
const validateRegister = [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Please enter a valid email'),
    check('contact').not().isEmpty().withMessage('Contact is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

// Error Handling Middleware
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { validateRegister, handleValidationErrors };
