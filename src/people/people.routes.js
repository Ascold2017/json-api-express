var express = require('express');

var PeopleModel = require('../people/people.model');

var find = require('../middlewares/find');
var get = require('../middlewares/get');
var getRelationship = require('../middlewares/getRelationship');

var router = express.Router();

router.get('/peoples', find('people', PeopleModel));
router.get('/peoples/:id', get('people', PeopleModel));

module.exports = router;
