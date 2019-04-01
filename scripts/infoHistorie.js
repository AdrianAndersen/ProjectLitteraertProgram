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
    year: "1350 - 1905",
    text: `<ul><li>1350: Svartedauden, norsk skriftspråk dør ut</li>
<li>1380: Union med Danmark</li>
<li>1500-tallet: Dansk bibel og dansk kirkepråk i Norge</li>
<li>1814: Unionen oppløses, men dansk fortsatt skriftspråk</li>
<li>1830: Språkdebatt, Wergeland tar til orde for fornorsking</li>
<li>1840-tallet: Asbjørnsen og Moes Norske folkeeventyr</li>
<li>1850: Ivar Aasen gir ut Ordbog over det norske Folkesprog</li>
<li>1862: Knud Knudsens forslag til fornorsking vedtatt</li>
<li>1885: "Landsmål" (nynorsk) likestilles med dansk-norsken</li>
<li>1905: Unionen med Sverige oppløses</li></ul>`
  },
  {
    year: 1907,
    text: `rettskrivingsreform – riksmål (bløte konsonanter fjernes) <br>` +
        `<ul><li>sidemålsstilen – alle skal beherske begge målformer </li>
        <li>Norsk Riksmålsforbund stiftes – kamporganisasjon. </li></ul> <p><br>Første rettskrivningsreform, dansk-norsken får navnet "riksmål"</p>`
  },
  {
    year: 1917,
    text: ` tilnærming + fornorsking + samnorsk <br> <ul>
 <li>rettskrivingsreform – mere valgfrihet, men ingen valgte annerledes – for stor individuell frihet</li>
 <ul>
 <li>begge kan bruke hokjønnsbøying eller felleskjønn (hankjønn) → valgfrihet</li>
 <li>før: større forskjell mellom målene</li>
 <li>dansken mykes opp – mer fornorsking</li>
</ul></ul>
`
  },
  {
    year: 1938,
    text: `tilnærming + fornorsking – samnorsk
    <ul><li>radikal reform – fellesform blir obligatoriske</li>
    <li>begge parter ble sinte på samnorsken – ingen ville ha det – sterke protester</li>
    </ul>
`
  },
  {
    year: 1970,
    text: `dialektbølge
    <ul><li>mindre bruk av høflighetsformer</li>
    <li>arbeiderbevegelsen sto sterkt</li>
    <li>“skriv nynorsk; snakk dialekt” – folkelig</li>
    </ul>

`
  },
  {
    year: 1972,
    text: `Norsk språkråd opprettet. Samnorsktanken forlates og språkstriden stilner
`
  },
  {
    year: 1981,
    text: `tilnærming stopper – språket er som i 1917
    <ul><li>samnorsk stoppes</li>
    <li>tillatt med mer konservative former: -en</li>
    <li>valgfrihet mellom en-/a-ending</li></ul>
    <p><br>  Ny nynorskreform der en del konservative former går ut</p>
`
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
  main.style.setProperty('--mainTop', `${navHeight}px`);
}





/* ---------- SET ROW NUM ---------- */

function rowNum() {
  // adjust columns in info text
  mainInfo.style.setProperty('--rowNum', `${data.length}`);
}





/* ---------- SET FOOTER MARGIN TOP ---------- */

function footerTop() {
  // hide footer from start view
  footer.style.setProperty('--footerTop', `-${2*footerHeight}px`);
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
rowNum();
footerTop();

insertData();
