var ArticleModel = require('../article.model');
var find = require('../../middlewares/find');

module.exports = function(req, res, next) {
    
    // Входные данные
    const params = {
        query: req.query,
        originalUrl: req.originalUrl
    }

    // Любая дополнительная логика //


    find('article', ArticleModel, params)
    .then(data => {
        res.setHeader('Content-Type', 'application/vnd.api+json; charset=utf-8');
        res.send(data)
    })
    .catch(err => next(err))
}