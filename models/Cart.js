const Sequelize = require('sequelize');
const db = require('../config/DBConfig');
/*
Note that Sequelize automatically pleuralizes the entity name as the table name
*/
const Cart = db.define('cart', {
    listItem: {
        type: Sequelize.STRING
    },
    listDesc:{
        type: Sequelize.STRING
    },
    listPrice: {
        type: Sequelize.STRING
    },
    listQuantity: {
        type: Sequelize.STRING
    },
});
module.exports = Cart;