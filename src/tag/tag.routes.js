var express = require('express');

var tagModel = require('../tag/tag.model');

var find = require('../middlewares/find');
var get = require('../middlewares/get');
var getRelationship = require('../middlewares/getRelationship');

var router = express.Router();

router.get('/tags', find('tag', tagModel));
router.get('/tags/:id', get('tag', tagModel));

module.exports = router;
