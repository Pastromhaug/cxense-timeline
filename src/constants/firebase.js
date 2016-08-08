/**
 * Created by perandre on 26.07.16.
 *
 * Initializes firebase
 */

var FIREBASE = require("firebase/app");
require("firebase/auth");
require("firebase/database");

var config = {
    apiKey: "AIzaSyAP9d8RcRn6M9jVioziQk5T-toolUZw-ks",
    authDomain: "cxense-timeline.firebaseapp.com",
    databaseURL: "https://cxense-timeline.firebaseio.com",
    storageBucket: ""
};

FIREBASE.initializeApp(config);

export default FIREBASE