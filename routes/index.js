const express = require('express');
const Article = require('../models/article');
const router = express.Router();
const path = require('path');
const fs = require('fs');

function grabTemplate(lang, cb) {
  fs.readFile(
    path.join(__dirname, '..', 'template', `${lang}.json`),
    (err, file) => {
      cb(JSON.parse(file));
    })
}
// GET home page
router.get('/', async (req, res, next) => {
  // const lang = req.query.lang || 'en';
  const lang = await req.session.lang || 'en';
  grabTemplate(lang, (template) => {
    Article.find({}, (err, articles) => {
      if (err) { console.log(err) }
      res.render('index',
        {
          title: '',
          articles: articles,
          lang: lang,
          template: template
        });
    })
  });


});

// GET article
router.get('/articles/:articleId', (req, res, next) => {
  const articleId = req.params.articleId;


  Article.findById(articleId, (err, article) => {
    if (err) { return console.log(err) }

    // find the corresponding version
    const lang = req.session.lang || 'en';
    const version = article.translations.find(t => t.language === lang);

    grabTemplate(lang, (template) => {

      res.render('article',
        {
          title: version.title,
          version: version,
          template: template,
          lang:lang
        })
    })
  })
})

module.exports = router;
