import { configService } from "../../configs/env.config";
import { Logger } from "../../configs/logger.config";
import { OtpRepository } from "../../../domain/repositories/OtpRepository";
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer' ;
import fs from 'fs';
import path from 'path';
import { OtpAttributes } from "../../../domain/entities/otp.model";

const CONFIRM_EMAIL_URI = configService.get("EMAIL").LINK_CONFIRM_EMAIL;
const EMAIL_HOST = configService.get("EMAIL").HOST;
const EMAIL_PORT = configService.get("EMAIL").PORT;
const EMAIL_USER = configService.get("EMAIL").USER;
const EMAIL_PASSWORD = configService.get("EMAIL").PASSWORD;

let transporter = nodemailer.createTransport({
  host: EMAIL_HOST, 
  port: EMAIL_PORT,
  secure: true, 
  auth: {
      user: EMAIL_USER, 
      pass: EMAIL_PASSWORD 
  }
});

const loadTemplate = (templatePath, replacements) => {
  let template = fs.readFileSync(templatePath, 'utf8');
  for (const key in replacements) {
    template = template.replace(new RegExp(`{{${key}}}`, 'g'), replacements[key]);
  }
  return template;
};

transporter.verify((error, success) => {
  if (error) {
    console.error('Erro ao conectar:', error);
    console.log(error);
  } else {
    console.log('Pronto para enviar e-mails!');
  }
});

export class EmailService {
  constructor(private otpRepository: OtpRepository) {}

  private readonly logger = new Logger(EmailService.name);
  
  public async sendOtp(email: string) {
    this.logger.verbose('start method sendOtp');

    const otp = uuidv4();
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 10);

    const otpData: OtpAttributes = {
      token: otp,
      consumed: false,
      expirationDate: expirationDate,
      createdAt: new Date(),
      metadataKey: 'EMAIL',
      metadataValue: email
    };

    await this.otpRepository.save(otpData);
    const templatePath = path.join(__dirname, 'emailTemplate.html');
    const replacements = {
      link: CONFIRM_EMAIL_URI + "/" + otp
    };
    const emailContent = loadTemplate(templatePath, replacements);

    let mailOptions = {
      from: '"Nome" noreply@inechat.com',
      to: email,
      subject: 'Confirmação de email',
      text: 'Corpo do email em texto simples',
      html: emailContent
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Erro ao enviar e-mail:', error);
      } else {
        console.log('E-mail enviado com sucesso:', info.response);
      }
    });
    
    return null;


  }
}
