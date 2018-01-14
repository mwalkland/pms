const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Project = require('../../models/project');
const User = require('../../models/user');

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

router.post('/new', (req, res) => {
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
      maxStudents: body.maxStudents,
      areas: body.areas,
      staff: user,
      students: [],
      status: 'available'
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
        { $push: { 'staffInfo.suggestedProjects': result } }
      ).exec();

      res.status(201).json({
        message: 'Project created',
        obj: result
      });
    });
  });
});

router.get('/getAreas', (req, res) => {
  Project.find().distinct('areas', (err, areas) => {
    if (err) {
      return res.status(500).json({
        title: 'An error occured retrieving staff members',
        error: err
      });
    }
    res.status(200).json({
      message: 'Success',
      obj: areas
    });
  });
});

router.get('/getAllProjects', (req, res) => {
  Project.find().populate('staff').exec(
    (err, projects) => {
      if (err) {
        return res.status(401).json({
          title: 'Error retrieving projects',
          error: err
        });
      }
      res.status(200).json({
        message: 'Success',
        projects: projects
      });
    });
});

router.get('/getProjectRequests', (req, res) => {
  const decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id, (err, user) => {
    if (err) {
      return res.status(500).json({
        title: 'An error occured getting the user',
        error: err
      });
    }
    Project.find({ staff: user, pendingStudents: { $exists: true, $ne: [] } })
      .populate({ path: 'pendingStudents', select: 'firstname surname email' })
      .exec((err, projects) => {
        res.status(200).json({
          message: 'Success',
          projects: projects
        });
      });
  });
});

router.get('/getConfirmedProjects', (req, res) => {
  const decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id, (err, user) => {
    if (err) {
      return res.status(500).json({
        title: 'An error occured getting the user',
        error: err
      });
    }
    Project.find({ staff: user, students: { $exists: true, $ne: [] } })
      .populate({ path: 'students', select: 'firstname surname email' })
      .exec((err, projects) => {
        res.status(200).json({
          message: 'Success',
          projects: projects
        });
      });
  });
});

router.patch('/confirmProject', (req, res) => {
  const body = req.body;
  const project = body.project;
  const student = body.student;

  // note the different in id and _id
  Project.findByIdAndUpdate(project.id, {
    $pull: { pendingStudents: student._id },
    $push: { students: student._id }
  }, { new: true }, (err, project) => {
    if (err) {
      return res.status(500).json({
        title: 'An error occured updating the project information',
        error: err
      });
    }
    if (project.maxStudents === project.students.length) {
      project.full = true;
      project.save();
    }
  });
  res.status(200).json({
    message: 'Successfully updated the projects',
  });
});

router.patch('/rejectProject', (req, res) => {
  const body = req.body;
  const project = body.project;
  const student = body.student;

  User.findById(student._id, (err, student) => {
    if (err) {
      return res.status(500).json({
        title: 'Could not find student',
        error: err
      });
    }
    Project.findById(project.id, (err, project) => {
      if (err) {
        return res.status(500).json({
          title: 'Could not find project',
          error: err
        });
      }
      student.studentInfo.chosenProject = undefined;
      project.pendingStudents.pull(student._id);

      student.save();
      project.save();
    });
  });

  res.status(200).json({
    message: 'Successfully rejected the project'
  });
});

module.exports = router;
