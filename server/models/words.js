

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WordsSchema = new Schema({
    word: String,
    definition: String
});

 const Words = mongoose.model('word', WordsSchema);
 module.exports = Words;