const express = require('express');
const router = express.Router();
const loginRoute = require('./loginRoute');
const registerRoute = require('./registerRoute');
const myModule = require('./myModule'); // Correct path


router.use('/login', loginRoute);
router.use('/register', registerRoute);

module.exports = router;