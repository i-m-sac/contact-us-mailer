var express = require('express');
const mailService = require('../services/mail')
var router = express.Router();

/* GET Status. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    status: 200,
    message: 'OK'
  })
});

router.post('/mail', (req, res) => {
  mailService.sendMail(req).then(() => {
    res.status(200).json({
      status: 200,
      message: 'success'
    })
  }).catch(err => {
    return res.status(400).json({
      error: err?.message,
      message: 'failed'
    })
  })
});


module.exports = router;
