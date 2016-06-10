/**
 * Created by perandre on 6/10/16.
 */

var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var fetch = require('node-fetch');


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(8001, function () {
    console.log('Cxense-timeline listening on port 8001');
});