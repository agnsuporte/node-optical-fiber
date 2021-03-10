const nodemailer = require("nodemailer");
const SMTP_CONFIG = require("../utilities/smtp");
const connect = require("../database/connect");

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
    to: [contact_email],
    bcc: ["agnsuporte@gmail.com"],
    replyTo: SMTP_CONFIG.user,
    html: `
         <html lang="pt-BR">
            <body>
              </br></br></br>
              <p>Dados da sua mensagem:</p>
              </br></br></br>
              <p>Texto da mensagem:</p>
              <p> ${contact_textmessage} </p>
              <p> <strong>Enviado por: ${contact_name} </strong> </p>
              <p> <strong>E-mail: </strong> ${contact_email} </p>
            </body>
         </html> 
      `,
  };

  const mailSent = await transporter.sendMail(mailOptions);

  return mailSent;
}

module.exports = {
  async index(request, response) {
    const users = await connect("contacts").select("*").orderBy("id");
    return response.json(users);
  },

  async create(request, response) {
    let msg = "";

    const { name, email, message } = request.body;

    const data = {
      name,
      email,
      message,
    };

    try {
      await connect("contacts").insert(data);
    } catch (err) {
      return response.status(401).json({ erro: err });
    }

    try {
      await run("agnsuporte.com", name, email, message);
    } catch (err) {
      return response.status(401).json({ erro: err });
    }

    return response.status(200).json({ email, erro: msg });
  },

  async delete(request, response) {
    const { id } = request.params;

    try {
      await connect("contacts").where("id", id).delete();
    } catch (err) {
      console.table("DELETE:", err);
      return response.status(401).json({ erro: "Ocorreu um erro inesperado" });
    }

    return response.status(204).json({ message: "Usuário excluído", erro: "" });
  },

  async update(request, response) {
    const { id } = request.params;

    const { name, email, message } = request.body;

    const data = {
      name,
      email,
      message,
    };

    try {
      await connect("contacts").where("id", id).update(data);
    } catch (err) {
      return response.status(401).json({ erro: err });
    }

    return response
      .status(200)
      .json({ message: "atualizado com sucesso", erro: "" });
  },
};
