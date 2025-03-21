import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';


export const sendPasswordResetEmail = async (toEmail: string, resetLink: string) => {
  const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY || 'sua_api_key_aqui',
  });

  const recipients = [new Recipient(toEmail, "User Name")];
  const sender = new Sender("MS_ZSVULG@trial-51ndgwv7rzrlzqx8.mlsender.net", "App Name - Reset Password");

  const emailParams = new EmailParams()
    .setFrom(sender)
    .setTo(recipients)
    .setSubject("Redefinição de senha")
    .setHtml(`<p>Você solicitou a redefinição de senha. Clique no link abaixo para redefinir sua senha:</p>
              <p><a href="${resetLink}">Redefinir senha</a></p>`);

    try {
      const response = await mailerSend.email.send(emailParams);
      console.log("Email sent successfully:", response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
};

