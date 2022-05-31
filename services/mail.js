const nodemailer = require('nodemailer')
const template = require('../helpers/template.json')
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
  const { from, name, subject, message, phone } = req.body
  if (!(from && name && message && phone)) {
    throw new Error('Missing mandatory params')
  }
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECIPIENT,
    subject: template.subject.replace('__name__', name).replace('__subject__', subject),
    html: template.body.replace('__name__', name).replace('__email__', from).replace('__message__', message).replace('__phone__', phone),
    replyTo: from
  }
  const response = await smtpTransport.sendMail(mailOptions).catch(err => {
    console.log('Err in sending mail', err)
    throw err
  })
  console.log('Mail sent', response)
  return response
}