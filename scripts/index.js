// jshint esversion: 6

/* ---------- DOM ---------- */

let footer = document.querySelector('footer');
let wrapTitle = document.querySelector('#wrapTitle');





/* ---------- GET CSS VALUES ---------- */

let footerCompHeight = window.getComputedStyle(footer).height;
let footerHeight = pxToNum(footerCompHeight);





/* ---------- DATA ---------- */

let title = [ 'norsk', 'språk', 'og', 'dialekter' ];





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





/* ---------- MAKE H2 ---------- */

function makeTitle() {
  // add a h2 for ech part of the title

  title.forEach(el => {
    wrapTitle.innerHTML += `<h2>${el}</h2>`;
  });

  console.log('make title h2');

}





/* ---------- REGISTER FUNCTIONS ---------- */

footerTop();
makeTitle();
