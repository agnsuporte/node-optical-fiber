const nodemailer = require("nodemailer");
const SMTP_CONFIG = require("../utilities/smtp");

const transporter = nodemailer.createTransport({
  host: SMTP_CONFIG.host,
  port: SMTP_CONFIG.port,
  secure: false,
  auth: {
    user: SMTP_CONFIG.user,
    pass: SMTP_CONFIG.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function run(
  contact_site,
  contact_name,
  contact_email,
  contact_textmessage
) {
  let mailOptions = {
    subject: "Contato - " + contact_site,
    from: `AGNSuporte <${SMTP_CONFIG.user}>`,
    to: ["agnsuporte.email@gmail.com", contact_email],
    replyTo: SMTP_CONFIG.user,
    html: `
         <html lang="pt-BR">
            <body>
              </br></br></br>
              <p> ${contact_textmessage} </p>
              <p> <strong>Enviado por: ${contact_name} </strong> </p>
              <p> <strong>E-mail: </strong> ${contact_email} </p>
            </body>
         </html> 
      `
  };

  const mailSent = await transporter.sendMail(mailOptions);

  return mailSent;
}

module.exports = {
  async sendEmailContact(request, response) {
    let info = "";

    const {
      contact_site,
      contact_name,
      contact_email,
      contact_textmessage,
    } = request.body;

    try {
      info = await run(
        contact_site,
        contact_name,
        contact_email,
        contact_textmessage
      );
    } catch (err) {
      return response.status(401).json({ info, erro: err });
    }

    return response.status(200).json({ info, erro: "" });
  },
};
