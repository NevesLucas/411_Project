/**
 * Dependencies.
 */

var express = require('express');
var router = express.Router();

var ctrlItin = require('../controllers/itineraries');


// itineraries
router.post('/search',ctrlItin.getItineraries);

module.exports = router;
