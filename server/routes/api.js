
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const user = require('../models/users');
const word = require('../models/words');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = "mongodb://localhost/Dictionary";
mongoose.Promise = global.Promise;

mongoose.connect(db, function(err){
    if(err){
        console.error("Error! " + err);
    }
});

router.get('/words', (req, res) => {
    console.log('This is a Get request for all the words...hopefully');
    word.find({})
    .exec((err, words) => {
        if (err) {
            console.log("Error Getting the words...oh God!")
        } else {
            res.json(words);
        }
    });
});

router.post('/word', function(req, res){
    console.log('add a new word esti befetereh');
    var newWord = new word();
    newWord.word = req.body.word;
    newWord.definition = req.body.definition;
    newWord.save(function(err, insertedword){
        if(err){
            console.log('Error saving new product');
        }else{
            res.json(insertedword);
        }
    });
});

router.post('/user', (req, res) => {
    user.find({ username: req.body.username })
        .exec(newUser => {
            if (newUser) {
                return res.sendStatus(409)
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.sendStatus(500).json({error: err});
                    } else {
                        const newUser = new user({
                            username: req.body.username,
                            password: hash,
                        });
                        newUser.save(function(err, inserteduser){
                            if(err){
                                console.log('Error saving new user');
                            } else {
                                res.json(inserteduser);
                            }
                        });
                    }
                });
        }});
});

module.exports = router;