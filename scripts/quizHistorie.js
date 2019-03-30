// jshint esversion: 6

/* ---------- SET MARGIN FOR MAIN AND FOOTER ---------- */

function pxToNum(string) {
    // remove 'px' at the end and turn string to number
    return Number(string.slice(0, string.length - 2));
}

function mainTop() {
    let nav = document.querySelector('nav');
    let main = document.querySelector('main');

    let navCompHeight = window.getComputedStyle(nav).height;
    let navHeight = pxToNum(navCompHeight);

    // adjust margin top
    main.style.setProperty('--mainTop', `${1 * navHeight}px`);
}

function footerTop() {
    let footer = document.querySelector('footer');

    let footerCompHeight = window.getComputedStyle(footer).height;
    let footerHeight = pxToNum(footerCompHeight);

    // hide footer from start view
    footer.style.setProperty('--footerTop', `-${0.56 * footerHeight}px`);
}

mainTop();
footerTop();
