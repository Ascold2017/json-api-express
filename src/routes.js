var express = require('express');

var docsRouter = require('./docs/docs.routes');
var articleRouter = require('./article/article.routes');
var peopleRouter = require('./people/people.routes');
var commentRouter = require('./comment/comment.routes');
var tagRouter = require('./tag/tag.routes');

var router = express.Router();

router.use(docsRouter);
router.use(articleRouter);
router.use(peopleRouter);
router.use(commentRouter);
router.use(tagRouter);

module.exports = router;
