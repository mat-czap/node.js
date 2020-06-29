module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize
    const Passport = sequelize.define('passports', {
      nazwa: {
        type: DataTypes.STRING,
      },
    }, {
      freezeTableName: true
  });
  
    return Passport;
  };