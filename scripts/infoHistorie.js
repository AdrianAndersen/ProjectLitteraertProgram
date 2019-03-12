// JavaScript source code
// jshint esversion: 6

/* ---------- DOM ---------- */

let nav = document.querySelector('nav');

let main = document.querySelector('main');
let mainInfo = document.querySelector('#mainInfo');

let footer = document.querySelector('footer');





/* ---------- GET CSS VALUES ---------- */

let navCompHeight = window.getComputedStyle(nav).height;
let navHeight = pxToNum(navCompHeight);

let footerCompHeight = window.getComputedStyle(footer).height;
let footerHeight = pxToNum(footerCompHeight);





/* ---------- DATA ---------- */

let data = [
  {
    year: 1900,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat elementum magna id hendrerit. Sed rutrum varius turpis a blandit. Nam consectetur purus sem, a volutpat urna sodales aliquam. Vivamus ultricies metus congue diam tristique, accumsan varius arcu imperdiet.'
  },
  {
    year: 1900,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat elementum magna id hendrerit. Sed rutrum varius turpis a blandit. Nam consectetur purus sem, a volutpat urna sodales aliquam. Vivamus ultricies metus congue diam tristique, accumsan varius arcu imperdiet.'
  },
  {
    year: 1900,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat elementum magna id hendrerit. Sed rutrum varius turpis a blandit. Nam consectetur purus sem, a volutpat urna sodales aliquam. Vivamus ultricies metus congue diam tristique, accumsan varius arcu imperdiet.'
  },
  {
    year: 1900,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat elementum magna id hendrerit. Sed rutrum varius turpis a blandit. Nam consectetur purus sem, a volutpat urna sodales aliquam. Vivamus ultricies metus congue diam tristique, accumsan varius arcu imperdiet.'
  },
  {
    year: 1900,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat elementum magna id hendrerit. Sed rutrum varius turpis a blandit. Nam consectetur purus sem, a volutpat urna sodales aliquam. Vivamus ultricies metus congue diam tristique, accumsan varius arcu imperdiet.'
  },
];





/* ---------- HELPERS ---------- */

function pxToNum(string) {
  // remove 'px' at the end and turn string to number
  return Number(string.slice(0, string.length - 2));
}





/* ---------- SET MAIN MARGIN TOP ---------- */

function mainTop() {
  // adjust margin top
  main.style.setProperty('--mainTop', `${2*navHeight}px`);
}





/* ---------- SET COL NUM ---------- */

function colNum() {
  // adjust columns in info text
  mainInfo.style.setProperty('--rowNum', `${data.length}`);
}





/* ---------- SET FOOTER MARGIN TOP ---------- */

function footerTop() {
  // hide footer from start view
  footer.style.setProperty('--footerTop', `-${4*footerHeight}px`);
}





/* ---------- DISPLAY DATA ---------- */

function insertData() {

  data.forEach(data => {
    mainInfo.innerHTML += `
    <div class="num">
      <div class="wrapNum">
        ${data.year}
      </div>
    </div>
    <div class="text">
      <p>
        ${data.text}
      </p>
    </div>
    `;
  });

  console.log('insertData');

}





/* ---------- REGISTER FUNCTIONS ---------- */

mainTop();
colNum();
footerTop();

insertData();
