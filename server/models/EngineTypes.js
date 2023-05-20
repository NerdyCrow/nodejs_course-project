const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('EngineTypes', {
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
    tableName: 'EngineTypes',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__EngineTy__3214EC27335B12C0",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
