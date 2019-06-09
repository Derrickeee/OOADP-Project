const express = require('express');
const router = express.Router();
const alertMessage = require('../helpers/messenger');
const moment = require('moment');
const checkout = require("../models/checkout");
const Cart = require('../models/Cart');
const Video = require('../models/Video');
const ensureAuthenticated = require('../helpers/auth');

router.get('/', (req, res) => {
    const title = 'Video Jotter';
    res.render('index', { title: title }) // renders views/index.handlebars
});



router.get('/', (req, res) => {
    const title = 'Video Jotter';
    res.render('index', { title: title }) // renders views/index.handlebars
});



//////// Michael's work


router.get('/showLogin', (req, res) => {
    res.render('user/login') // renders views/user/login.handlebars
});

router.get('/showRegister', (req, res) => {
    res.render('user/register') // renders views/register.handlebars
});

router.get('/forgotPassword', (req, res) => {
    const title = 'test';
    res.render('index', { title: title }) // renders views/index.handlebars
});


router.get('/setting', (req, res) => {
    const title = 'test';
    res.render('setting', { title: title }) // renders views/index.handlebars
});


router.get('/setting2', (req, res) => {
    const title = 'test';
    res.render('setting2', { title: title }) // renders views/index.handlebars
});

router.get('/billing', (req, res) => {
    const title = 'test';
    res.render('billing', { title: title }) // renders views/index.handlebars
});


router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


// Vincent's Page
router.get('/shopCartPage', (req, res) => {
    const title = 'This is the placeholder for the shopping cart';
    res.render('shopCart', { title: title }) // renders views/index.handlebars
});

router.post('/shopCartTest', (req, res) => {
    let listItem = req.body.listName;
    let listDesc = req.body.listDesc;
    let listPrice = req.body.listPrice;
    let listQuantity = req.body.listQuantity;
    
    // Multi-value components return array of strings or undefined
    Cart.create({
        listItem,
        listDesc,
        listPrice,
        listQuantity
    }).then((cart) => {
        res.redirect('/shopCartPage');
    })
        .catch(err => console.log(err))

});

router.get('/adminStore', (req, res) => {
    const title = 'This is the placeholder for the shopping cart';
    res.render('index', { title: title }) // renders views/index.handlebars
});

router.get('/shopCartTest', (req, res) => {
    const title = 'This is the placeholder for the shopping cart';
    res.render('shopCartTest', { title: title }) // renders views/index.handlebars
});

// Jonathan's Page
router.get('/storePage', (req, res) => {
	const title = 'This is the placeholder for the store page';
    res.render('storePage', { title: title }) // renders views/index.handlebars
});

router.get('/recipePage', (req, res) => {
	const title = 'This is the placeholder for the recipe page1';
	const name = 'Omelette with stuff'
	const price = '3.50'
	const cookTime = '15 mins'
	const difficulty = '3/5'
	const calories = '300'
	const addInfo = 'Contains Egg'
	res.render('recipes/_recipe1', { title: title, name: name, price: price, cookTime: cookTime, difficulty: difficulty, calories: calories, addInfo: addInfo }) // renders views/index.handlebars
});

// Imman's Pages

router.get('/test', (req, res) => {
    const title = 'test';
    res.render('test', { title: title })
});

router.get('/checkout', (req, res) => {
    const title = 'Checkout';
    res.render('checkout', { title: title })
});


router.get('/adminrecipe', (req, res) => {
    const title = 'admin recipe';
    res.render('index', { title: title }) // renders views/index.handlebars
});

router.post('/checkout', (req, res) => {
    let fullName = req.body.fullName;
    // Multi-value components return array of strings or undefined
    checkout.create({
        fullName
    }).then((checkout) => {
        res.redirect('/index');
    })
        .catch(err => console.log(err))

});


router.get('/about', (req, res) => {

    let success_msg = 'Success message';
    let error_msg = 'Error message using error_msg';

    alertMessage(res, 'success',
        'This is an important message', 'fas fa-sign-in-alt', true);
    alertMessage(res, 'danger',
        'Unauthorised access', 'fas fa-exclamation-circle', false);

    var errorTexts = [
        { text: "Error message using error object" },
        { text: "First error message🙅‍♀️" },
        { text: "Second error message 🚫" },
        { text: "Third error message⛔" }
    ];


    var dev_name = "🧐 Happy 脸😀"
    res.render('about', {
            developer_name: dev_name,
            success_msg: success_msg,
            error_msg: error_msg,
            errors: errorTexts
        }) // renders views/about.handlebars
});

router.get('/showLogin', (req, res) => {
    res.render('user/login') // renders views/user/login.handlebars
});

router.get('/showRegister', (req, res) => {
    res.render('user/register') // renders views/register.handlebars
});

// Derrick's pages

router.get('/thankyou', ensureAuthenticated, (req, res) => {
    res.render('thankyou')
});


router.get('/success', ensureAuthenticated, (req, res) => {
    res.render('deliverysuccessful')
});

router.get('/makepurchase', ensureAuthenticated, (req, res) => {
    res.render('purchase')
});

