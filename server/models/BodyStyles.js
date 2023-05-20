const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BodyStyles', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'BodyStyles',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__BodyStyl__3214EC27B733D435",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
