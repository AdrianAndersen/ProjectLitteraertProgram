"use strict";
const db = firebase.firestore();

function initMap() {
    const initLocation = { lat: 65, lng: 15 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4.3,
        center: initLocation
    });
}
function oppdaterScoreBoard() {
    // Tømmer scoreboarden
    const dialektScoreEl = document.querySelector("#scoreDialekt");
    dialektScoreEl.innerHTML = "";
    let scoreliste = [];

    db.collection("HSDialektspillet").get().then((querySnapshot) => {
        querySnapshot.forEach((entry) => {
            const nyScore = {
                spillernavn: entry.data().spillernavn,
                score: entry.data().score,
                ID: entry.data().ID

            };
            scoreliste.push(nyScore);
        });
        scoreliste.sort(compare);
        for (let i = 0; i < scoreliste.length; i++) {
            leggTilPaaScoreBoard(scoreliste[i].spillernavn, scoreliste[i].score);
        }
    });
    function compare(a, b) {
        if (a.score > b.score)
            return -1;
        if (a.score < b.score)
            return 1;
        return 0;
    }
    function leggTilPaaScoreBoard(spillernavn, score) {
        const nyDiv = document.createElement("div");
        dialektScoreEl.appendChild(nyDiv);
        const nyttNavnEl = document.createElement("h4");
        nyttNavnEl.innerHTML = spillernavn;
        const nyttScoreEl = document.createElement("p");
        nyttScoreEl.innerHTML = score;
        nyDiv.appendChild(nyttNavnEl);
        nyDiv.appendChild(nyttScoreEl);
    }
}
oppdaterScoreBoard();