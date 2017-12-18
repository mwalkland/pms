const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Project = require('../../models/project');
const User = require('../../models/user');

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

router.post('/new', (req, res) => {
  const body = req.body;
  jwt.verify(req.query.token, 'WO3V%oIBK5c2', (err, decoded) => {
    if (err) {
      return res.status(401).json({
        title: 'Not Authentication',
        error: err
      });
    }
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
        staff: user
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
  jwt.verify(req.query.token, 'WO3V%oIBK5c2', (err) => {
    if (err) {
      return res.status(401).json({
        title: 'Not Authentication',
        error: err
      });
    }
    Project.find().populate('staff').exec(
      (err, projects) => {
        if (err) {
          return res.status(401).json({
            title: 'Error retrieving projects',
            error: err
          });
        }
        console.log(projects);
        res.status(200).json({
          message: 'Success',
          projects: projects
        });
      });
  });
});

router.get('/getStaffProjects', (req, res) => {
  const firstname = req.query.first;
  const surname = req.query.surname;
  jwt.verify(req.query.token, 'WO3V%oIBK5c2', (err) => {
    if (err) {
      return res.status(401).json({
        title: 'Not Authentication',
        error: err
      });
    }
    User.find({ firstname: firstname, surname: surname }, (err, staff) => {
      if (err) {
        return res.status(500).json({
          title: 'An error occured retrieving staff member',
          error: err
        });
      }
      Project.find({ staff: staff }, (err, projects) => {
        if (err) {
          return res.status(401).json({
            title: 'No Projects with that Staff member',
            error: err
          });
        }
        res.status(200).json({
          message: 'Success',
          projects: projects
        });
      });
    });

  });
});

router.get('getAreaProjects', (req, res) => {
  const area = req.query.area;
});

module.exports = router;
