var express = require('express');

const getPeople = require('./controllers/getPeople');
const findPeople = require('./controllers/findPeople');

var router = express.Router();

router.get('/peoples', findPeople);
router.get('/peoples/:id', getPeople);

module.exports = router;
