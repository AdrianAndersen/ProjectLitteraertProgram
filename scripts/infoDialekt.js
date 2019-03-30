// JavaScript source code
// jshint esversion: 6

/* ---------- DOM ---------- */

let nav = document.querySelector('nav');

let main = document.querySelector('main');

let infoDialekt = document.querySelector('#infoDialekt');
let dialektHead = document.querySelector('#dialektHead');
let dialektSide = document.querySelector('#dialektSide');
let dialektMain = document.querySelector('#dialektMain');
let allDialektMainCols = Array.from(document.getElementsByClassName('dialektMainCol'));

let wrapBtnsDialekt = document.querySelector('#wrapBtnsDialekt');

let footer = document.querySelector('footer');

let allDialektMainColsArr;





/* ---------- GET CSS VALUES ---------- */

let navCompHeight = window.getComputedStyle(nav).height;
let navHeight = pxToNum(navCompHeight);

let footerCompHeight = window.getComputedStyle(footer).height;
let footerHeight = pxToNum(footerCompHeight);





/* ---------- DATA ---------- */

// empty object at start
let data = [
  {
    type: '',
    fylker: '',
    tjukkL: '',
    palatalisering: '',
    infinitiv: '',
    personligePronomen: '',
    svakeHunkjonnsord: '',
    sterkeHunkjonnsord: '',
    skarreR: '',
    bloteKonsonanter: ''
  },
  {
    type: 'vestlandsk',
    fylker: ["Aust-Agder", "Vest-Agder", "Rogaland", "Sogn og Fjordane", "Møre og Romsdal"],
    tjukkL: "Nei\n" + "Bortsett fra noen områder i Møre og Romsdal",
    palatalisering: "Nei\n" + "Bortsett fra området nord for Sognefjorden",
    infinitiv: "E-infinitiv i Agder og i Møre og Romsdal" + "A-infinitiv i Rogaland og Hordaland",
    personligePronomen: "Mest \"eg/e/i\" i entall \n" +
    "og \"me/mi\" i flertall",
    svakeHunkjonnsord: "Mest -o/-å \n" +
    "(eks:: \"klokkå\")\n" +
    "Men en del -a i Agder og S og Fj\n",
    sterkeHunkjonnsord: "Svært blandet.\n" +
    "-a i sør og nord (\"eks.: \"boka\")\n" +
    "Ellers -o/-å (kysten) \n" +
    "eller -e/-i/-æ/-ei (innlandet)",
    skarreR: "Ja.\n" +
    "Minus området nord for Sognefjordane",
    bloteKonsonanter: "Ja,\n" +
    "på Agderkysten og i det meste av Rogaland. \n" +
    "Ellers harde kons."
  },
  {
    type: 'østlandsk',
    fylker: ["Telemark", "Vestfold", "Østfold", "Akershus", "Buskerud", "Oppland", "Hedmark"],
    tjukkL: "Ja\n" + "Bortsett fra Vest-Telemark",
    palatalisering: "Nei\n" + "Bortsett fra Hedmark og nordlige Oppland",
    infinitiv: "Kløyvd infinitiv\n" +
    "a-ending i noen verb.\n" +
    "e-ending i de andre.",
    personligePronomen: "Lavlandet har mest \"jeg/je\" og \"vi/ve\"\n" +
    "Fjellbygdene i vest følger Vestlandsk.\n" +
    "Nordlige Oppland har flertall \"oss\".",
    svakeHunkjonnsord: "Bare -a (eks.: \"klokka\")",
    sterkeHunkjonnsord: "Mest -a.\n" +
    "Men -e/-i/-æ/-ei i fjellbygdene i vest.",
    skarreR: "Nei",
    bloteKonsonanter: "Nei"
  },
  {
    type: 'trøndsk',
    fylker: ["Møre og Romsdal", "Sør-Trøndelag", "Nord-Trøndelag"],
    tjukkL: "Ja",
    palatalisering: "Ja",
    infinitiv: "Kløyvd infinitiv\n" +
    "a- eller å-ending i noen verb.\n" +
    "Ingen ending i de andre (apokope).",
    personligePronomen: "Svært vekslende",
    svakeHunkjonnsord: "Mest -a\n" +
    "Men noe -o/-å på kysten sør for Trondh.fjorden",
    sterkeHunkjonnsord: "Bare -a",
    skarreR: "Nei",
    bloteKonsonanter: "Nei"
  },
  {
    type: 'nordnorsk',
    fylker: ["Nordland", "Troms", "Finnmark"],
    tjukkL: "Nei\n" +
    "Bortsett fra i det meste av Nordland og i Bardu og Målselv",
    palatalisering: "Ja",
    infinitiv: "E-infinitiv.\n" +
    "Men ending forsvinner i alle eller de fleste verb i Nordland.\n" +
    "Kløyvd inf. i Bardu og Målselv.",
    personligePronomen: "Mest \"æg/æ\" i entall\n" +
    "og \"vi/ve\" i flertall",
    svakeHunkjonnsord: "Mest -a\n" +
    "Minus Nordland hvor det veksler svært.",
    sterkeHunkjonnsord: "Bare -a",
    skarreR: "Nei",
    bloteKonsonanter: "Nei"
  }
];

