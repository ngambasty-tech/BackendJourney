const path = require('path')
const express = require('express')

const defaultRoutes = require('./routes/default')
const restaurantRoutes = require('./routes/restaurants')

const app = express();

app.use('/', defaultRoutes);//this middleware checkes all incoming routes and fowrd to defaul.js. if it matches,it is routed-- fisrt check
app.use('/', restaurantRoutes)

app.set('views', path.join(__dirname,"views"));
app.set('view engine','ejs');//unlocking the templating feature for dynamic html content  engine is ejs

app.use(express.static('public'))
app.use(express.urlencoded({extended: false}));



app.post('/recommend', function(req, res) {
    const restaurant = req.body;
    restaurant.id = uuid.v4();
    const restaurants = resData.getStoredRestaurants();
    restaurants.push(restaurant);

    resData.storedRestaurants(restaurants)
    res.redirect('/confirm')
})


app.get('/recommend', function(req, res) {
res.render('recommend');
})
app.get('/confirm', function(req, res) {
res.render('confirm');
})




app.use(function(req, res) {
    res.status(404).render('404')
})//our own middleware to handle client side errors-missed url

app.use(function(error, req, res, next) {//special default error handler with 4 input parameters
    res.status(500).render('500')
})

app.listen(3000);  