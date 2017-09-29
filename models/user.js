var bcrypt = require('bcrypt');

'use strict';

module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Email Address Not Valid.'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Name must be between 1 and 99 characters.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 99],
          msg: 'Password must be between 8 and 99 characters.'
        }
      }
    }
  }, {
    hooks: { //before adding someone to a database....
    beforeCreate: function(createdUser, options, cb) {
      // hash the password
      var hash = bcrypt.hashSync(createdUser.password, 10); //hash the password 10 times
      // store the hash as the user's password
      createdUser.password = hash; //the new hash is now the password, which was just created
      // continue to save the user, with no errors
      cb(null, createdUser);
    }
  },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
    },
    instanceMethods: {
      validPassword: function(password) { //PURPOSE: compare existing password w/ what was typed into login field
        // return if the password matches the hash
        return bcrypt.compareSync(password, this.password);
      },
      toJSON: function() {
        // get the user's JSON data
        var jsonUser = this.get();
        // delete the password from the JSON data, and return
        delete jsonUser.password;
        return jsonUser;
      }
    }
  });
  return user;
};
