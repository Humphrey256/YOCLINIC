// utils/notifications.js
const Notification = require('../models/Notification');

exports.sendNotification = async (userEmail, message) => {
    try {
        const notification = new Notification({
            userEmail,
            message,
            status: 'unread'
        });
        await notification.save();
        return { message: 'Notification sent' };
    } catch (error) {
        console.error('Error sending notification:', error);
        throw error;
    }
};