let merker = [
  `fylker`,
  `tjukk l`,
  `palatalisering`,
  `infinitiv`,
  `personlig \n pronomen`,
  `svake \n hunkjønnsord`,
  `sterke \n hunkjønnsord`,
  `skarre-r`,
  `bløte \n konsonanter`
];

// get array of object entries
let arrKeys = Object.keys(data[0]);

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

/*
function rowNum() {
  // adjust rows in info text
  infoDialekt.style.setProperty('--rowDialekt', `${data.length/2}`);
}
*/





/* ---------- SET GRID FOR DIALEKT INFO ---------- */

function infoDialektGrid() {

  // style css grid
  infoDialekt.style.setProperty('--rowDialekt', `${merker.length}`);
  infoDialekt.style.setProperty('--colDialekt', `${data.length}`);

  dialektSide.style.setProperty('--rowDialekt', `${merker.length}`);

  dialektHead.style.setProperty('--colDialekt', `${data.length}`);

  dialektMain.style.setProperty('--colDialekt', `${data.length}`);


  for (let i = 0; i < allDialektMainCols.length; i++) {
    allDialektMainCols[i].style.setProperty('--rowDialekt', `${merker.length}`);
  }

}





/* ---------- INSERT DATA ---------- */

function insertDialektSide() {

  data.forEach(elem => {
    // table head
    dialektHead.innerHTML += `
      <div class="centerAll">
        <h4>${elem.type}</h4>
      </div>
    `;

    // table main
    dialektMain.innerHTML += `
      <div class="dialektMainCol"></div>
    `;
  });


  // table side
  merker.forEach(merke => {
    dialektSide.innerHTML += `
      <div class="centerV">
        <h5>${merke}</h5>
      </div>
    `;
  });

  allDialektMainColsArr = Array.from(document.getElementsByClassName('dialektMainCol'));

  console.log('insertDialektData');

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





/* ---------- GET SPECIFIC DATA ---------- */

function getPropVal(obj, prop) {
  return obj.prop;
}





/* ---------- INSERT DATA ---------- */

function insertMainData() {

  let object;
  let property;

  let allProps = [];
  let allUniqueProps = [];


  allDialektMainColsArr.forEach(col => {
    for (let property in data[0]) {
      // collect all properties from all objects in data (array)
      allProps.push(property);
    }
  });

  // Remove duplicates automatically with Set
  allUniqueProps = [...new Set(allProps)];

  // let allColParts = Array.from(document.getElementsByClassName('colPart'));

  // console.log(allDialektMainColsArr);
  console.log(allUniqueProps);
  // console.log(allColParts);

  for (let i = 1; i <= allDialektMainColsArr.length; i++) {

    object = data[i];
    console.log(object);

    for (let k = 1; k < allUniqueProps.length; k++) {

      property = allUniqueProps[k];

      let info = getPropVal(object, property);

      allDialektMainColsArr[i].innerHTML += `
        <div class="colPart">
          <p>${object}</p>
        </div>
      `;

    }
  }

  /*
  allDialektMainColsArr.forEach(col => {
    data.forEach(area => {
      for (let property in area) {
        col.innerHTML += `
          <div class="text">
            <p>${area[property]}</p>
          </div>
        `;
      }
    });
  });
  */

  /*
  for (let i = 1; i < array.length; i++) {
    array[i];
  }
  */

  console.log('insertMainData');

}





/* ---------- REGISTER FUNCTIONS ---------- */

mainTop();
// rowNum();
infoDialektGrid();
colNum();
footerTop();

// insertData();
insertDialektSide();
insertMainData();
