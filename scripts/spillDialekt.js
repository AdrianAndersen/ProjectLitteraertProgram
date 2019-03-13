(() => {
    "use strict";
    const db = firebase.firestore();
    hentHighscores();

    const dialekter = [{
        riktigOmraade: "Trøndelag",
        lydfilSrc: "trondelag.mp3",
        lydtekst: "Æ e itj på båten!",
        riktigKoordinat: []
    },
    {
        // osv...
    },
    {
        // osv...
    },
    {
        // osv...
    },
    {
        // osv...
    }
    ];
    const antallDialekter = dialekter.length;
    let rekkefolge = [];
    let aktivDialektIndex;
    let antallPoeng = 0;
    let spillernavn;
    function startSpill(e) {
        e.preventDefault();
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
        for (let i = 0; i < containerliste.length; i++) {
            containerliste[i].innerHTML = "";
        }
        let scoreliste = [];
        db.collection("highscores").get().then((querySnapshot) => {
            querySnapshot.forEach((entry) => {
                const nyScore = {
                    spillernavn: entry.data().spillernavn,
                    score: entry.data().score
                };
                scoreliste.push(nyScore);
            });
            scoreliste.sort(compare);
            for (let i = 0; i < 5; i++) {
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
        document.querySelector("audio").style.display = "block";
        document.querySelector("#spillSvarPo").style.display = "none";
        document.querySelector("#spillSvarPl").style.display = "none";
        document.querySelector("#dialektTekst").style.display = "block";
        document.querySelector("#knappSjekkSvar").disabled = "";

        aktivDialektIndex++;
        if (aktivDialektIndex === dialekter.length) {
            avsluttSpill();
            return;
        }
        if (aktivDialektIndex === dialekter.length-1) {
            document.querySelector("#knappNeste").innerHTML = "Fullfør spill";
        }
    }
    function lagDialektrekkefolge() {
        for (let i = 0; i < antallDialekter; i++) {
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
        document.querySelector("audio").style.display = "none";
        document.querySelector("#spillSvarPo").style.display = "block";
        document.querySelector("#spillSvarPl").style.display = "block";
        document.querySelector("#dialektTekst").style.display = "none";
        document.querySelector("#knappSjekkSvar").disabled = "true";
        // Vis markør på kart

    }
    function avsluttSpill() {
        document.querySelector("#spillContainer").style.display = "none";
        document.querySelector("#resultatContainer").style.display = "flex";
        db.collection("highscores").add({
            spillernavn: spillernavn,
            score: antallPoeng
        });
        hentHighscores();

    }
    document.querySelector("#form").addEventListener("submit", startSpill);
})();