/*  INITIALIZATIONS
 */

let buttons = '';
let token = '';

/*  CLASSES
 */

class MaemoteChatBubbles extends ChatBubbles {
  constructor(...args) {
    super(...args);
  }

  _getDuration() {
    return 5000;
  }
}

/*  FUNCTIONS
 */

const getFolder = async dirname => {
  try {
    const SEARCH = await fetch('https://api.sirv.com/v2/files/search', {
      body: JSON.stringify({ "query": "dirname:\\/" + dirname + " AND -dirname:\\/.Trash" }),
      headers: {
        'authorization': 'Bearer' + token,
        'content-type': 'application/json'
      },
      method: 'POST'
    });
    return await SEARCH.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

/*  EVENT LISTENERS
 */

Hooks.once('init', _ => {
  game.settings.register('maemotes', 'closeDialogWindow', {
    config: 'true',
    default: true,
    hint: 'Configure whether or not the dialog window will be closed after sending an emote.',
    name: 'Close Dialog Window',
    scope: 'client',
    type: Boolean
  });

  game.settings.register('maemotes', 'enableChatBubbles', {
    config: 'true',
    default: true,
    hint: 'Configure whether or not chat bubbles will be displayed above Tokens for maemote type chat messages.',
    name: 'Enable Chat Bubbles',
    scope: 'client',
    type: Boolean
  });
});

Hooks.on('changeSidebarTab', _ => {
  if (!document.getElementById('open-maemotes-button')) {
    const FLEX = window.getComputedStyle(document.getElementsByClassName('control-buttons')[0]).flex.split(' ')[2];

    document.getElementsByClassName('control-buttons')[0].style.flex = '0 0 ' + (parseInt(FLEX.substring(0, FLEX.length - 2)) + 24) + 'px';
    document.getElementsByClassName('control-buttons')[0].innerHTML +=
      '<a id="open-maemotes-button">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-emoji-smile-fill" viewBox="0 0 16 16" style="position: relative; top: 3px;">' +
      '<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"/>'
      '</svg>' +
      '</a>';
    
    document.getElementById('open-maemotes-button').addEventListener('click', _ => {
      if (!token) {
        fetch('https://api.sirv.com/v2/token', {
          body: JSON.stringify({
            "clientId": 'UvKYoTOfdlCClPyBnRqgPrL6ohE',
            "clientSecret": 'Bv8hU0Vx8YkFnMd4Eu+8GQCmspKDK8zfBuhUHPk95bIRIF3aZQ/cvaSTH+AvDMZFGdMf2pfQ5uyrI0Ax4vYa6A=='
          }),
          headers: { 'content-type': 'application/json' },
          method: 'POST'
        }).then(r => r.json()).then(r => token = r.token);

        setTimeout(token = '', 1200000);
      }

      [
        'maegamba.png',
        'maejam.png',
        'maelmao.png',
        'maelove.png',
        'maeoopsie.png',
        'maevil.png',
        'maewhat.png',
        'Maeyaya.gif',
        'quemae.png',
        'rosebedge.png',
        'roseeyes.png',
        'rosehmm.png',
        'rosesmile.png',
        'roseupside_down.png',
        'roseweary.png'
      ].forEach(artwork => {
        buttons +=
          '<button ' +
            'onclick="' +
              'ChatMessage.create({' +
                'content: \'<img src=https://raw.githubusercontent.com/casualsoty/maemotes/main/artwork/' + artwork + ' style=border:0;width:64px; title=' + artwork.substring(0, artwork.length - 4) + '>\',' +
                'speaker: ChatMessage.getSpeaker()' +
              '});' +
              'if (canvas.tokens.controlled[0] && game.settings.get(\'maemotes\', \'enableChatBubbles\')) {' +
                'new MaemoteChatBubbles().broadcast(canvas.tokens.controlled[0], \'<img src=https://raw.githubusercontent.com/casualsoty/maemotes/main/artwork/' + artwork + ' style=border:0;width:64px;>\', );' +
              '}' +
              'if (game.settings.get(\'maemotes\', \'closeDialogWindow\')) {' +
                'document.getElementsByClassName(\'close-maemotes-button\')[0].click()' +
              '};" ' +
            'style="height: 66px; margin: 0 0 8px 0; padding: 0; width: 66px" ' +
            'title="' + artwork.substring(0, artwork.length - 4) + '">' +
            '<img ' +
              'src="https://raw.githubusercontent.com/casualsoty/maemotes/main/artwork/' + artwork + '" ' +
              'style="border: 0; width: 64px;">' +
          '</button>';
      });

      //console.log(token);
      //console.log(getFolder('Maemotes'));

      new Dialog({
        buttons: { 'close-maemotes-button': _ },
        content:
          '<script src="maemotes.js"></script>' +
          '<style>.close-maemotes-button { display: none; }</style>' +
          '<div style="align-content: space-between; display: flex; flex-wrap: wrap; justify-content: space-between;">' + buttons + '</div>' +
          '<div style="text-align: right;">🐸</div>',
        title: "Maemotes",
      }, {
        height: 260,  /* (66 * 3 + 8 * 2) + 30 + (8 * 2) */
        left: window.innerWidth - 236 - 310,
        top: window.innerHeight - 260 - 12 - 4,
        width: 236    /* (66 * 3 + 8 * 2) + (8 * 2) + 6 */
      }).render(true);
    });
  }
});

//  TODOS:
//    [X] Close Dialog Window setting
//    [X] Enable Chat Bubbles setting
//    [ ] Chat bubbles duration setting
//    [ ] Favourites
//    [ ] File and folder uploader
//    [ ] Search bar
