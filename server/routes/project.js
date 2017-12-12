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
        maxStudents: body.maxStudents,
        areas: body.areas,
        staff: user._id
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

module.exports = router;