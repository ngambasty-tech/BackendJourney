const express = require('express')

const router = express.Router();

router.get('/', function(req, res) {
    res.render('index');  // this method is possible because we have used the ejs engine
});

router.get('/about', function(req, res) {
res.render('about');
})

module.exports = router;