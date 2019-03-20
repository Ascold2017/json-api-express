var ArticleModel = require('../article.model');
var patch = require('../../middlewares/patch');

module.exports = function(req, res, next) {
    const id = req.params.id;
    const data = req.body.data;

    patch('article', ArticleModel, id, data)
    .then(data => {
        res.setHeader('Content-Type', 'application/vnd.api+json; charset=utf-8');
        res.send(data)
    })
    .catch(err => next(err));
}