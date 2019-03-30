"use strict";
const db = firebase.firestore();

const riktigesvar = ["Bergen", "Trondheim", "Grønland / Oslo Øst", "Fredrikstad", "Området rundt Hardangerfjorden", "Sørlandet", "Tromsø", "Hallingdal", "Nordstrand", "Molde"];

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
function oppdaterMarkers() {
    clearOverlays();
    markers = [];

    document.querySelector("#riktigDialekt").innerHTML = "Riktig område for dialekt: " + riktigesvar[aktivMarkorindex];

    for (let i = 0; i < scorelisteDialekt.length; i++) {
        if (scorelisteDialekt[i].valgteSvar[aktivMarkorindex] !== "NULL") {
            addMarker(scorelisteDialekt[i].valgteSvar[aktivMarkorindex]);
        }
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
let henterData = false;
function hentStats() {
    document.querySelector("#scoreDialekt").innerHTML = "";
    document.querySelector("#scoreQuiz").innerHTML = "";

    db.collection("HSDialektspillet").get().then((querySnapshot) => {
        let scoreliste = [];
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
        oppdaterMarkers();
        for (let i = 0; i < scoreliste.length; i++) {
            leggTilPaaScoreBoard(scoreliste[i].spillernavn, scoreliste[i].score, "#scoreDialekt");
        }
        scorelisteDialekt = scoreliste;
        henterData = false;
    });
    db.collection("HSQuiz").get().then((querySnapshot) => {
        let scoreliste = [];
        querySnapshot.forEach((entry) => {
            const nyScore = {
                spillernavn: entry.data().spillernavn,
                score: entry.data().score,
            };
            scoreliste.push(nyScore);
        });
        scoreliste.sort(compare);
        for (let i = 0; i < scoreliste.length; i++) {
            leggTilPaaScoreBoard(scoreliste[i].spillernavn, scoreliste[i].score, "#scoreQuiz");
        }
        henterData = false;
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
        const nyttNavnEl = document.createElement("h6");
        nyttNavnEl.innerHTML = spillernavn;
        const nyttScoreEl = document.createElement("p");
        nyttScoreEl.innerHTML = score;
        nyDiv.appendChild(nyttNavnEl);
        nyDiv.appendChild(nyttScoreEl);
    }
}

function handleNyeData() {
    if (!henterData) {
        henterData = true;
        hentStats();
    } else {
        setTimeout(() => {
            handleNyeData();
        }, 100);
    }
}

document.querySelector("#knappTilbake").addEventListener("click", () => {
    if (aktivMarkorindex === 0) {
        aktivMarkorindex = scorelisteDialekt[0].valgteSvar.length - 1;
    } else {
        aktivMarkorindex--;
    }
    oppdaterMarkers();
});
document.querySelector("#knappFrem").addEventListener("click", () => {
    if (aktivMarkorindex === scorelisteDialekt[0].valgteSvar.length - 1) {
        aktivMarkorindex = 0;
    } else {
        aktivMarkorindex++;
    }
    oppdaterMarkers();
});

db.collection("HSDialektspillet").onSnapshot(() => {
    handleNyeData();
});
db.collection("HSQuiz").onSnapshot(() => {
    handleNyeData();
});
