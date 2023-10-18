import IMail from "../../interface/email.interface";

const { transporter } = require("./config");


interface IMailContext{
  subject:string,
  data:any
}



const sendEmail = async (
  receiverEmail: string|Array<string>,
  context: IMailContext,
  template: string,
): Promise<void> => {
  try {
    let reports = await transporter.sendMail({
      from: '"Cannabis Connecter" <registration@cannabis-connecter.com>',
      to: receiverEmail,
      subject: context.subject,
      template: template,
      context: context.data,
    });
    console.log(reports)
  } catch (err) {
    console.log(err)
    console.log("EMAIL SEND FAILED");
  }
};

export default sendEmail;
