var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    
  var username = 'Jide'//select username from the table
  res.render('about', { title: 'About Us'});
});

module.exports = router;
