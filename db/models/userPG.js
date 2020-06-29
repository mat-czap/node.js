module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize

    const User = sequelize.define('users', {
      name: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull:false,
      },
    }, {
      freezeTableName: true
  });
  
    return User;
  };