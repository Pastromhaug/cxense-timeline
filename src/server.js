/**
 * Created by perandre on 6/10/16.
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var fetch = require('node-fetch');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/sample', function(req,res) {
   res.sendFile(__dirname + '/sample_large.json')
});

app.get('/test', function (req, res) {
    console.log('yay');
    fetch('https://jira.cxense.com/rest/api/2/issue/CXOPS-732')
        .then( function(data) {
            console.log(data);
            res.send(data);
        })
});

app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(8001, function () {
    console.log('Cxense-timeline listening on port 8001');
});