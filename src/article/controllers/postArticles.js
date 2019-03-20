var ArticleModel = require('../article.model');
var post = require('../../middlewares/post');

module.exports = function(req, res, next) {
    const data = req.body.data;

    // Валидация
    // Любая дополнительная логика

    post('article', ArticleModel, data)
        .then(response => {
            res.setHeader('Content-Type', 'application/vnd.api+json; charset=utf-8');
            res.send(response)
        })
        .catch(err => next(err));
}