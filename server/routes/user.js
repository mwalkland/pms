const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../config');

const User = require('../../models/user');
const winston = require('winston');

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      filename: config.logFile,
      handleExceptions: true,
      humanReadableUnhandledException: true,
      level: 'debug',
      json: false
    })
  ]
});

router.use('/', (req, res, next) => {
  const tokenString = req.headers.authorization;
  const tokenType = tokenString.substr(0, tokenString.indexOf(' '));
  if (tokenType !== 'Bearer') {
    return res.status(401).json({
      title: 'Not Authenticated',
      error: {
        name: 'Invalid token type',
        message: 'The token must be a Bearer token'
      }
    });
  }
  const token = tokenString.substr(tokenString.indexOf(' ') + 1);
  jwt.verify(token, config.secret, (err) => {
    if (err) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: err
      });
    }
    next();
  });
});

router.get('/getStaff', (req, res) => {
  const tokenString = req.headers.authorization,
    decoded = jwt.decode(tokenString.substr(tokenString.indexOf(' ') + 1));
  User.find({ type: 'staff' }, (err, staff) => {
    if (err) {
      logger.error('UserId = %s', decoded.userId, { error: err });
      return res.status(500).json({
        title: 'An error occured retrieving staff members',
        error: err
      });
    }
    res.status(200).json({
      staff: staff
    });
  });
});

router.get('/getStaffAreas', (req, res) => {
  const tokenString = req.headers.authorization,
    decoded = jwt.decode(tokenString.substr(tokenString.indexOf(' ') + 1));
  User.findById(decoded.userId, 'staffInfo.areas', (err, areas) => {
    if (err) {
      logger.error('UserId = %s', decoded.userId, { error: err });
      return res.status(500).json({
        title: 'An error occured retrieving staff areas',
        error: err
      });
    }
    res.status(200).json({
      areas: areas
    });
  });
});

router.patch('/updateStaffAreas', (req, res) => {
  const areas = req.body;
  const tokenString = req.headers.authorization,
    decoded = jwt.decode(tokenString.substr(tokenString.indexOf(' ') + 1));
  User.findByIdAndUpdate(decoded.userId, { $set: { 'staffInfo.areas': areas } }, (err) => {
    if (err) {
      logger.error('UserId = %s', decoded.userId, { error: err });
      return res.status(500).json({
        title: 'An error occured retrieving staff areas',
        error: err
      });
    }
    res.status(200).json({
      message: 'Updated Staff Areas',
    });
  });
});

module.exports = router;