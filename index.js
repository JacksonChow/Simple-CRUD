var port = 5000
var express = require('express');
var app = express();
var mongoose = require('mongoose')
var multer = require('multer');
var upload = multer();
var bodyParser = require('body-parser')
var path = require('path')




app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(upload.array())



var database = []

const { uniqueNamesGenerator, adjectives, colors, animals, names } = require('unique-names-generator');
for (let i = 0; i < 100; i++) {
    var shortName = uniqueNamesGenerator({
        dictionaries: [names, names],
        length: 2
    });

    var shortNameArray = shortName.split('_')
    var name = shortNameArray.join(' ')
    var email = shortNameArray.join('_') + '@email.com';
    database.push({
        id: database.length + 1,
        name: name,
        email: email
    })
}

module.exports.database = database




var api = require('./api/api.js')
app.use('/api', api)




app.use(express.static('dist'))
app.get('/*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});






app.listen(port, () => { console.log('server is running on port... :' + port) });