const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Cars', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    BrandId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Brands',
        key: 'ID'
      }
    },
    Model: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Color: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    BodyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BodyStyles',
        key: 'ID'
      }
    },
    EngineTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'EngineTypes',
        key: 'ID'
      }
    },
    TransmissionTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TransmissionTypes',
        key: 'ID'
      }
    },
    CarNumber: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    Seats: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PricePerDay: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Image: {
      type: DataTypes.TEXT,
      allowNull: false
    },

  }, {
    sequelize,
    tableName: 'Cars',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Cars__3214EC2723A8698C",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
