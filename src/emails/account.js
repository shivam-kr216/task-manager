const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(SET_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'Registered Email',
        subject: 'Thanks for joining us',
        text: `Welcome to our community, ${name}. Let me know how you get along with the app`
    });
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'Registered Email',
        subject: `Sorry to see you go, ${name}`,
        text: `Goodbye, ${name}! I hope to see you back sometime soon.`
    });
}


module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}