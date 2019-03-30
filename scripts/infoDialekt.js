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
    fylker: "Aust-Agder, Vest-Agder, Rogaland, Sogn og Fjordane, Møre og Romsdal",
    tjukkL: "Nei, bortsett fra noen områder i Møre og Romsdal",
    palatalisering: "Nei, bortsett fra området nord for Sognefjorden",
    infinitiv: "E-infinitiv i Agder og i Møre og Romsdal og A-infinitiv i Rogaland og Hordaland",
    personligePronomen: "Mest \"eg/e/i\" i entall og \"me/mi\" i flertall",
    svakeHunkjonnsord: "Mest -o/-å (eks. \"klokkå\"), men en del -a i Agder og S og Fj",
    sterkeHunkjonnsord: "Svært blandet. -a i sør og nord (eks. \"boka\"). Ellers -o/-å (kysten) eller -e/-i/-æ/-ei (innlandet)",
    skarreR: "Ja, bortsett fra området nord for Sognefjordane",
    bloteKonsonanter: "Ja, på Agderkysten og i det meste av Rogaland. Ellers harde kons."
  },
  {
    type: 'østlandsk',
    fylker: "Telemark, Vestfold, Østfold, Akershus, Buskerud, Oppland, Hedmark",
    tjukkL: "Ja, bortsett fra Vest-Telemark",
    palatalisering: "Nei, bortsett fra Hedmark og nordlige Oppland",
    infinitiv: "Kløyvd infinitiv. a-ending i noen verb. e-ending i de andre.",
    personligePronomen: "Lavlandet har mest \"jeg/je\" og \"vi/ve\". Fjellbygdene i vest følger Vestlandsk. Nordlige Oppland har flertall \"oss\".",
    svakeHunkjonnsord: "Bare -a (eks. \"klokka\")",
    sterkeHunkjonnsord: "Mest -a, men -e/-i/-æ/-ei i fjellbygdene i vest.",
    skarreR: "Nei",
    bloteKonsonanter: "Nei"
  },
  {
    type: 'trøndsk',
    fylker: "Møre og Romsdal, Sør-Trøndelag, Nord-Trøndelag",
    tjukkL: "Ja",
    palatalisering: "Ja",
    infinitiv: "Kløyvd infinitiv. a- eller å-ending i noen verb. Ingen ending i de andre (apokope).",
    personligePronomen: "Svært vekslende",
    svakeHunkjonnsord: "Mest -a, men noe -o/-å på kysten sør for Trondh.fjorden",
    sterkeHunkjonnsord: "Bare -a",
    skarreR: "Nei",
    bloteKonsonanter: "Nei"
  },
  {
    type: 'nordnorsk',
    fylker: "Nordland, Troms, Finnmark",
    tjukkL: "Nei, bortsett fra i det meste av Nordland og i Bardu og Målselv",
    palatalisering: "Ja",
    infinitiv: "E-infinitiv, men ending forsvinner i alle eller de fleste verb i Nordland. Kløyvd inf. i Bardu og Målselv.",
    personligePronomen: "Mest \"æg/æ\" i entall og \"vi/ve\" i flertall",
    svakeHunkjonnsord: "Mest -a, bortsett fra Nordland hvor det veksler svært.",
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
      <div class="centerV side">
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





/* ---------- INSERT DATA ---------- */

function insertMainData() {

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


  for (let i = 1; i <= allDialektMainColsArr.length; i++) {

    for (let k = 1; k < allUniqueProps.length; k++) {

      property = allUniqueProps[k];

      // this ain't quite right, but it works
      function getPropVal(string) {
        switch (string) {
          case 'type':
            allDialektMainColsArr[i].innerHTML += `
              <div class="colPart">
                <p>${data[i].type}</p>
              </div>
            `;
            break;
          case 'fylker':
            allDialektMainColsArr[i].innerHTML += `
              <div class="colPart">
                <p>${data[i].fylker}</p>
              </div>
            `;
            break;
          case 'tjukkL':
            allDialektMainColsArr[i].innerHTML += `
              <div class="colPart">
                <p>${data[i].tjukkL}</p>
              </div>
            `;
            break;
          case 'palatalisering':
            allDialektMainColsArr[i].innerHTML += `
              <div class="colPart">
                <p>${data[i].palatalisering}</p>
              </div>
            `;
            break;
          case 'infinitiv':
            allDialektMainColsArr[i].innerHTML += `
              <div class="colPart">
                <p>${data[i].infinitiv}</p>
              </div>
            `;
            break;
          case 'personligePronomen':
            allDialektMainColsArr[i].innerHTML += `
              <div class="colPart">
                <p>${data[i].personligePronomen}</p>
              </div>
            `;
            break;
          case 'svakeHunkjonnsord':
            allDialektMainColsArr[i].innerHTML += `
              <div class="colPart">
                <p>${data[i].svakeHunkjonnsord}</p>
              </div>
            `;
            break;
          case 'sterkeHunkjonnsord':
            allDialektMainColsArr[i].innerHTML += `
              <div class="colPart">
                <p>${data[i].sterkeHunkjonnsord}</p>
              </div>
            `;
            break;
          case 'skarreR':
            allDialektMainColsArr[i].innerHTML += `
              <div class="colPart">
                <p>${data[i].skarreR}</p>
              </div>
            `;
            break;
          case 'bloteKonsonanter':
            allDialektMainColsArr[i].innerHTML += `
              <div class="colPart">
                <p>${data[i].bloteKonsonanter}</p>
              </div>
            `;
            break;
          default:
            return true;
        }
      }

      getPropVal(property);

    }
  }


  console.log('insertMainData');

}





/* ---------- ADJUST SIDE ---------- */

function styleTableSide() {

  let aColPart = document.getElementsByClassName('colPart')[0];
  let acolPartCompHeight = window.getComputedStyle(aColPart).height;
  let aColPartHeight = pxToNum(acolPartCompHeight);

  let allSides = Array.from(document.getElementsByClassName('side'));


  allSides.forEach(div => {
    div.style.setProperty('--sideHeight', `${aColPartHeight}px`);
  });

  console.log(allSides);

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

// styleTableSide();
