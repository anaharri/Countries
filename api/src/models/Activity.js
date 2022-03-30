const { DataTypes } = require("sequelize");

// Exporto una funcion que define el modelo y recibe por param una instancia de sequelize

module.exports = (sequelize) => {
  sequelize.define("activity", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5"),
    },
    season: {
      type: DataTypes.STRING,
    },
  });
};
