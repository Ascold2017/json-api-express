var get = require('../../middlewares/get');
var CommentModel = require('../../comment/comment.model');

module.exports = function(req, res, next) {
    // Входные параметры
    const params = {
        id: req.params.id,
        query: req.query,
        originalUrl: req.originalUrl
    }

    // Любая дополнительная логика

    get('comment', CommentModel, params)
    .then(data => {
        res.setHeader('Content-Type', 'application/vnd.api+json; charset=utf-8');
        res.send(data)
    })
    .catch(err => next(err));
}