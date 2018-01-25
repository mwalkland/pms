const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

const User = require('../../models/user');
const EmailController = require('../email');

// router.use('/', (req, res, next) => {
//   jwt.verify(req.query.token, 'WO3V%oIBK5c2', (err) => {
//     if (err) {
//       return res.status(401).json({
//         title: 'Not Authenticated',
//         error: err
//       });
//     }
//     next();
//   });
// });

router.get('/getAllStudents', (req, res) => {
  User.find({ type: 'student' })
    .populate({
      path: 'studentInfo.chosenProject',
      populate: { path: 'staff' }
    })
    .exec((err, students) => {
      if (err) {
        return res.status(401).json({
          title: 'Error',
          error: err
        });
      }
      res.status(200).json({
        students: students
      });
    });
});

router.get('/getAllStaff', (req, res) => {
  User.find({ type: 'staff' })
    .populate('staffInfo.suggestedProjects')
    .exec((err, staff) => {
      if (err) {
        return res.status(401).json({
          title: 'Error',
          error: err
        });
      }
      res.status(200).json({
        staff: staff
      });
    });
});

router.post('/sendReminder', (req, res) => {
  User.find({ type: 'student', 'studentInfo.confirmed': false }, 'email', (err, students) => {
    if (err) {
      return res.status(401).json({
        title: 'Error',
        error: err
      });
    }
    const emails = [];
    for (const student of students) {
      emails.push(student.email);
    }
    const emailController = new EmailController();
    emailController.sendReminder(emails);
  });
});

module.exports = router;