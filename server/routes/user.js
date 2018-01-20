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
      staff: staff
    });
  });
});

router.get('/getStaffAreas', (req, res) => {
  const decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id, 'staffInfo.areas', (err, areas) => {
    if (err) {
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
  const decoded = jwt.decode(req.query.token);
  User.findByIdAndUpdate(decoded.user._id, { $set: { 'staffInfo.areas': areas } }, (err) => {
    if (err) {
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

// for a staff suggested project
router.patch('/addStudentProject', (req, res) => {
  const body = req.body;
  const decoded = jwt.decode(req.query.token);
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

// for a student created project
router.post('/createStudentProject', (req, res) => {
  const body = req.body;
  const decoded = jwt.decode(req.query.token);

  User.findById(decoded.user._id, (err, user) => {
    if (err) {
      return res.status(500).json({
        title: 'An error occured getting the user',
        error: err
      });
    }
    const project = new Project({
      name: body.name,
      description: body.description,
      type: body.type,
      staff: body.staff.id,
      full: true,
      pendingStudents: user,
      areas: body.areas,
      isStudentProject: true
    });

    project.save((err, result) => {
      if (err) {
        return res.status(500).json({
          title: 'An error occured creating Project',
          error: err
        });
      }

      User.update(
        { _id: user._id },
        { $set: { 'studentInfo.chosenProject': result } }
      ).exec();

      res.status(201).json({
        message: 'Project created',
        obj: result
      });
    });
  });
});

module.exports = router;