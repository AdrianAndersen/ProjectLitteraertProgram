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
    year: 1525,
    text: `Da dansk avløste norsk som skriftspråk betydde det ingen stor omveltning for nordmenn flest; talemålet var dialektene, i byene med innslag av dansk, som i vekslende grad farget uttalen og ordforrådet hos de forskjellige sosiale lag. Etter 1550 vokser det frem en ny norsk litteratur med skrifter av blant andre Absalon Pederssøn Beyer, Jens Nielssøn og Peder Claussøn på et blandingsspråk av dansk under innflytelse av norsk talemål. Dette blandingsspråket er utgangspunktet for det moderne bokmål. <br><br>
Fra midten av 1600-tallet utgis enkelte skrifter på bygdemål. I 1646 utgav presten Christen Jenssøn Den Norske Dictionarium med målføreord særlig fra Sunnfjord. Det er den første norske ordboken nest etter Jens Bjelkes juridiske ordsamling fra 1634. Med Ludvig Holbergs forfatterskap synes det som oppfatningen av at skriftspråket også er nordmennenes språk, får større styrke. Holbergs skriftspråk er lett norskfarget.<br><br>
Et par ganger skrev regjeringen i København til embetsmennene også i Norge og bad dem gi opplysninger om språket i sine distrikter, første gang rundt 1700, annen gang 1743. Materialet ble delvis utnyttet av danske ordbokforfattere. Disse henvendelsene skapte interesse for norsk språk.<br><br>
Interessen fikk sterk vekst ved de undersøkelser av norsk historie og norske forhold som ble satt i gang av Gerhard Schøning og biskop Johan E. Gunnerus i Trondheim. Norsk talemål ble undersøkt kyndigere enn før (særlig av Marcus Schnabel), betydelige diktere tok norske dialekter i bruk i sin diktning (Thomas Rosing de Stockfleth, Edvard Storm). I skrift brukte nordmennene som før mange norske innslag. På den annen side kan vi i annen halvdel av 1700-tallet for første gang sikkert konstatere et talemål i Norge med en vesentlig del av grunnlaget i dansk skrift. Dette talemålet synes likevel å være brukt bare som høytidelig språk blant folk av embetsklassen.<br><br>
Begivenhetene i 1814 skapte ikke noe språkhistorisk skille på kort sikt. I § 33 i den reviderte Grunnloven av 4. nov. 1814 heter det at «Alle Forestillinger om Norske Sager, saavelsom de Expeditioner, som i Anledning deraf skee, forfattes i det Norske Sprog». Men det var et rent navnespørsmål. Språket var dansk, og det vakte en viss bitterhet i Danmark at det ble kalt noe annet i Norge. Først Henrik Wergeland la frem et program for fornorsking (1833), med forslag om norske skrivemåter som Hugg, Vilje, Haga (for Hug, Villie, Have); mer kjent er hans artikkel Om norsk Sprogreformation (skrevet 1832, trykt 1835), der han særlig rår til å ta opp målføreord for å berike skriftspråket.
`
  },
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
  },{
    year: 1840,
    text: `Det nasjonale gjennombrudd i 1840-årene førte til en språklig fornyelse på flere måter. Asbjørnsen og Moes gjenfortelling av folkeeventyrene gav grunnlaget for den nye norske prosa, som gjennomførte norsk stiltone i det tradisjonelle skriftspråket. Samtidig tok overlærer Knud Knudsen opp arbeidet for fornorsking på alle områder av språket (ordforrådet, orddannelse, bøyning, rettskrivning, uttale). Så kom fra 1848 de viktige arbeider av Ivar Aasen over det norske folkemål. På grunnlag av disse arbeidene, som viste sammenhengen mellom gammelnorsk og norske dialekter, bygde Aasen sin landsmålsnorm (første gang satt frem i Prøver af Landsmaalet i Norge, 1853). I sin normalform tok Aasen særlig hensyn til de dialekter som stod gammelnorsk nærmest så vel i bøyningsforhold som i lydforhold og ordforråd. Se også artikkel om norsk målreising. <br><br>
Aasens lansering av et norsk skriftspråk, og Wergelands og Knudsens programmer for gradvis fornorsking av det danske, førte til to konkurrerende retninger. I 1885 ble landsmålet jamstilt som offisiell språkform ved at Stortinget vedtok kirkekomiteens henstilling til regjeringen: «Regjeringen anmodes om at træffe fornøden Forføining til, at det norske Folkesprog som Skole- og officielt Sprog sidestilles med vort almindelige Skrift- og Bogsprog» («jamstillingsvedtaket»). I folkeskolen ble jamstillingen fastslått ved folkeskoleloven av 1892, som overlot til skolestyret å bestemme om landsmål eller bokmål skulle brukes som opplærings- og lærebokmål i kommunen. Ved lærerskolene ble skriftlig prøve i begge mål innført ved lov i 1902, i gymnaset i 1907.<br><br>
Fra 1900-tallet har utviklingen vært preget av de store rettskrivningsreformene: 1901 for landsmålet, 1907 for riksmålet, en mindre i 1910 for landsmål, og så for begge mål i 1917 og 1938, den siste med revisjon i 1959 og for bokmål i 1981 og 2005, foruten en del detaljrevisjoner etter forslag fra Norsk språkråd. For riksmål/bokmål har virkningen vært at det fra 1907 helt klart er et norsk skriftspråk og ikke et dansk. Der det er avvik mellom historisk skrivemåte og vanlig uttale, har begge mål nærmet seg uttalegjengivelse, og landsmål/nynorsk har gradvis tatt mer hensyn til østnorsk talemål og bydialektene.<br><br>
Helt fra begynnelsen av 1900-tallet har det vært arbeidet på å fjerne unødige forskjeller mellom de to mål. Norsk språknemnd (1952–1972) skulle fremme tilnærming mellom de to skriftmål «på norsk folkemåls grunn»; Norsk språkråd (1972–2004) skulle «støtte opp om utviklingstendenser som på lengre sikt fører målformene nærmere sammen». Om målet skulle være ett «samnorsk» skriftspråk eller ikke, og hvor snarlig det eventuelt skulle gjennomføres, har vært det store språkstridsemne i mellom- og etterkrigstiden. Reformen i bokmålet i 1981 åpnet for en rekke tradisjonelle former som var blitt stengt ute tidligere, særlig i 1938, og etter det har hovedtendensen vært konsolidering. I 2002 ble Norsk språkråds tilnærmingsparagraf opphevet av Stortinget, og i 2005 ble en del lite brukte former, særlig tilnærmingsformer, tatt ut av normalen.<br><br>
Mens det språklige reformarbeidet på 1800-tallet var sterkt preget av enkeltpersoners initiativ overfor myndigheter og publikum (I. Aasen, K. Knudsen, D.F. Knudsen, Moltke Moe med flere), har arbeidet på 1900-tallet vært drevet ved offentlig oppnevnte komiteer og private språkorganisasjoner, slik som Riksmålsforbundet (fra 1907), Noregs Mållag (fra 1906) og Landslaget for språklig samling (fra 1959). De store avgjørelsene tas nå som før av Stortinget. Motstand mot den offisielle språkpolitikken og særlig mot Norsk språknemnds mandat og arbeid førte til at språkkonservative organisasjoner på begge sider i perioder har holdt seg borte fra den offisielle språknormering og drevet privat normering på tvers av denne. For å skape «språkfred» nedsatte kirke- og undervisningsminister Helge Sivertsen Vogt-komiteen i 1964. Blant forslag fra komiteen som ble gjennomført, var opprettelsen av Norsk språkråd, som fikk bred representasjon også fra språkorganisasjonene. I 2005 ble Norsk språkråd erstattet av et mindre organ uten rådsforsamling, men med et departementsoppnevnt styre og et sekretariat, kalt Språkrådet.<br><br>
I 1929 endret Stortinget de offisielle navn på språkformene fra landsmål til nynorsk og fra riksmål til bokmål.<br><br>
Språkutviklingen i vår tid preges sterkt av tilstrømningen av lånord, særlig fra engelsk (anglisismer) og svensk (svesismer). Flytting, pendling, massemedia og andre sider ved samfunnsutviklingen bidrar til å jevne ut ulikheter i talemålet. Men store og rasktvirkende endringer i skole, arbeidsliv og så videre har skapt større språklig ulikhet mellom eldre og yngre, yrkesaktive og ikke-yrkesaktive. Språket i massemedia og administrasjon øver sterkere innflytelse på språksamfunnet som helhet i vår tid enn frem til om lag 1900. Tendensen til at komplisert fagspråk «invaderer» allmennspråket, særlig i trykte, eterbaserte og digitale media, blir balansert av enklere strukturer, for eksempel i form av kortere setninger og en mindre komplisert setningsbygning.<br><br>
`
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
  main.style.setProperty('--mainTop', `-${20*navHeight}px`);
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
