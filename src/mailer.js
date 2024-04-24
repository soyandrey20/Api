import nodemailer from 'nodemailer';


 export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'burgaandrey@gmail.com',
      pass: "ynprotwqaolkqatj",
    },
  });
 
  
  export function enviarCorreo(destinatario, asunto, contenido) {
      const mailOptions = {
          from: 'burgaandrey@gmail.com',
          to: destinatario,
          subject: asunto,
          text: contenido
      };
      transporter.sendMail(mailOptions, function(error, info){
          if (error) {
              console.log(error);
          } else {
              console.log('Correo enviado: ' + info.response);
          }
      });

  }
  
   