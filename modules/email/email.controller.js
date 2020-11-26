const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    const msg = {
      from: process.env.FROM_EMAIL,
      to,
      subject,
      html
    };
    const data = await sgMail.send(msg);
    return data;
  } catch (err) {
    return error;
  }
}

module.exports = { sendEmail };
