var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

var UserRoute = require('../Controller/User.Route');
var TechDetails = require('../Controller/TechDetails.Route');
var Comments = require('../Controller/Comments.Route');

router.use('/user/',UserRoute);
router.use('/tech/',TechDetails);
router.use('/comment/',Comments);

module.exports = router;
