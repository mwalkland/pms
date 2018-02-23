const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const winston = require('winston');
const config = require('../config');

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

class EmailController {

  constructor() {
    this.fromEmail = 'mw482@exeter.ac.uk';
  }

  createTransport() {
    return nodemailer.createTransport({
      service: 'Outlook365',
      port: 587,
      auth: {
        user: this.fromEmail,
        pass: 'g9Pz7$gkVAwm'
      }
    });
  }

  getOptions() {
    return {
      viewEngine: {
        extname: '.hbs',
        layoutsDir: 'views/email',
        partialsDir: 'views/email/partials',
        defaultLayout: 'template'
      },
      viewPath: 'views/email',
      extName: '.hbs'
    };
  }

  sendStaffEmail(student, staff, email, project) {

    let transporter = this.createTransport();

    const options = this.getOptions();

    transporter.use('compile', hbs(options));

    let mailOptions = {
      from: '"Project Management System" <' + this.fromEmail + '>',
      to: staff + ' ' + email,
      subject: 'You have a new Project request',
      template: 'staff.body',
      context: {
        student: student,
        project: project
      }
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        logger.error('Failed to send email.', {
          to: email,
          error: err
        });
      }
    });

  }

  sendStudentEmail(staff, student, email, project, isAccepted) {

    let transporter = this.createTransport();

    const options = this.getOptions();

    transporter.use('compile', hbs(options));

    let response;
    if (isAccepted) {
      response = 'accepted';
    } else {
      response = 'rejected';
    }

    let mailOptions = {
      from: '"Project Management System" <' + this.fromEmail + '>',
      to: student + ' ' + email,
      subject: 'Your Project request has a response',
      template: 'student.body',
      context: {
        staff: staff,
        project: project,
        response: response
      }
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        logger.error('Failed to send email.', {
          to: email,
          error: err
        });
      }
    });
  }

  sendModuleLeaderEmail(staffName, studentName, projectName, leaderName, email) {

    let transporter = this.createTransport();

    const options = this.getOptions();

    transporter.use('compile', hbs(options));

    let mailOptions = {
      from: '"Project Management System" <' + this.fromEmail + '>',
      to: leaderName + ' ' + email,
      subject: 'A final-year project has been confirmed',
      template: 'leader.body',
      context: {
        staff: staffName,
        student: studentName,
        project: projectName
      }
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        logger.error('Failed to send email.', {
          to: email,
          error: err
        });
      }
    });
  }

  sendReminder(emailList, cb) {

    let transporter = this.createTransport();

    const options = this.getOptions();

    transporter.use('compile', hbs(options));

    let mailOptions = {
      from: '"Project Management System" <' + this.fromEmail + '>',
      to: emailList,
      subject: 'Final-year project reminder',
      template: 'reminder.body',
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        logger.error('Failed to send email.', {
          to: emailList,
          error: err
        });
      } else {
        cb();
      }
    });
  }

}

module.exports = EmailController;