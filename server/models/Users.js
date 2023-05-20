const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Users', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    FirstName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    LastName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    PhoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Role: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'USER'
    }
  }, {
    sequelize,
    tableName: 'Users',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Users__3214EC276FA3A104",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
