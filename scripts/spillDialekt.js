(() => {
    "use strict";
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
    function startSpill(e) {
        e.preventDefault();
        document.querySelector("#registreringsContainer").style.display = "none";
        document.querySelector("#spillContainer").style.display = "flex";
        document.querySelector("#knappNeste").addEventListener("click", visNesteDialekt);
        lagDialektrekkefolge();
        aktivDialektIndex = -1;
        visNesteDialekt();
    }
    function visNesteDialekt() {
        aktivDialektIndex++;
        if (aktivDialektIndex === dialekter.length) {
            avsluttSpill();
            return;
        }
        console.log(aktivDialektIndex);
        if (aktivDialektIndex === dialekter.length-1) {
            document.querySelector("#knappNeste").innerHTML = "Fullfør test";
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
    function avsluttSpill() {
        document.querySelector("#spillContainer").style.display = "none";
        document.querySelector("#resultatContainer").style.display = "flex";


    }
    document.querySelector("#form").addEventListener("submit", startSpill);
})();