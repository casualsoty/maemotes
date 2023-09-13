import { openMaemotes } from './scripts/openMaemotes.js';

Hooks.on('changeSidebarTab', _ => {
  if (!document.getElementById('maemotes-upload-button')) {
    console.log(window.getComputedStyle(document.getElementsByClassName('control-buttons')[0]).flex);
    const FLEX = window.getComputedStyle(document.getElementsByClassName('control-buttons')[0]).flex.split(' ')[2];
    document.getElementsByClassName('control-buttons')[0].style.flex = '0 0 ' + (parseInt(FLEX.substring(0, FLEX.length - 2)) + 24) + 'px';
    document.getElementsByClassName('control-buttons')[0].innerHTML +=
      '<a id="maemotes-upload-button">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-emoji-smile-fill" viewBox="0 0 16 16" style="position: relative; top: 3px;">' +
      '<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"/>'
      '</svg>' +
      '</a>';
      document.getElementById('maemotes-upload-button').addEventListener('click', _ => openMaemotes());
  }
});
