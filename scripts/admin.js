"use strict";
const db = firebase.firestore();

// Riktige svar (Må opppdatteres etter at dialektene legges inn!!);

const riktigesvar = ["Trøndelag", "Fredrikstad", "Stavanger", "Oslo"]; // Eksempel....

let map;
let aktivMarkorindex = 0;
function initMap() {
    const initLocation = { lat: 65, lng: 15 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4.3,
        center: initLocation
    });
}
let scorelisteDialekt = [];
let markers = [];
function hentStats() {
    clearOverlays();
    markers = [];

    document.querySelector("#riktigDialekt").innerHTML = "Riktig område for dialekt: " + riktigesvar[aktivMarkorindex];
    // Tømmer scoreboardene
    document.querySelector("#scoreDialekt").innerHTML = "";
    document.querySelector("#scoreQuiz").innerHTML = "";

    db.collection("HSDialektspillet").get().then((querySnapshot) => {

        querySnapshot.forEach((entry) => {
            const nyScore = {
                spillernavn: entry.data().spillernavn,
                score: entry.data().score,
                ID: entry.data().ID,
                valgteSvar: entry.data().valgtePosisjoner
            };
            scorelisteDialekt.push(nyScore);
        });
        scorelisteDialekt.sort(compare);

        for (let i = 0; i < scorelisteDialekt.length; i++) {
            leggTilPaaScoreBoard(scorelisteDialekt[i].spillernavn, scorelisteDialekt[i].score, "#scoreDialekt");
            if (scorelisteDialekt[i].valgteSvar[aktivMarkorindex] !== "NULL") {
                addMarker(scorelisteDialekt[i].valgteSvar[aktivMarkorindex]);
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

document.querySelector("#knappTilbake").addEventListener("click", () => {
    if (aktivMarkorindex === 0) {
        aktivMarkorindex = scorelisteDialekt[0].valgteSvar.length - 1;
    } else {
        aktivMarkorindex--;
    }
    hentStats();
});
document.querySelector("#knappFrem").addEventListener("click", () => {
    if (aktivMarkorindex === scorelisteDialekt[0].valgteSvar.length - 1) {
        aktivMarkorindex = 0;
    } else {
        aktivMarkorindex++;
    }
    hentStats();
});
hentStats();