"use strict";
const db = firebase.firestore();

const dialekter = [{
    riktigOmraade: "Trøndelag",
    lydfilSrc: "trondelag.mp3",
    lydtekst: "Æ e itj på båten!",
    riktigKoordinat: { lat: 59.7196527, lng: 10.7931863 },
    maksScoreRadius: 50000
},
{
    riktigOmraade: "Fredrikstad",
    lydfilSrc: "fredrikstad.mp3",
    lydtekst: "Biler og båtar!",
    riktigKoordinat: { lat: 62, lng: 8 },
    maksScoreRadius: 50000
},
{
    riktigOmraade: "Stavanger",
    lydfilSrc: "stavanger.mp3",
    lydtekst: "Stavangarrrr!",
    riktigKoordinat: { lat: 62, lng: 8 },
    maksScoreRadius: 50000

},
{
    riktigOmraade: "Oslo",
    lydfilSrc: "oslo.mp3",
    lydtekst: "Ossssslo vesst!",
    riktigKoordinat: { lat: 62, lng: 8 },
    maksScoreRadius: 50000
}
];
let spillerID;
let rekkefolge = [];
let aktivDialektIndex;
let antallPoeng = 0;
let spillernavn;
let scoreRunde = 0;
let scoreliste = [];
hentHighscores();
function startSpill(e) {
    e.preventDefault();
    spillerID = "A" + Math.floor(Math.random() * 10000000);
    spillernavn = document.querySelector("input").value;
    document.querySelector("#registreringsContainer").style.display = "none";
    document.querySelector("#spillContainer").style.display = "flex";
    document.querySelector("#knappNeste").addEventListener("click", visNesteDialekt);
    document.querySelector("#knappSjekkSvar").addEventListener("click", sjekkSvar);

    lagDialektrekkefolge();
    aktivDialektIndex = -1;
    visNesteDialekt();
}
function hentHighscores() {
    const containerliste = document.querySelectorAll(".highscoreContainer");
    scoreliste = [];
    for (let i = 0; i < containerliste.length; i++) {
        containerliste[i].innerHTML = "";
    }
    function callback() {
        scoreliste.sort(compare);
        for (let i = 0; i < 5; i++) {
            leggTilPaaScoreBoard(scoreliste[i].spillernavn, scoreliste[i].score);
        }
        const plassering = finnPlassering();
        document.querySelector("#scorePlassering").innerHTML = `Du kom på ${plassering}. plass blant alle som har spilt til nå!`;
    }

    let antallBehandledeEntries = 0;
    db.collection("highscores").get().then((querySnapshot) => {
        querySnapshot.forEach((entry) => {
            const nyScore = {
                spillernavn: entry.data().spillernavn,
                score: entry.data().score,
                ID: entry.data().ID
            };
            scoreliste.push(nyScore);
            antallBehandledeEntries++;
            if (antallBehandledeEntries === querySnapshot.size) {
                callback();
            }
        });
    });
    function compare(a, b) {
        if (a.score > b.score)
            return -1;
        if (a.score < b.score)
            return 1;
        return 0;
    }
    function leggTilPaaScoreBoard(spillernavn, score) {
        for (let i = 0; i < containerliste.length; i++) {
            const nyDiv = document.createElement("div");
            containerliste[i].appendChild(nyDiv);
            const nyttNavnEl = document.createElement("h4");
            nyttNavnEl.innerHTML = spillernavn;
            const nyttScoreEl = document.createElement("p");
            nyttScoreEl.innerHTML = score;
            nyDiv.appendChild(nyttNavnEl);
            nyDiv.appendChild(nyttScoreEl);
        }
    }
}
function visNesteDialekt() {
    if (aktivDialektIndex > -1) {
        sjekkSvar();
    }
    clearOverlays();
    harAvgittSvar = false;
    valgtPosisjon = undefined;
    kartLytter = map.addListener('click', (e) => {
        if (!harAvgittSvar) {
            valgtPosisjon = { lat: e.latLng.lat(), lng: e.latLng.lng() };
            addMarker(valgtPosisjon, image, true);
            document.querySelector("#knappSjekkSvar").disabled = "";
        }
    });
    document.querySelector("audio").style.display = "block";
    document.querySelector("#spillSvarPo").style.display = "none";
    document.querySelector("#spillSvarPl").style.display = "none";
    document.querySelector("#dialektTekst").style.display = "block";
    document.querySelector("#knappSjekkSvar").disabled = true;
    document.querySelector("#info").style.display = "block";

    aktivDialektIndex++;
    if (aktivDialektIndex === dialekter.length) {
        avsluttSpill();
        return;
    }
    if (aktivDialektIndex === dialekter.length - 1) {
        document.querySelector("#knappNeste").innerHTML = "Fullfør spill";
    }
}
function lagDialektrekkefolge() {
    for (let i = 0; i < dialekter.length; i++) {
        rekkefolge.push(i);
    }
    rekkefolge = shuffle(rekkefolge);
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
}
function sjekkSvar() {
    harAvgittSvar = true;
    addMarker(dialekter[aktivDialektIndex].riktigKoordinat, "", false);
    const avstand = finnAvstand(dialekter[aktivDialektIndex].riktigKoordinat, valgtPosisjon);
    scoreRunde = 5000 * Math.pow(avstand,0.97);
    if (scoreRunde < 0) {
        scoreRunde = 0;
    }


    antallPoeng += scoreRunde;
    document.querySelector("#totalScore").innerHTML = "Din score: " + antallPoeng;

    const svarPoengEl = document.querySelector("#spillSvarPo");
    const svarPosisjonEl = document.querySelector("#spillSvarPl");
    svarPoengEl.innerHTML = `Du fikk ${scoreRunde} denne runden.`;
    svarPosisjonEl.innerHTML = `Riktig plassing for denne dialekten: ${dialekter[aktivDialektIndex].riktigOmraade}.`;
    document.querySelector("audio").style.display = "none";
    svarPosisjonEl.style.display = "block";
    svarPoengEl.style.display = "block";
    document.querySelector("#dialektTekst").style.display = "none";
    document.querySelector("#knappSjekkSvar").disabled = "true";
    document.querySelector("#info").style.display = "none";
    scoreRunde = 0;
}
function avsluttSpill() {
    document.querySelector("#spillContainer").style.display = "none";
    document.querySelector("#resultatContainer").style.display = "flex";
    document.querySelector("#sluttScore").innerHTML = "Din totale score ble: " + antallPoeng;
    db.collection("highscores").add({
        spillernavn: spillernavn,
        score: antallPoeng,
        ID: spillerID
    });
    hentHighscores();
}

function finnPlassering() {
    for (let i = 0; i < scoreliste.length; i++) {
        if (spillerID === scoreliste[i].ID) {
            return i + 1;
        }
    }
}
document.querySelector("#form").addEventListener("submit", startSpill);
let harAvgittSvar = false;
let markers = [];
let map;
let valgtPosisjon = undefined;
let kartLytter;
function initMap() {
    let startLocation = { lat: 66, lng: 15 };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4.4,
        center: startLocation,
        disableDefaultUI: true
    });

    kartLytter = map.addListener('click', (e) => {
        if (!harAvgittSvar) {
            valgtPosisjon = { lat: e.latLng.lat(), lng: e.latLng.lng() };
            addMarker(valgtPosisjon, image, true);
            document.querySelector("#knappSjekkSvar").disabled = "";
        }
    });
}
var image = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
// Adds a marker to the map and push to the array.
function addMarker(location, ikon, clear) {
    if (clear === true) {
        clearOverlays();
    }
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: ikon
    });
    markers.push(marker);
}
function clearOverlays() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers.length = 0;
}
var rad = function (x) {
    return x * Math.PI / 180;
};
function finnAvstand(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lat - p1.lat);
    var dLong = rad(p2.lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
};


