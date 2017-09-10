/* global console */


export default class Seedsatori {
    constructor() {
        console.log("running Seedsatori");
        this.queryCrimeData();
    }

    queryCrimeData() {
        console.log("querying crime data");
        const spotcrime = require('spotcrime');

        // san francisco area todo: this seems off when we load the map data its in east bay..
        let loc = {
            lat: 37.7749,
            lon: -122.4194
        };

        let radius = 10; // this is miles

        spotcrime.getCrimes(loc, radius, function(err, crimes){
            console.log("got data: ",crimes);
            console.log("--------------------");

            const RTM = require("satori-rtm-sdk");
            const rtm = new RTM("wss://w6nk9tes.api.satori.com", "cBFdC1aAd1a5C386aA2F8571d29EA37e");

            rtm.on("enter-connected", function() {
                rtm.publish("san_francisco_crimespotting", JSON.parse(JSON.stringify(crimes)));
            });

            //64k limit
            rtm.start();


        });
    }
}

const satori = new Seedsatori();