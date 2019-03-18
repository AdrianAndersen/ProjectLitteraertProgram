"use strict";
const image = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
const db = firebase.firestore();

const dialekter = [{
    riktigOmraade: "Trøndelag",
    lydfilSrc: "media/audio/aww.mp3",
    lydtekst: "Æ e itj på båten!",
    riktigKoordinat: { lat: 59.7196527, lng: 10.7931863 },
},
{
    riktigOmraade: "Fredrikstad",
    lydfilSrc: "media/audio/ding.mp3",
    lydtekst: "Biler og båtar!",
    riktigKoordinat: { lat: 62, lng: 8 },
},
{
    riktigOmraade: "Stavanger",
    lydfilSrc: "media/audio/draw.mp3",
    lydtekst: "Stavangarrrr!",
    riktigKoordinat: { lat: 62, lng: 40 },

},
{
    riktigOmraade: "Oslo",
    lydfilSrc: "media/audio/feil.mp3",
    lydtekst: "Ossssslo vesst!",
    riktigKoordinat: { lat: 10, lng: 8 },
}
];
let spillerID;
let finalRekkefolge = [];
let aktivDialektIndex;
let antallPoeng = 0;
let spillernavn;
let scoreRunde = 0;
let scorelisteDialekt = [];
let harSjekketSvar = false;
let harAvgittSvar = false;
let markers = [];
let map;
let valgtPosisjon = undefined;
oppdaterScoreBoard();
function startSpill(e) {
    e.preventDefault();
    spillerID = "S" + Date.now();
    spillernavn = document.querySelector("input").value;

    document.querySelector("#registreringsContainer").style.display = "none";
    document.querySelector("#spillContainer").style.display = "flex";
    document.querySelector("#knappNeste").addEventListener("click", visNesteDialekt);

    document.querySelector("#knappSjekkSvar").addEventListener("click", sjekkSvar);

    aktivDialektIndex = -1;
    visNesteDialekt();
}
function oppdaterScoreBoard() {
    // Tømmer scoreboarden
    const containerliste = document.querySelectorAll(".highscoreContainer");
    for (let i = 0; i < containerliste.length; i++) {
        containerliste[i].innerHTML = "";
    }
    scorelisteDialekt = [];

    let antallBehandledeEntries = 0;
    db.collection("HSDialektspillet").get().then((querySnapshot) => {
        querySnapshot.forEach((entry) => {
            const nyScore = {
                spillernavn: entry.data().spillernavn,
                score: entry.data().score,
                ID: entry.data().ID
            };
            scorelisteDialekt.push(nyScore);

            antallBehandledeEntries++;
            if (antallBehandledeEntries === querySnapshot.size) {
                // Alle scorene er lagt til i listen
                scorelisteDialekt.sort(compare);
                for (let i = 0; i < 5; i++) {
                    leggTilPaaScoreBoard(scorelisteDialekt[i].spillernavn, scorelisteDialekt[i].score);
                }
                const plassering = finnPlassering();
                document.querySelector("#scorePlassering").innerHTML = `Du kom på ${plassering}. plass blant alle som har spilt til nå!`;
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
    aktivDialektIndex++;

    if (aktivDialektIndex === dialekter.length - 1) {
        document.querySelector("#knappNeste").innerHTML = "Fullfør spill";
    }

    if (!harSjekketSvar) {
        sjekkSvar();
    }

    if (aktivDialektIndex === dialekter.length) {
        avsluttSpill();
        return;
    }

    harSjekketSvar = false;
    clearOverlays();
    harAvgittSvar = false;
    valgtPosisjon = undefined;

    map.addListener('click', (e) => {
        if (!harAvgittSvar) {
            valgtPosisjon = { lat: e.latLng.lat(), lng: e.latLng.lng() };
            addMarker(valgtPosisjon, image, true);
            document.querySelector("#knappSjekkSvar").disabled = "";
        }
    });

    document.querySelector("#dialektTekst").innerHTML = dialekter[aktivDialektIndex].lydtekst;


    // Viser relevante elementer
    document.querySelector("audio").style.display = "block";
    document.querySelector("#spillSvarPo").style.display = "none";
    document.querySelector("#spillSvarPl").style.display = "none";
    document.querySelector("#dialektTekst").style.display = "block";
    document.querySelector("#knappSjekkSvar").disabled = true;
    document.querySelector("#info").style.display = "block";

    // Bytter lydfil
    document.querySelector("#audioSrc").src = dialekter[aktivDialektIndex].lydfilSrc;
    document.querySelector("#audioEl").load();
    document.querySelector("#audioEl").play();
}
function sjekkSvar() {
    let localIndex = aktivDialektIndex;
    harSjekketSvar = true;
    harAvgittSvar = true;
    if (localIndex === dialekter.length) {
        localIndex--;
    }
    addMarker(dialekter[localIndex].riktigKoordinat, "", false);
    let avstand;
    if (valgtPosisjon !== undefined) {
        finalRekkefolge.push(valgtPosisjon);
        avstand = finnAvstand(dialekter[localIndex].riktigKoordinat, valgtPosisjon);
    } else {
        if (localIndex !== 0) {
            finalRekkefolge.push("NULL");
        }
        avstand = Number.MAX_SAFE_INTEGER;
    }
    scoreRunde = Math.round(5000 * Math.exp(-avstand / 100000));
    if (scoreRunde < 0) {
        scoreRunde = 0;
    }

    antallPoeng += scoreRunde;
    document.querySelector("#totalScore").innerHTML = "Din score: " + antallPoeng;

    const svarPoengEl = document.querySelector("#spillSvarPo");
    const svarPosisjonEl = document.querySelector("#spillSvarPl");
    svarPoengEl.innerHTML = `Du fikk ${scoreRunde} denne runden.`;
    svarPosisjonEl.innerHTML = `Riktig plassing for denne dialekten: ${dialekter[localIndex].riktigOmraade}.`;
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
    db.collection("HSDialektspillet").add({
        spillernavn: spillernavn,
        score: antallPoeng,
        ID: spillerID,
        valgtePosisjoner: finalRekkefolge
    });
    oppdaterScoreBoard();
}
function finnPlassering() {
    for (let i = 0; i < scorelisteDialekt.length; i++) {
        if (spillerID === scorelisteDialekt[i].ID) {
            return i + 1;
        }
    }
}
function initMap() {
    const startLocation = { lat: 66, lng: 15 };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4.4,
        center: startLocation,
        disableDefaultUI: true
    });

    map.addListener('click', (e) => {
        if (!harAvgittSvar) {
            valgtPosisjon = { lat: e.latLng.lat(), lng: e.latLng.lng() };
            addMarker(valgtPosisjon, image, true);
            document.querySelector("#knappSjekkSvar").disabled = "";
        }
    });
}
function addMarker(location, ikon, clear) {
    if (clear === true) {
        clearOverlays();
    }
    const marker = new google.maps.Marker({
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
const rad = function (x) {
    return x * Math.PI / 180;
};
function finnAvstand(p1, p2) {
    const R = 6378137; // Earth’s mean radius in meter
    const dLat = rad(p2.lat - p1.lat);
    const dLong = rad(p2.lng - p1.lng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d; // returns the distance in meter
};










/* ---------- SET MARGIN FOR MAIN AND FOOTER ---------- */

function pxToNum(string) {
  // remove 'px' at the end and turn string to number
  return Number(string.slice(0, string.length - 2));
}

function mainTop() {
  let nav = document.querySelector('nav');
  let main = document.querySelector('main');

  let navCompHeight = window.getComputedStyle(nav).height;
  let navHeight = pxToNum(navCompHeight);

  // adjust margin top
  main.style.setProperty('--mainTop', `${7.5*navHeight}px`);
}

function footerTop() {
  let footer = document.querySelector('footer');

  let footerCompHeight = window.getComputedStyle(footer).height;
  let footerHeight = pxToNum(footerCompHeight);

  // hide footer from start view
  footer.style.setProperty('--footerTop', `-${2*footerHeight}px`);
}

mainTop();
footerTop();

document.querySelector("#form").addEventListener("submit", startSpill);
