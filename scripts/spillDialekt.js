(() => {
    "use strict";
    function startSpill(e) {
        e.preventDefault();
        // Fokus p� input
        console.log("starter spill");
    }
    document.querySelector("#form").addEventListener("submit", startSpill);
    document.querySelector("#knappStartSpill").addEventListener("click", startSpill);
})();