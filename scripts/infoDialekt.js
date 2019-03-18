// JavaScript source code
// jshint esversion: 6

/* ---------- DOM ---------- */

let nav = document.querySelector('nav');

let main = document.querySelector('main');
let infoDialekt = document.querySelector('#infoDialekt');

let wrapBtnsDialekt = document.querySelector('#wrapBtnsDialekt');

let footer = document.querySelector('footer');





/* ---------- GET CSS VALUES ---------- */

let navCompHeight = window.getComputedStyle(nav).height;
let navHeight = pxToNum(navCompHeight);

let footerCompHeight = window.getComputedStyle(footer).height;
let footerHeight = pxToNum(footerCompHeight);





/* ---------- DATA ---------- */

let data = [
  {
    type: 'palatalisering',
    desc: 'en eller annen slags forklaring på dette målmerket',
    geo: 'nord, sør, øst, vest'
  },
  {
    type: 'tjukk l',
    desc: 'en eller annen slags forklaring på dette målmerket',
    geo: 'nord, sør, øst, vest'
  },
  {
    type: 'skarre-r',
    desc: 'en eller annen slags forklaring på dette målmerket',
    geo: 'nord, sør, øst, vest'
  },
  {
    type: 'apokope',
    desc: 'en eller annen slags forklaring på dette målmerket',
    geo: 'nord, sør, øst, vest'
  },
  {
    type: 'bløte konsonanter',
    desc: 'en eller annen slags forklaring på dette målmerket',
    geo: 'nord, sør, øst, vest'
  },
  {
    type: 'nektingsadverbet "ikke"',
    desc: 'en eller annen slags forklaring på dette målmerket',
    geo: 'nord, sør, øst, vest'
  },
  {
    type: 'personlig pronomen',
    desc: 'en eller annen slags forklaring på dette målmerket',
    geo: 'nord, sør, øst, vest'
  },
  {
    type: 'målmerke 8',
    desc: 'en eller annen slags forklaring på dette målmerket',
    geo: 'nord, sør, øst, vest'
  },
  {
    type: 'målmerke 9',
    desc: 'en eller annen slags forklaring på dette målmerket',
    geo: 'nord, sør, øst, vest'
  },
  {
    type: 'målmerke 10',
    desc: 'en eller annen slags forklaring på dette målmerket',
    geo: 'nord, sør, øst, vest'
  },
];

let dialekter = [
  'første',
  'andre',
  'tredje',
  'fjerde'
];





/* ---------- HELPERS ---------- */

function pxToNum(string) {
  // remove 'px' at the end and turn string to number
  return Number(string.slice(0, string.length - 2));
}





/* ---------- SET MAIN MARGIN TOP ---------- */

function mainTop() {
  // adjust margin top
  main.style.setProperty('--mainTop', `-${5*navHeight}px`);
}





/* ---------- SET ROW NUM ---------- */

function rowNum() {
  // adjust rows in info text
  infoDialekt.style.setProperty('--rowDialekt', `${data.length/2}`);
}





/* ---------- SET COL NUM AND ADD BUTTONS ---------- */

function colNum() {
  // adjust columns in wrapBtnsDialekt
  wrapBtnsDialekt.style.setProperty('--colDialekt', `${dialekter.length}`);

  dialekter.forEach(dialekt => {
    wrapBtnsDialekt.innerHTML += `
      <button type="button" id="btn${dialekt}" onclick="playAudio('${dialekt}')">${dialekt}</button>
    `;
  });

}





/* ---------- PLAY DIALEKT AUDIO ---------- */

function playAudio(string) {

  console.log(string);
  console.log('playAudio');

}






/* ---------- SET FOOTER MARGIN TOP ---------- */

function footerTop() {
  // hide footer from start view
  footer.style.setProperty('--footerTop', `-${2*footerHeight}px`);
}





/* ---------- DISPLAY DATA ---------- */

function insertData() {

  data.forEach(type => {
    infoDialekt.innerHTML += `
      <div class="info">
        <h2>${type.type}</h2>
        <div class="text">
          <p>
            ${type.desc}
          </p>
          <p>
            områder: <br>
            ${type.geo}
          </p>
        </div>
      </div>
    `;
  });

}





/* ---------- REGISTER FUNCTIONS ---------- */

mainTop();
rowNum();
colNum();
footerTop();

insertData();
