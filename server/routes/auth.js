const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

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
      return res.status(500).json({
        title: 'An error occured logging in',
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
          const token = jwt.sign({ user: user }, 'WO3V%oIBK5c2', { expiresIn: 7200 });
          return res.status(200).json({
            message: 'User logged in',
            token: token,
            userId: user._id,
            type: user.type,
            name: user.firstname,
            projectChosen: projectChosen
          });
        } else {
          return res.status(401).json({
            title: 'Login failed',
            error: { message: 'Login failed. Invalid email or password.' }
          });
        }
      });
  });
});

/**
 * Is called by the route guards on the front-end to check if the jwt token is valid
 */
router.post('/verify', (req, res) => {
  const token = req.body.token;
  return jwt.verify(token, 'WO3V%oIBK5c2', (err, decoded) => {
    if (decoded) {
      return res.status(200).json({
        valid: true
      });
    }
    return res.status(200).json({
      valid: false
    });
  });
});

module.exports = router;