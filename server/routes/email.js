const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const EmailController = require('../email');

router.post('/sendStaffEmail', (req, res) => {
  const email = new EmailController();
  email.sendStudentEmail();
  res.status(200).json({
    message: 'blibble'
  });
});

module.exports = router;