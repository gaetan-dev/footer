/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 *
 * Authentification :: http://iliketomatoes.com/implement-passport-js-authentication-with-sails-js-0-10-2/
 */

var bcrypt = require('bcrypt');

var cryptPassword = function (user, cb) {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        user.password = hash;
        cb();
      }
    });
  });
}

module.exports = {
  attributes: {
    firstName: {
      type: 'string',
      required: true,
    },
    lastName: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
    },
    password: {
      type: 'string',
      required: true,
      minLength: 6
    },
    role: {
      type: 'string',
      required: true,
      enum: ['Admin', 'User']
    },
    availabilities: {
      type: 'array',
      defaultsTo:  []
    },
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  mapping: {
    email: {
      type: 'string',
      index: 'not_analyzed'
    },
    password: {
      type: 'string',
      index: 'not_analyzed'
    }
  },

  beforeCreate: function (user, cb) {
    cryptPassword(user, cb);
  },

  beforeUpdate: function (user, cb) {
    cryptPassword(user, cb);
  },
};
