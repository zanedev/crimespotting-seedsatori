"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global console */

var Seedsatori = function () {
    function Seedsatori() {
        _classCallCheck(this, Seedsatori);

        console.log("running seedsatori");
        this.queryCrimeData();
    }

    _createClass(Seedsatori, [{
        key: "queryCrimeData",
        value: function queryCrimeData() {

            console.log("querying crime data");
            var spotcrime = require('spotcrime');

            // san francisco area
            var loc = {
                lat: 37.7749,
                lon: -122.4194
            };

            var radius = 10; // this is miles

            spotcrime.getCrimes(loc, radius, function (err, crimes) {
                console.log("got data: ", crimes);
                console.log("--------------------");

                var RTM = require("satori-rtm-sdk");
                var rtm = new RTM("wss://w6nk9tes.api.satori.com", "cBFdC1aAd1a5C386aA2F8571d29EA37e");

                rtm.on("enter-connected", function () {
                    rtm.publish("san_francisco_crimespotting", JSON.parse(JSON.stringify(crimes)));
                });

                //64k limit
                rtm.start();

                // const channel = rtm.subscribe("your-channel", RTM.SubscriptionMode.SIMPLE);
            });

            //
            // const fetchUrl = require("fetch").fetchUrl;
            // fetchUrl("http://sanfrancisco.crimespotting.org/crime-data?format=json&count=10", function(error, meta, body){
            //     console.log(body.toString());
            // });

        }
    }]);

    return Seedsatori;
}();

exports.default = Seedsatori;


var satori = new Seedsatori();