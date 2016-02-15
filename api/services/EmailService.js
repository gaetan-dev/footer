/**
 * EmailService.js
 */
var nodemailer = require('nodemailer');

var smptConfig = {
  host: 'PRLILAS.axa-fr.intraxa',
  port: 25
};

var sendMail = function (mailOptions) {
  var transporter = nodemailer.createTransport(smptConfig);

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      sails.log.debug(err);
    } else {
      sails.log.debug(info.response);
    }
  });
};

var mailOptions = function (from, to, subject, body) {
  var _to = '';
  to.forEach(function (user) {
    _to += user.email + ', ';
  });
  to = _to;

  return {
    from: from, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: body
  };
};

var sendConvocation = function (event) {
  if (event.users === undefined)
    return;
    
  var convocationOptions = EmailService.convocationOptions(event);
  EmailService.sendMail(convocationOptions);
};

var convocationOptions = function (event) {
  // Liste des participants
  var usersList = '<ol>';
  event.users.forEach(function (user) {
    usersList += '<li>' + user.firstName + ' ' + user.lastName + '</li>';
  });
  usersList += '</ol>';

  var from = 'service.footer@axa.fr';
  var to = event.users;
  var subject = 'Convocation pour le match du ' + event.date + ' à ' + event.hours + ' au ' + event.place + '.';
  var body = '<h1>Footer</h1><h2>' + subject + '</h2></br><h3>Le match est organisé par:</h3>' +
    event.master.firstName + ' ' + event.master.lastName + ' (' + event.master.email + ')' + '<h3>Les selectionnés sont:</h3>' + usersList;

  var options = mailOptions(from, to, subject, body);
  return options;
};

var sendInvitation = function (event, users) {
  var invitationOptions = EmailService.invitationOptions(event, users);
  EmailService.sendMail(invitationOptions);
};

var invitationOptions = function (event, users) {
  // Liste des participants
  var usersList = '<ol>';
  event.users.forEach(function (user) {
    usersList += '<li>' + user.firstName + ' ' + user.lastName + '</li>';
  });
  usersList += '</ol>';

  UserService.excludeUsersOfArray(users, event.users);
  var from = 'service.footer@axa.fr';
  var to = users;
  var subject = 'Invitation pour le match du ' + event.date + ' à ' + event.hours + ' au ' + event.place + '.';
  var body = '<h1>Footer</h1><h2>' + subject + '</h2></br><h3>Le match est organisé par:</h3>' +
    event.master.firstName + ' ' + event.master.lastName + ' (' + event.master.email + ')' + '<h3>Les selectionnés sont:</h3>' + usersList;

  var options = mailOptions(from, to, subject, body);
  return options;
};

module.exports = {
  /* Methodes */
  sendMail: sendMail,
  sendConvocation: sendConvocation,
  sendInvitation: sendInvitation,
  mailOptions: mailOptions,
  convocationOptions: convocationOptions,
  invitationOptions: invitationOptions
};
