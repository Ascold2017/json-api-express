var express = require('express');

var CommentModel = require('../comment/comment.model');
var PeopleModel = require('../people/people.model');

var getComment = require('./controllers/getComment');
var findComments = require('./controllers/findComments');

var findRelationship = require('../middlewares/findRelationship');
var getRelationship = require('../middlewares/getRelationship');
var patchRelationship = require('../middlewares/patchRelationship');

var router = express.Router();


router.get('/comments', findComments);
router.get('/comments/:id', getComment);

router.get('/comments/:id/author', findRelationship('comment', CommentModel, 'author', 'people', PeopleModel));
router.get('/comments/:id/relationships/:relationship', getRelationship('comment', CommentModel));
router.patch('/comments/:id/relationships/:relationship', patchRelationship('comment', CommentModel));

module.exports = router;
