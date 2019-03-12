// JavaScript source code
// jshint esversion: 6

/* ---------- DOM ---------- */

let footer = document.querySelector('footer');





/* ---------- GET CSS VALUES ---------- */

let footerCompHeight = window.getComputedStyle(footer).height;
let footerHeight = pxToNum(footerCompHeight);





/* ---------- HELPERS ---------- */

function pxToNum(string) {
  // remove 'px' at the end and turn string to number
  return Number(string.slice(0, string.length - 2));
}





/* ---------- SET FOOTER MARGIN TOP ---------- */

function footerTop() {
  // hide footer from start view
  footer.style.setProperty('--footerTop', `-${2*footerHeight}px`);

  console.log('fix footer');
}





/* ---------- REGISTER FUNCTIONS ---------- */

footerTop();
