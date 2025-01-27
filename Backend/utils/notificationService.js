import nodemailer from 'nodemailer';

// Email configuration (replace with your own SMTP settings)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
    },
});

// Send a notification email to the patient
export const sendNotification = (email, message) => {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Appointment Confirmation',
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};
