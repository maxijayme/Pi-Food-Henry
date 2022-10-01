const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Diet', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
      type: DataTypes.ENUM,
        values:
        ['gluten free',
        'ketogenic',
        'vegetarian',
        'lacto vegetarian',
        'ovo vegetarian',
        'vegan',
        'pescatarian',
        'paleo',
        'primal',
        'low foodmap',
        'whole 30',]
    } 
  },{
    timestamps: false
  });
};