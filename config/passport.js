var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcrypt');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    var query = {
      bool: {
        must: [
          {
            term: {
              id: id
            }
          }
        ]
      }
    };
    
    User.findOne(query).exec(function (err, user) {
      done(err, user);
    });
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function (email, password, done) {
    var query = {
      bool: {
        must: [
          {
            term: {
              email: email
            }
          }
        ]
      }
    };

    User.findOne(query).exec(function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      bcrypt.compare(password, user.password, function (err, res) {
        if (!res)
          return done(null, false, {
            message: 'Invalid Password'
          });
        // var returnUser = {
        //   email: user.email,
        //   createdAt: user.createdAt,
        //   id: user.id
        // };
        var returnUser = user;
        return done(null, returnUser, {
          message: 'Logged In Successfully'
        });
      });
    });
  }
));