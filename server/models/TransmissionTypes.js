const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TransmissionTypes', {
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
    tableName: 'TransmissionTypes',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Transmis__3214EC27D68DD157",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
