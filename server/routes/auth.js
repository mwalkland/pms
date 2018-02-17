const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const winston = require('winston');

const User = require('../../models/user');

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

/**
 * Server endpoint for signing up a user
 */
router.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    var user = new User({
      firstname: req.body.firstname,
      surname: req.body.surname,
      email: req.body.email,
      type: req.body.type,
      password: hash
    });
    user.save((err, result) => {
      if (err) {
        logger.error('Error saving new user.', { error: err });
        return res.status(500).json({
          title: 'An error occured creating User',
          error: err
        });
      }
      res.status(201).json({
        message: 'User created',
        obj: result
      });
    });
  });
});

/**
 * Server endpoint for logging in
 * It creates a jwt for the logged in user
 */
router.post('/login', (req, res) => {
  // find the user in the database by the email address
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      logger.error('Login error', { email: req.body.email, error: err });
      return res.status(500).json({
        title: 'Login failed. Invalid email or password.',
        error: err
      });
    }
    if (!user) {
      return res.status(401).json({
        title: 'Login failed',
        error: { message: 'Login failed. Invalid email or password.' }
      });
    }
    const projectChosen = user.studentInfo.chosenProject != null ? true : false;

    // verify whether the entered password is correct
    bcrypt.compare(req.body.password, user.password)
      .then((response) => {
        if (response) {
          const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: 7200 });
          const response = {
            message: 'User logged in',
            token: token,
            userId: user._id,
            type: user.type,
            name: user.firstname,
            email: user.email,
            projectChosen: projectChosen
          };
          if (user.staffInfo.leader) {
            response.leader = true;
          }
          return res.status(200).json(response);
        } else {
          return res.status(401).json({
            title: 'Login failed',
            error: { message: 'Login failed. Invalid email or password.' }
          });
        }
      });
  });
});

module.exports = router;