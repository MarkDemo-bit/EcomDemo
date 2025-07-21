import nodemailer from 'nodemailer'

export const sendMail = async ({ mailFrom, mailTo, subject, body }) => {

   try {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
    //send mail
   const info= await transporter.sendMail({
        from: mailFrom,
        to: mailTo,
        subject,
        html: body
    })
   return info
   } catch (error) {
    console.log(error)
   }
}


export const generateOTP = () => {

    return {
      otp: Math.floor(100000 + Math.random() * 900000).toString(),
        otpExpires: new Date(Date.now() + 20 * 60 * 1000),
        
          token: crypto.randomBytes(32).toString('hex')       
    }      
}