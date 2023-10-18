
interface IMailContext{
  subject:string,
  data:any
}
interface IMail {
  receiver_email: string;
  context: IMailContext,
  template: string;
  subject: string;
}

export default IMail;
