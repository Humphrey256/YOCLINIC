const express = require('express');
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get notifications for logged-in user
router.get('/', authMiddleware.verifyToken, notificationController.getNotifications);

// Mark notification as read
router.put('/:id/read', authMiddleware.verifyToken, notificationController.markNotificationAsRead);

module.exports = router;
