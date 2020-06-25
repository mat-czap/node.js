module.exports = (sequelize, Sequelize) => {
    
    const User = sequelize.define('users', {
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    }, {
      freezeTableName: true
  });
  
    return User;
  };