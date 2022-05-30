const nodemailer = require('nodemailer')
const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})
module.exports.sendMail = async (req) => {
  console.log('Send Mail req received', req.body)
  if (!req.body) {
    console.log('Empty req', req.body)
    throw new Error('Empty request body')
  }
  const { from, name, subject, message } = req.body
  if (!(from || name || subject || message)) {
    throw new Error('Missing mandatory params')
  }
  const mailOptions = {
    from,
    to: process.env.EMAIL_RECIPIENT,
    subject: `${name} : ${subject}`,
    text: message
  }
  const response = await smtpTransport.sendMail(mailOptions).catch(err => {
    console.log('Err in sending mail', err)
    throw err
  })
  return response
}