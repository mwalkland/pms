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

router.get('/getAreas', (req, res) => {
  Project.find().distinct('areas', (err, areas) => {
    if (err) {
      return res.status(500).json({
        title: 'An error occured retrieving staff members',
        error: err
      });
    }
    res.status(200).json({
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
      .populate('students')
      .exec((err, projects) => {
        res.status(200).json({
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
          projects: projects
        });
      });
  });
});

router.get('/getStaffProjects', (req, res) => {
  const decoded = jwt.decode(req.query.token);
  Project.find({ staff: decoded.user._id }, (err, projects) => {
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
  const student = body.student;
  const decoded = jwt.decode(req.query.token);

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

    User.findByIdAndUpdate(student._id, { $set: { 'studentInfo.confirmed': true } }, (err, student) => {
      if (err) {
        return res.status(500).json({
          title: 'An error occured getting the student',
          error: err
        });
      }
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
          true);
      });
    });


  });
  res.status(200).json({
    message: 'Successfully updated the projects',
  });
});

router.patch('/rejectProject', (req, res) => {
  const body = req.body;
  const project = body.project;
  const student = body.student;
  const decoded = jwt.decode(req.query.token);

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
  Project.findOne({ students: decoded.user._id })
    .populate('staff')
    .exec((err, project) => {
      if (err) {
        return res.status(500).json({
          title: 'Could not get student project',
          error: err
        });
      }
      return res.status(200).json({
        project: project
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

  Project.findByIdAndUpdate(body.id, updateObj, { new: true })
    .populate('staff').exec((err, project) => {
      if (err) {
        return res.status(500).json({
          title: 'An error occured finding the project',
          error: err
        });
      }

      User.findByIdAndUpdate(decoded.user._id, { $set: { 'studentInfo.chosenProject': project } }, (err, user) => {
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
        pendingStudents: student,
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
          { $set: { 'studentInfo.chosenProject': result } }
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
