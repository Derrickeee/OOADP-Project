const Sequelize = require('sequelize');
const db = require('../config/DBConfig');
const Video = db.define('video', {
    title: {
        type: Sequelize.STRING
    },
    story: {
        type: Sequelize.STRING(2000)
    },
    language: {
        type: Sequelize.STRING
    },
    subtitles: {
        type: Sequelize.STRING,
    },
    classification: {
        type: Sequelize.STRING
    },
    dateRelease: {
        type: Sequelize.DATE
    },
    posterURL: { // Practical 09 Exercise 02
        type: Sequelize.STRING
    },
    starring: { // Practical 09 Exercise 02
        type: Sequelize.STRING
    },
    comments: {
        type: Sequelize.STRING
    },
    reply:{
        type: Sequelize.STRING
    },
    rating: {
        type: Sequelize.STRING
    },
    feedbackdetails:
    {
        type: Sequelize.STRING,
    },
});
module.exports = Video;
