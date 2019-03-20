var express = require('express');

const getTag = require('./controllers/getTag');
const findTags = require('./controllers/findTags');
var router = express.Router();

router.get('/tags', findTags);
router.get('/tags/:id', getTag);

module.exports = router;
