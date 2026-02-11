const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express();

app.set('views', path.join(__dirname,"views"));
app.set('view engine','ejs');//unlocking the templating feature for dynamic html content  engine is ejs

app.use(express.static('public'))
app.use(express.urlencoded({extended: false}));

app.get('/restaurants', function(req, res) {
    const filePath = path.join(__dirname, "data", "restaurants.json");
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);
    res.render('restaurants', {numberOfRestau: storedRestaurants.length, restaurants: storedRestaurants});
})

app.post('/recommend', function(req, res) {
    const restaurant = req.body;
    const filePath = path.join(__dirname, "data", "restaurants.json");
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);
    storedRestaurants.push(restaurant);

    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
    res.redirect('/confirm')
})


app.get('/recommend', function(req, res) {
res.render('recommend');
})
app.get('/confirm', function(req, res) {
res.render('confirm');
})

app.get('/about', function(req, res) {
res.render('about');
})
app.get('/', function(req, res) {
    res.render('index');  // this method is possible because we have used the ejs engine
})

app.listen(3000);