/**
 * Created by perandre on 27.06.16.
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var fetch = require('node-fetch');
var path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname + '/../prod/')));

app.get('/sample', function(req,res) {
    res.sendFile(__dirname + '/sample.json')
});

app.get('/test', function (req, res) {
    console.log('yay');
    fetch('https://jira.cxense.com/rest/api/2/issue/CXOPS-732')
        .then( function(data) {
            console.log(data);
            res.send(data);
        })
});

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../prod/prod-index.html'));
});



server.listen(8001, function () {
    console.log('Cxense-timeline listening on port 8001');
});