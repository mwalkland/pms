const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

router.use('/', (req, res, next) => {
  console.log(req.query.token);
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

module.exports = router;