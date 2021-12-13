import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_KEY as string);

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  try {
    const msg = {
      from: process.env.FROM_EMAIL as string,
      to,
      subject,
      html,
    };
    const data = await sgMail.send(msg);
    return data;
  } catch (err) {
    return err;
  }
};
