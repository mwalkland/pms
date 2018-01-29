const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../config');

const User = require('../../models/user');

router.use('/', (req, res, next) => {
  jwt.verify(req.query.token, config.secret, (err) => {
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
  User.findById(decoded.userId, 'staffInfo.areas', (err, areas) => {
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
  User.findByIdAndUpdate(decoded.userId, { $set: { 'staffInfo.areas': areas } }, (err) => {
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

module.exports = router;