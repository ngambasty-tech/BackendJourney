const express = require('express')
const uuid = require('uuid');

const router = express.Router();

const resData = require('../util/restaurant-data')



router.get('/restaurants', function(req, res) {
let order = req.query.order;
let nextOrder = 'desc'

if (order !== 'asc' && order !=='desc') {
    order = 'asc';
}

if (order === 'desc') {
    nextOrder = 'asc';
}

    const storedRestaurants = resData.getStoredRestaurants()


    storedRestaurants.sort(function(resA, resB) {
        if((order === 'asc' && resA.name > resB.name) || (order === 'desc' && resB.name > resA.name)) {
            return 1;
        } else {
            return -1;
        }
    
        
    })
    res.render('restaurants', {numberOfRestau: storedRestaurants.length, restaurants: storedRestaurants, nextOrder: nextOrder});
})

router.get('/restaurants/:id', function(req, res) {
    const restaurantId = req.params.id;
    const storedResataurants= resData.getStoredRestaurants()

    for(const x of storedRestaurants) {
        if(x.id===restaurantId){
    return res.render('restaurant-detail', {restaurant: x})
        }
    }
    res.status(404).render('404')
})

module.exports = router;
