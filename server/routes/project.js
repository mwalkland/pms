const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

const Project = require('../../models/project');
const User = require('../../models/user');
const EmailController = require('../email');

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

// A Staff can update their suggested project details
router.patch('/updateStaffProject', (req, res) => {
  const body = req.body;
  Project.findByIdAndUpdate(body.id, {
    name: body.name,
    description: body.description,
    type: body.type,
    maxStudents: body.maxStudents,
    areas: body.areas
  }, { new: true }, (err, project) => {
    if (err) {
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
  Project.find().distinct('areas', (err, areas) => {
    if (err) {
      return res.status(500).json({
        title: 'An error occured retrieving project areas',
        error: err
      });
    }
    res.status(200).json({
      obj: areas
    });
  });
});

// Get All staff suggested projects for the student table
router.get('/getAllStaffProjects', (req, res) => {
  Project.find({ isStudentProject: false }).populate('staff').exec(
    (err, projects) => {
      if (err) {
        return res.status(401).json({
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
  const decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id, (err, user) => {
    if (err) {
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
  const decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id, (err, user) => {
    if (err) {
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
  const decoded = jwt.decode(req.query.token);
  Project.find({ staff: decoded.user._id, isStudentProject: false }, (err, projects) => {
    if (err) {
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
  const decoded = jwt.decode(req.query.token);
  User.findByIdAndUpdate(studentId, { $set: { 'studentInfo.confirmed': true } }, (err, student) => {
    if (err) {
      return res.status(500).json({
        title: 'An error occured getting the student',
        error: err
      });
    }
    User.findById(decoded.user._id, (err, staff) => {
      if (err) {
        return res.status(500).json({
          title: 'An error occured getting the staff',
          error: err
        });
      }
      User.findOne({ 'staffInfo.leader': true }, (err, leader) => {
        if (err) {
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
  const decoded = jwt.decode(req.query.token);

  User.findById(studentId, (err, student) => {
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
      student.studentInfo.supervisor = undefined;

      student.save();
      project.save();
      User.findById(decoded.user._id, (err, staff) => {
        if (err) {
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
  const decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id)
    .populate('studentInfo.supervisor studentInfo.chosenProject')
    .exec((err, student) => {
      if (err) {
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
  const decoded = jwt.decode(req.query.token);

  Project.findById(body.id)
    .populate('staff').exec((err, project) => {
      if (err) {
        return res.status(500).json({
          title: 'An error occured finding the project',
          error: err
        });
      }
      User.findByIdAndUpdate(decoded.user._id, {
        $set: { 'studentInfo.chosenProject': project, 'studentInfo.supervisor': project.staff },
      }, (err, user) => {
        if (err) {
          return res.status(500).json({
            title: 'An error occured updating the user',
            error: err
          });
        }
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
  const decoded = jwt.decode(req.query.token);

  User.findById(decoded.user._id, (err, student) => {
    if (err) {
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
