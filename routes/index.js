const express = require('express');
const Article = require('../models/article');
const router = express.Router();


// GET home page
router.get('/', function (req, res, next) {
  // const lang = req.query.lang || 'en';
  const lang = req.session.lang || 'en';
  Article.find({},(err,articles)=>{
    if(err){console.log(err)}
    res.render('index',
      { title: '' ,
    articles: articles,
    lang: lang
    });
  })
});

// GET article
router.get('/:articleId', (req, res, next) => {
  const articleId = req.params.articleId;

  Article.findById(articleId, (err, article) => {
    if (err) { return console.log(err) }

    // find the corresponding version
    const lang = req.session.lang || 'en';
    const version = article.translations.find(t=> t.language === lang);
    
    res.render('article',
      { title: version.title,
      version: version })
  })
})

module.exports = router;
