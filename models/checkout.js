const Sequelize = require('sequelize');
const db = require('../config/DBConfig');

const checkout = db.define('checkout', {
    fullName: {
        type: Sequelize.STRING
    },
});
module.exports = checkout;