const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../config');

const mongoose = require('mongoose');

const Project = require('../../models/project');
const User = require('../../models/user');
const EmailController = require('../email');
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

router.post('/new', (req, res) => {
  const body = req.body;
  const tokenString = req.headers.authorization,
    decoded = jwt.decode(tokenString.substr(tokenString.indexOf(' ') + 1));
  User.findById(decoded.userId, (err, user) => {
    if (err) {
      logger.error('UserId = %s', decoded.userId, { error: err });
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
        logger.error('UserId = %s', decoded.userId, { error: err });
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

// A Staff can update their suggested project details
router.patch('/updateStaffProject', (req, res) => {
  const body = req.body;
  const tokenString = req.headers.authorization,
    decoded = jwt.decode(tokenString.substr(tokenString.indexOf(' ') + 1));
  Project.findByIdAndUpdate(body.id, {
    name: body.name,
    description: body.description,
    type: body.type,
    maxStudents: body.maxStudents,
    areas: body.areas
  }, { new: true }, (err, project) => {
    if (err) {
      logger.error('UserId = %s', decoded.userId, { error: err });
      return res.status(500).json({
        title: 'An error occured updating Project',
        error: err
      });
    }
    res.status(200).json({
      message: 'Project updated',
      project: project
    });
  });
});

// Get all project areas to filter by in the student table
router.get('/getAreas', (req, res) => {
  const tokenString = req.headers.authorization,
    decoded = jwt.decode(tokenString.substr(tokenString.indexOf(' ') + 1));
  Project.find().distinct('areas', (err, areas) => {
    if (err) {
      logger.error('UserId = %s', decoded.userId, { error: err });
      return res.status(500).json({
        title: 'An error occured retrieving project areas',
        error: err
      });
    }
    res.status(200).json({
      areas: areas
    });
  });
});

// Get All staff suggested projects for the student table
router.get('/getAllStaffProjects', (req, res) => {
  const tokenString = req.headers.authorization,
    decoded = jwt.decode(tokenString.substr(tokenString.indexOf(' ') + 1));
  Project.find({ isStudentProject: false, full: false }).populate('staff').exec(
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

router.get('/getProjectRequests', (req, res) => {
  const tokenString = req.headers.authorization,
    decoded = jwt.decode(tokenString.substr(tokenString.indexOf(' ') + 1));
  User.findById(decoded.userId, (err, user) => {
    if (err) {
      logger.error('UserId = %s', decoded.userId, { error: err });
      return res.status(500).json({
        title: 'An error occured getting the user',
        error: err
      });
    }

    User.find({ 'studentInfo.supervisor': user })
      .populate('studentInfo.chosenProject')
      .exec((err, students) => {
        const studentList = [];
        for (const student of students) {
          if (student.studentInfo.confirmed === false) {
            studentList.push(student);
          }
        }
        res.status(200).json({
          students: studentList
        });
      });
  });
});

router.get('/getConfirmedProjects', (req, res) => {
  const tokenString = req.headers.authorization,
    decoded = jwt.decode(tokenString.substr(tokenString.indexOf(' ') + 1));
  User.findById(decoded.userId, (err, user) => {
    if (err) {
      logger.error('UserId = %s', decoded.userId, { error: err });
      return res.status(500).json({
        title: 'An error occured getting the user',
        error: err
      });
    }

    User.find({ 'studentInfo.supervisor': user })
      .populate('studentInfo.chosenProject')
      .exec((err, students) => {
        const studentList = [];
        for (const student of students) {
          if (student.studentInfo.confirmed === true) {
            studentList.push(student);
          }
        }
        res.status(200).json({
          students: studentList
        });
      });
  });
});

router.get('/getStaffProjects', (req, res) => {
  const tokenString = req.headers.authorization,
    decoded = jwt.decode(tokenString.substr(tokenString.indexOf(' ') + 1));
  Project.find({ staff: decoded.userId, isStudentProject: false }, (err, projects) => {
    if (err) {
      logger.error('UserId = %s', decoded.userId, { error: err });
      return res.status(500).json({
        title: 'An error occured getting the projects',
        error: err
      });
    }
    res.status(200).json({
      projects: projects
    });
  });
});

router.patch('/confirmProject', (req, res) => {
  const body = req.body;
  const project = body.project;
  const studentId = body.studentId;
  const tokenString = req.headers.authorization,
    decoded = jwt.decode(tokenString.substr(tokenString.indexOf(' ') + 1));
  User.findByIdAndUpdate(studentId, { $set: { 'studentInfo.confirmed': true } }, (err, student) => {
    if (err) {
      logger.error('UserId = %s', decoded.userId, { error: err });
      return res.status(500).json({
        title: 'An error occured getting the student',
        error: err
      });
    }
    User.findById(decoded.userId, (err, staff) => {
      if (err) {
        logger.error('UserId = %s', decoded.userId, { error: err });
        return res.status(500).json({
          title: 'An error occured getting the staff',
          error: err
        });
      }
      User.findOne({ 'staffInfo.leader': true }, (err, leader) => {
        if (err) {
          logger.error('UserId = %s', decoded.userId, { error: err });
          return res.status(500).json({
            title: 'An error occured getting the module leader',
            error: err
          });
        }
        const email = new EmailController();
        email.sendStudentEmail(
          staff.firstname + ' ' + staff.surname,
          student.firstname + ' ' + student.surname,
          student.email,
          project.name,
          true);
        email.sendModuleLeaderEmail(
          staff.firstname + ' ' + staff.surname,
          student.firstname + ' ' + student.surname,
          project.name,
          leader.firstname + ' ' + leader.surname,
          leader.email
        );
        res.status(200).json({
          message: 'Successfully updated the project',
        });
      });
    });
  });
});

router.patch('/rejectProject', (req, res) => {
  const body = req.body;
  const project = body.project;
  const studentId = body.studentId;
  const tokenString = req.headers.authorization,
    decoded = jwt.decode(tokenString.substr(tokenString.indexOf(' ') + 1));

  User.findById(studentId, (err, student) => {
    if (err) {
      logger.error('UserId = %s', decoded.userId, { error: err });
      return res.status(500).json({
        title: 'Could not find student',
        error: err
      });
    }
    Project.findById(project.id, (err, project) => {
      if (err) {
        logger.error('UserId = %s', decoded.userId, { error: err });
        return res.status(500).json({
          title: 'Could not find project',
          error: err
        });
      }
      student.studentInfo.chosenProject = undefined;
      student.studentInfo.supervisor = undefined;
      project.full = false;

      student.save();
      project.save();
      User.findById(decoded.userId, (err, staff) => {
        if (err) {
          logger.error('UserId = %s', decoded.userId, { error: err });
          return res.status(500).json({
            title: 'An error occured getting the user',
            error: err
          });
        }
        const email = new EmailController();
        email.sendStudentEmail(
          staff.firstname + ' ' + staff.surname,
          student.firstname + ' ' + student.surname,
          student.email,
          project.name,
          false);
      });
    });
  });

  res.status(200).json({
    message: 'Successfully rejected the project'
  });
});

router.get('/getStudentProject', (req, res) => {
  const tokenString = req.headers.authorization,
    decoded = jwt.decode(tokenString.substr(tokenString.indexOf(' ') + 1));
  User.findById(decoded.userId)
    .populate('studentInfo.supervisor studentInfo.chosenProject')
    .exec((err, student) => {
      if (err) {
        logger.error('UserId = %s', decoded.userId, { error: err });
        return res.status(500).json({
          title: 'Could not get student',
          error: err
        });
      }
      return res.status(200).json({
        project: student.studentInfo.chosenProject,
        supervisor: student.studentInfo.supervisor
      });
    });
});

// for a staff suggested project
router.patch('/addStudentProject', (req, res) => {
  const body = req.body;
  const tokenString = req.headers.authorization,
    decoded = jwt.decode(tokenString.substr(tokenString.indexOf(' ') + 1));

  Project.findById(body.id)
    .populate('staff').exec((err, project) => {
      if (err) {
        logger.error('UserId = %s', decoded.userId, { error: err });
        return res.status(500).json({
          title: 'An error occured finding the project',
          error: err
        });
      }
      User.findByIdAndUpdate(decoded.userId, {
        $set: { 'studentInfo.chosenProject': project, 'studentInfo.supervisor': project.staff },
      }, (err, user) => {
        if (err) {
          logger.error('UserId = %s', decoded.userId, { error: err });
          return res.status(500).json({
            title: 'An error occured updating the user',
            error: err
          });
        }
        User.find({ 'studentInfo.chosenProject': project }, (err, students) => {
          if (students.length === project.maxStudents) {
            project.full = true;
            project.save();
          }
        });
        const email = new EmailController();
        email.sendStaffEmail(
          user.firstname + ' ' + user.surname,
          project.staff.firstname + ' ' + project.staff.surname,
          project.staff.email,
          project.name
        );
      });

      res.status(200).json({
        message: 'Student has been updated',
      });
    });
});

// for a student created project
router.post('/createStudentProject', (req, res) => {
  const body = req.body;
  const tokenString = req.headers.authorization,
    decoded = jwt.decode(tokenString.substr(tokenString.indexOf(' ') + 1));
  User.findById(decoded.userId, (err, student) => {
    if (err) {
      logger.error('UserId = %s', decoded.userId, { error: err });
      return res.status(500).json({
        title: 'An error occured getting the user',
        error: err
      });
    }
    User.findById(body.staff.id, (err, staff) => {
      const project = new Project({
        name: body.name,
        description: body.description,
        type: body.type,
        staff: staff._id,
        full: true,
        areas: body.areas,
        isStudentProject: true
      });
      project.save((err, result) => {
        if (err) {
          logger.error('UserId = %s', decoded.userId, { error: err });
          return res.status(500).json({
            title: 'An error occured creating Project',
            error: err
          });
        }
        User.update(
          { _id: student._id },
          { $set: { 'studentInfo.chosenProject': result, 'studentInfo.supervisor': staff } }
        ).exec();

        const email = new EmailController();
        email.sendStaffEmail(
          student.firstname + ' ' + student.surname,
          staff.firstname + ' ' + staff.surname,
          staff.email,
          project.name
        );

        res.status(201).json({
          message: 'Project created',
          obj: result
        });
      });
    });
  });
});

/*
NOTE - This is accessing the 'areas' collection which is NOT a Mongoose Schema
so is being accessed natively through MongoDB. This is because this is a 
'read-only' collection (we would never want to write to it)
so creating a Schema for it would be pointless.
*/
router.get('/getSuggestedAreas', (req, res) => {
  const Areas = mongoose.connection.db.collection('areas');
  Areas.findOne({}, (err, response) => {
    if (err) {
      logger.error('Error getting suggested areas', { error: err });
      return res.status(500).json({
        title: 'Could not get suggested areas',
        error: err
      });
    }
    res.status(200).json({
      areas: response.areas
    });
  });
});


module.exports = router;
