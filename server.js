/* global __dirname process */

// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

// Get our API routes
const authRoutes = require('./server/routes/auth');
const userRoutes = require('./server/routes/user');
const projectRoutes = require('./server/routes/project');
const adminRoutes = require('./server/routes/admin');

const app = express();

mongoose.connect(config.database, { useMongoClient: true });

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// Set our api routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/project', projectRoutes);
app.use('/admin', adminRoutes);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});



/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));