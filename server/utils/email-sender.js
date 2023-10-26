import jwt from "jsonwebtoken";
/* import sendGrid from '@sendgrid/mail' */

import MailGun from "mailgun.js";
import formData from "form-data";

const confirmationEmailSender = async (doc, next) => {
  try {
    /* sendGrid.setApiKey(process.env.SEND_GRID_KEY_SECRET)  */
    const mgInstance = new MailGun(formData);

    const mg = mgInstance.client({
      username: "api",
      key: process.env.MAIL_GUN_API_KEY,
    });
    const MAIL_GUN_DOMAIN = process.env.MAIL_GUN_DOMAIN;

    const payload = {
      email: doc.email,
      userId: doc._id,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: 3600,
    });
    const emailMessage = {
      to: doc.email,
      from: "Mern Post <ahmad.ather@digitalcareerinstitute.org>",
      subject: "Mern Post email Confirmation",
      text: `To confirm your email please go this link : ${process.env.BE_URL}/api/user/confirm-email/${token}`,
      html: `<h2>Welcome ${doc.firstName}!</h2>
          <p> To verify your email please <a href="${process.env.BE_URL}/api/user/confirm-email/${token}">Click Here !</a>`,
    };
/*     const result = await sendGrid.send(emailMessage);
    if (result[0].statusCode === 202) return next();
    else {
      const error = new Error("Something went wrong");
      throw error;
    } */
    const result = await mg.messages.create(MAIL_GUN_DOMAIN, emailMessage)
    console.log(result.status);
    next()
  } catch (error) {
    next(error);
  }
};
export default confirmationEmailSender;
