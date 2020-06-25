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
      },
      testid:{
        type:Sequelize.INTEGER,
        references:{
          model: 'Test',
          key:'id'
        }
      }
    }, {
      freezeTableName: true
  });
  
    return User;
  };