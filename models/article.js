const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    translations: [{
        language: String,
        title: String,
        content: String,
        author: String
    }]
})

module.exports = mongoose.model('Article', articleSchema);