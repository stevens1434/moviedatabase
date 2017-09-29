'use strict';
module.exports = (sequelize, DataTypes) => {
  var moviesGenres = sequelize.define('moviesGenres', {
    movieId: DataTypes.INTEGER,
    genreId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return moviesGenres;
};