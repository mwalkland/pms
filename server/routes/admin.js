const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../config');
const winston = require('winston');

const mongoose = require('mongoose');

const User = require('../../models/user');
const Project = require('../../models/project');
const EmailController = require('../email');

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

router.get('/getAllStudents', (req, res) => {
  const tokenString = req.headers.authorization,
    decoded = jwt.decode(tokenString.substr(tokenString.indexOf(' ') + 1));
  logger.debug('fdfggfdgd');
  User.find({ type: 'student' })
    .populate('studentInfo.chosenProject studentInfo.supervisor')
    .exec((err, students) => {
      if (err) {
        logger.error('UserId = %s', decoded.userId, { error: err });
        return res.status(500).json({
          error: err
        });
      }
      res.status(200).json({
        students: students
      });
    });
});

router.get('/getAllStaff', (req, res) => {
  const tokenString = req.headers.authorization,
    decoded = jwt.decode(tokenString.substr(tokenString.indexOf(' ') + 1));
  User.find({ type: 'student' })
    .populate({ path: 'studentInfo.chosenProject', populate: { path: 'students' } })
    .populate('studentInfo.supervisor')
    .exec((err, students) => {
      if (err) {
        logger.error('UserId = %s', decoded.userId, { error: err });
        return res.status(500).json({
          title: 'Error',
          error: err
        });
      }
      User.find({ type: 'staff' })
        .exec((err, staff) => {
          if (err) {
            logger.error('UserId = %s', decoded.userId, { error: err });
            return res.status(500).json({
              error: err
            });
          }
          res.status(200).json({
            staff: staff,
            students: students
          });
        });
    });
});

router.post('/sendReminder', (req, res) => {
  const tokenString = req.headers.authorization,
    decoded = jwt.decode(tokenString.substr(tokenString.indexOf(' ') + 1));
  User.find({ type: 'student', 'studentInfo.confirmed': false }, 'email', (err, students) => {
    if (err) {
      logger.error('UserId = %s', decoded.userId, { error: err });
      return res.status(500).json({
        error: err
      });
    }
    const emails = [];
    for (const student of students) {
      emails.push(student.email);
    }
    const emailController = new EmailController();
    emailController.sendReminder(emails, () => {
      res.status(200).json({
        message: 'Successfully sent reminder'
      });
    });
  });
});

router.get('/getAllProjects', (req, res) => {
  const tokenString = req.headers.authorization,
    decoded = jwt.decode(tokenString.substr(tokenString.indexOf(' ') + 1));
  Project.find().populate('staff students').exec(
    (err, projects) => {
      if (err) {
        logger.error('UserId = %s', decoded.userId, { error: err });
        return res.status(500).json({
          title: 'Error retrieving projects',
          error: err
        });
      }
      res.status(200).json({
        projects: projects
      });
    });
});

router.patch('/modifyProjectSupervisor', (req, res) => {
  const staffId = req.body.staffId;
  const studentId = req.body.studentId;
  const tokenString = req.headers.authorization,
    decoded = jwt.decode(tokenString.substr(tokenString.indexOf(' ') + 1));
  User.findByIdAndUpdate(studentId, { $set: { 'studentInfo.supervisor': staffId } }, (err) => {
    if (err) {
      logger.error('UserId = %s', decoded.userId, { error: err });
      return res.status(500).json({
        title: 'Error updating supervisor',
        error: err
      });
    }
    res.status(200).json({
      message: 'Successfully updated supervisor'
    });
  });
});

router.put('/updateAreasList', (req, res) => {
  const newAreas = req.body.areas;
  const Areas = mongoose.connection.db.collection('areas');
  const tokenString = req.headers.authorization,
    decoded = jwt.decode(tokenString.substr(tokenString.indexOf(' ') + 1));
  Areas.updateOne(
    { areas: { $exists: true, $ne: [] } },
    { $set: { areas: newAreas } },
    (err) => {
      if (err) {
        logger.error('UserId = %s', decoded.userId, { error: err });
        return res.status(500).json({
          message: 'Error occured updating the areas',
          error: err
        });
      }
    }
  );
  res.status(200).json({
    message: 'Successfully updated the areas'
  });
});

module.exports = router;