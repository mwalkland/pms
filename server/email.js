const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

class EmailController {

  constructor() {

  }

  createTransport(account) {
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: account.user,
        pass: account.pass
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
    console.log('hit');
    nodemailer.createTestAccount((err, account) => {

      let transporter = this.createTransport(account);

      const options = this.getOptions();

      transporter.use('compile', hbs(options));

      let mailOptions = {
        from: '"Test" <test@test.com>',
        to: staff + ' ' + email,
        subject: 'You have a new Project request',
        template: 'staff.body',
        context: {
          student: student,
          project: project
        }
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return console.log(err);
        }
        console.log('url ' + nodemailer.getTestMessageUrl(info));
      });

    });
  }

  sendStudentEmail(staff, student, email, project, isAccepted) {
    console.log('student');
    nodemailer.createTestAccount((err, account) => {

      let transporter = this.createTransport(account);

      const options = this.getOptions();

      transporter.use('compile', hbs(options));

      let response;
      if (isAccepted) {
        response = 'accepted';
      } else {
        response = 'rejected';
      }

      let mailOptions = {
        from: '"Test" <test@test.com>',
        to: student + ' ' + email,
        subject: 'Your Project request has a response',
        template: 'student.body',
        context: {
          staff: staff,
          project: project,
          response: response
        }
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return console.log(err);
        }
        console.log('url ' + nodemailer.getTestMessageUrl(info));
      });

    });
  }

  sendReminder(emailList) {
    nodemailer.createTestAccount((err, account) => {

      let transporter = this.createTransport(account);

      const options = this.getOptions();

      transporter.use('compile', hbs(options));

      let mailOptions = {
        from: '"Test" <test@test.com>',
        to: emailList,
        subject: 'Final-year project reminder',
        template: 'reminder.body',
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return console.log(err);
        }
        console.log('url ' + nodemailer.getTestMessageUrl(info));
      });

    });
  }

}

module.exports = EmailController;