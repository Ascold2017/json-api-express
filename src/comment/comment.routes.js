var express = require('express');

var CommentModel = require('../comment/comment.model');
var PeopleModel = require('../people/people.model');

var find = require('../middlewares/find');
var get = require('../middlewares/get');
var findRelationship = require('../middlewares/findRelationship');
var getRelationship = require('../middlewares/getRelationship');

var router = express.Router();

router.get('/comments', find('comment', CommentModel));
router.get('/comments/:id', get('comment', CommentModel));
router.get('/comments/:id/author', findRelationship('comment', CommentModel, 'author', 'people', PeopleModel));
router.get('/comments/:id/relationships/:relationship', getRelationship('comment', CommentModel));

module.exports = router;
