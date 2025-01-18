import nodemailer from'nodemailer'
const sendEmailByNodemailer=async(to,subject,html,attachments)=>{
  const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_FOR_SEND,
        pass:process.env.PASSWORD_FOR_SEND
    }
  })

  const info=await transporter.sendMail({
   
    from:`"Saraha 👻"<${process.env.EMAIL_FOR_SEND}>`,
    to:to?to:'raneemmagdy2002@gmail.com',
    attachments:attachments?attachments:[],
    subject:subject?subject: "Hello ✔",
    html: html?html:`<p>Hi.....</p>`
  })
  if(info.accepted.length){
    return true
  }
  return false
  
}

export default sendEmailByNodemailer