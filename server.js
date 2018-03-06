const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test-server');

const Schema = mongoose.Schema;
const PersonSchema = new Schema({
    first_name: String,
    last_name: String,
    age: Number
});

const Person = mongoose.model('Person',PersonSchema);

app.use(express.static('.'));

app.use(bodyParser.json());

app.get('/api',(req,res) => {
    res.send({
        neat: 'whoa'
    });
});

app.post('/api/create',(req,res) => {
    const data = req.body;
    new Person(data)
        .save((err,doc) => {
            if(err) {
                res
                    .status(400)
                    .send({err});
                return;
            }
            res
                .status(200)
                .send({
                    person: doc
                });
        });
});

app.get('/api/list',(req,res) => {
    Person.find({},(err,docs) => {
        if(err) {
            res
                .status(400)
                .send({err});
            return;
        }
        res
            .status(200)
            .send({
                people: docs
            });
    });
});

app.listen('3800');