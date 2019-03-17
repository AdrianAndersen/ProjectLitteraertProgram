"use strict";
const db = firebase.firestore();

let map;
let aktiveMarkorer = 0;
let resetVal;
function initMap() {
    const initLocation = { lat: 65, lng: 15 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4.3,
        center: initLocation
    });
}
let scoreliste = [];
let markers = [];
function hentStats() {
    clearOverlays();
    markers = [];
    scoreliste = [];

    // Tømmer scoreboardene
    document.querySelector("#scoreDialekt").innerHTML = "";
    document.querySelector("#scoreQuiz").innerHTML = "";
    clearOverlays();



    db.collection("HSDialektspillet").get().then((querySnapshot) => {
        querySnapshot.forEach((entry) => {
            const nyScore = {
                spillernavn: entry.data().spillernavn,
                score: entry.data().score,
                ID: entry.data().ID,
                valgteSvar: entry.data().valgtePosisjoner
            };
            scoreliste.push(nyScore);
        });
        scoreliste.sort(compare);
        resetVal = scoreliste[0].valgteSvar.length;
        for (let i = 0; i < scoreliste.length; i++) {
            leggTilPaaScoreBoard(scoreliste[i].spillernavn, scoreliste[i].score, "#scoreDialekt");
            if (scoreliste[i].valgteSvar[aktiveMarkorer] !== undefined) {
                addMarker(scoreliste[i].valgteSvar[aktiveMarkorer]);
            }
        }
    });

    db.collection("HSQuiz").get().then((querySnapshot) => {
        let scoreliste = [];
        querySnapshot.forEach((entry) => {
            const nyScore = {
                spillernavn: entry.data().spillernavn,
                score: entry.data().score,
                ID: entry.data().ID,
                valgteSvar: valgtePosisjoner
            };
            scoreliste.push(nyScore);
        });
        scoreliste.sort(compare);
        for (let i = 0; i < scoreliste.length; i++) {
            leggTilPaaScoreBoard(scoreliste[i].spillernavn, scoreliste[i].score, "#scoreQuiz");
        }
    });
    function compare(a, b) {
        if (a.score > b.score)
            return -1;
        if (a.score < b.score)
            return 1;
        return 0;
    }
    function leggTilPaaScoreBoard(spillernavn, score, containerSel) {
        const container = document.querySelector(containerSel);
        const nyDiv = document.createElement("div");
        container.appendChild(nyDiv);
        const nyttNavnEl = document.createElement("h4");
        nyttNavnEl.innerHTML = spillernavn;
        const nyttScoreEl = document.createElement("p");
        nyttScoreEl.innerHTML = score;
        nyDiv.appendChild(nyttNavnEl);
        nyDiv.appendChild(nyttScoreEl);
    }

    function addMarker(location) {
        const marker = new google.maps.Marker({
            position: location,
            map: map
        });
        markers.push(marker);
    }
    function clearOverlays() {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers.length = 0;
    }
}
function endreAktiveMarkorer(endring) {
    aktiveMarkorer = Math.abs((aktiveMarkorer + endring) % resetVal);
    hentStats();
    console.log(aktiveMarkorer);
}
document.querySelector("#knappTilbake").addEventListener("click", () => { endreAktiveMarkorer(-1); });
document.querySelector("#knappFrem").addEventListener("click", () => { endreAktiveMarkorer(1); });
hentStats();