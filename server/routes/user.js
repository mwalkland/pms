const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const Project = require('../../models/project');

router.use('/', (req, res, next) => {
  jwt.verify(req.query.token, 'WO3V%oIBK5c2', (err) => {
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
  User.find({ type: 'staff' }, (err, staff) => {
    if (err) {
      return res.status(500).json({
        title: 'An error occured retrieving staff members',
        error: err
      });
    }
    res.status(200).json({
      message: 'Success',
      staff: staff
    });
  });
});

router.patch('/addStudentProject', (req, res) => {
  const body = req.body;
  jwt.verify(req.query.token, 'WO3V%oIBK5c2', (err, decoded) => {
    if (err) {
      return res.status(401).json({
        title: 'Not Authentication',
        error: err
      });
    }

    const updateObj = {
      $set: { status: 'pending' },
      $push: { pendingStudents: decoded.user._id }
    };

    Project.findByIdAndUpdate(body.id, updateObj, { new: true }, (err, project) => {
      if (err) {
        return res.status(500).json({
          title: 'An error occured finding the project',
          error: err
        });
      }

      User.findByIdAndUpdate(decoded.user._id, { $set: { 'studentInfo.chosenProject': project } }, (err) => {
        if (err) {
          return res.status(500).json({
            title: 'An error occured updating the user',
            error: err
          });
        }
      });

      res.status(200).json({
        message: 'Student has been updated',
      });
    });
  });
});

module.exports = router;