router.get('/feedbacklist', ensureAuthenticated, (req, res, next) => {
    let page = req.query.page || 1
    page = parseInt(page);
    const limit = 3
    const offset = (page - 1) * limit
    const numPageLinks = 10
    const pageStart = page
    const lastPage = numPageLinks + pageStart
    Video.findAll({
        where: {
            userId: req.user.id
        },
        order: [
            ['title', 'ASC']
        ],
        raw: true
       
    }).then((videos) => {
        // pass object to listVideos.handlebar
        res.render('feedbacklist', {
            videos: videos, pagination: {
                page: 1,       // The current page the user is on
                pageCount: 1 // The total number of available pages
            }
        });
    }).catch(err => console.log(err));
});

router.get('/adminfeedback', ensureAuthenticated, (req, res, next) => {
    Video.findAll({
        order: [
            ['title', 'ASC']
        ],
        raw: true
    }).then((videos) => {
        // pass object to listVideos.handlebar
        res.render('adminfeedback', {
            videos: videos,  pagination: {
                page: 1,       // The current page the user is on
                pageCount: 1 // The total number of available pages
            }

        });
    }).catch(err => console.log(err));
});

// Route to the page for User to add a new video
router.get('/givefeedback', ensureAuthenticated, (req, res) => {
    res.render('givefeedback', { // pass object to listVideos.handlebar
        videos: 'List of videos'
    });
});



// Adds new video jot from /video/addVideo
router.post('/addfeedback', ensureAuthenticated, (req, res) => {
    let title = req.body.title;
    let rating = req.body.rating;
    let reply = req.body.reply;
    let comments = req.body.comments;
    let feedbackdetails = req.body.feedbackdetails;
    let classification = req.body.classification;
    let starring = req.body.starring; // Practical 09 Exercise 02
    let posterURL = req.body.posterURL; // Practical 09 Exercise 02
    let userId = req.user.id;
    // Multi-value components return array of strings or undefined
    Video.create({
        title,
        comments,
        reply,
        feedbackdetails,
        rating,
        classification,
        userId,
        starring,
        posterURL
        
    }).then((video) => {
        res.redirect('/thankyou');
    })
        .catch(err => console.log(err))

});

// Shows edit video page
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Video.findOne({
        where: {
            id: req.params.id
        }
    }).then((video) => {

        if (req.user.id === video.userId) {
            // call views/video/editVideo.handlebar to render the edit video page
            res.render('editfeedback', {
                video // passes video object to handlebar
            });
        } else {
            // Video does not belong to the current user
            alertMessage(res, 'danger', 'Unauthorized Access.', 'fas fa-exclamation-circle', true);
            req.logout();
            res.redirect('/');
        }
    }).catch(err => console.log(err)); // To catch no video ID
});

router.get('/reply/:id', ensureAuthenticated, (req, res) => {
    Video.findOne({
        where: {
            id: req.params.id
        }
    }).then((video) => {

            res.render('reply', {
                video // passes video object to handlebar
            });
        }
    ).catch(err => console.log(err)); // To catch no video ID
});

// Creates variables with ‘check’ to put a tick in the appropriate checkbox

// Save edited video
router.put('/saveEditedFeedback/:id', ensureAuthenticated, (req, res) => {
    let title = req.body.title;
    let comments = req.body.comments;
    let reply = req.body.reply;
    let rating = req.body.rating;
    let feedbackdetails = req.body.feedbackdetails;
    let starring = req.body.starring; // Practical 09 Exercise 02
    let posterURL = req.body.posterURL; // Practical 09 Exercise 02
    let userId = req.user.id;
    var feedbackID = req.params.id;
    // Retrieves edited values from req.body
    Video.update({
        // Set variables here to save to the videos table
        title,
        comments,
        reply,
        feedbackdetails,
        rating,
        userId,
        starring,
        posterURL
    }, {
            where: {
                id: feedbackID
            }
        }).then(() => {
            // After saving, redirect to router.get(/listVideos...) to retrieve all updated
            // videos
            res.redirect('/thankyou');
        }).catch(err => console.log(err));
});


router.get('/delete/:id', ensureAuthenticated, (req, res) => {
    var feedbackId = req.params.id;
    Video.findOne({
        where: {
            id: feedbackId
        }
    }).then((video) => {
        console.log("videoIDToDelete.userId : " + video.userId);
        console.log("req.user.id : " + req.user.id);
        if (video.userId === req.user.id) {
            Video.destroy({
                where: {
                    id: feedbackId
                }
            }).then((video) => {
                // For icons to use, go to https://glyphsearch.com/
                alertMessage(res, 'success', 'Feedback successfully deleted.', 'fa fa-hand-peace-o', true);
                res.redirect('/feedbacklist');
            }).catch(err => console.log(err));
        } else {
            // Video does not belong to the current user
            alertMessage(res, 'danger', 'Unauthorized Access.', 'fas fa-exclamation-circle', true);
            req.logout();
            res.redirect('/');
        }
    })
});



module.exports = router