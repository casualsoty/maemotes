/*  EVENT LISTENERS
 */

Hooks.on('changeSidebarTab', _ => {
  if (!document.getElementById('open-maemotes-button')) {

    /*  1
     */

    const FLEX = window.getComputedStyle(document.getElementsByClassName('control-buttons')[0]).flex.split(' ')[2];

    document.getElementsByClassName('control-buttons')[0].style.flex = '0 0 ' + (parseInt(FLEX.substring(0, FLEX.length - 2)) + 24) + 'px';
    document.getElementsByClassName('control-buttons')[0].innerHTML +=
      '<style>.close-maemotes-button { display: none; }</style>' +
      '<a id="open-maemotes-button">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-emoji-smile-fill" viewBox="0 0 16 16" style="position: relative; top: 3px;">' +
      '<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"/>'
      '</svg>' +
      '</a>';

    /*  2
     */

    document.getElementById('open-maemotes-button').addEventListener('click', _ => {
      new Dialog({
        buttons: { 'close-maemotes-button': _ },
        content:
          '<div ' +
            'id="maemotes" ' +
            'style="align-content: space-between; display: flex; flex-wrap: wrap; justify-content: space-between;"></div>' +
          '<div style="text-align: center;">You can add more of your own emotes in the settings! 🐸</div>',
        render: _ => {
          if (game.settings.get('maemotes', 'displayDefaultEmotes')) {
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
            ].forEach(artwork => document.getElementById('maemotes').innerHTML += getButton('modules/maemotes/artwork/default/' + artwork));
          }

          if (game.settings.get('maemotes', 'displayCustomEmotes')) {
            for (let i = 1; i < 3; i++) {
              if (game.settings.get('maemotes', 'customEmote' + i)) {
                document.getElementById('maemotes').innerHTML += getButton(game.settings.get('maemotes', 'customEmote' + i))
              }
            }
          }
        },
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

Hooks.once('init', _ => {
  game.settings.register('maemotes', 'closeDialogWindow', {
    config: true,
    default: true,
    hint: 'Configure whether or not the dialog window will be closed after sending an emote.',
    name: 'Close Dialog Window',
    scope: 'client',
    type: Boolean
  });

  game.settings.register('maemotes', 'enableChatBubbles', {
    config: true,
    default: true,
    hint: 'Configure whether or not chat bubbles will be displayed above Tokens for emote type chat messages.',
    name: 'Enable Chat Bubbles',
    scope: 'client',
    type: Boolean
  });

  game.settings.register('maemotes', 'chatBubblesDuration', {
    config: true,
    default: 2,
    hint: 'Determine the length of time in seconds for which to display an emote chat bubble.',
    name: 'Chat Bubbles Duration',
    range: {
      max: 20,
      min: 1,
      step: 1
    },
    scope: 'client',
    type: Number
  });

  game.settings.register('maemotes', 'displayDefaultEmotes', {
    config: true,
    default: true,
    hint: 'Configure whether or not default emotes will be displayed in the dialog window.',
    name: 'Display Default Emotes',
    scope: 'client',
    type: Boolean
  });

  game.settings.register('maemotes', 'displayCustomEmotes', {
    config: true,
    default: true,
    hint: 'Configure whether or not custom emotes will be displayed in the dialog window.',
    name: 'Display Custom Emotes',
    scope: 'client',
    type: Boolean
  });
});

Hooks.once('ready', _ => {
  game.settings.register('maemotes', 'customEmote1', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #1',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote2', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #2',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote3', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #3',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote4', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #4',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote5', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #5',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote6', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #6',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote7', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #7',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote8', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #8',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote9', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #9',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote10', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #10',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote11', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #11',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote12', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #12',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote13', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #13',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote14', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #14',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote15', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #15',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote16', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #16',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote17', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #17',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote18', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #19',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote19', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #19',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote20', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #20',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote21', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #21',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote22', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #22',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote23', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #23',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote24', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #24',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote25', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #25',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote26', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #26',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote27', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #27',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote28', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #28',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote29', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #29',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote30', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #30',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote31', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #31',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote32', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #32',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote33', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #33',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote34', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #34',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote35', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #35',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote36', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #36',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote37', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #37',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote38', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #38',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote39', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #39',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote40', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #40',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote41', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #41',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote42', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #42',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote43', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #43',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote44', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #44',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote45', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #45',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote46', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #46',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote47', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #47',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote48', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #48',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote49', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #49',
    scope: 'world',
    type: String
  });
  
  game.settings.register('maemotes', 'customEmote50', {
    config: true,
    filePicker: 'image',
    hint: 'It is recommended to upload your images to the "custom" folder located in "modules/maemotes/artwork", e.g. "modules/maemotes/artwork/custom/emote.png".',
    name: 'Custom Emote #50',
    scope: 'world',
    type: String
  });
});

/*  FUNCTIONS
 */

const getButton = file => {
  return '' +
    '<button ' +
      'onclick="' +
        'class MaemoteChatBubbles extends ChatBubbles {' +
          'constructor(...args) {' +
            'super(...args);'+
          '}' +

          '_getDuration(html) {' +
            'return game.settings.get(\'maemotes\', \'chatBubblesDuration\') * 1000;' +
          '}' +
        '}' +

        'ChatMessage.create({' +
          'content: \'<img src=' + file + ' style=border:0;max-height:64px;max-width:64px; title=' + file.split('/')[file.split('/').length - 1].split('.')[0] + '>\',' +
          'speaker: ChatMessage.getSpeaker()' +
        '});' +

        'if (canvas.tokens.controlled[0] && game.settings.get(\'maemotes\', \'enableChatBubbles\')) {' +
          'new MaemoteChatBubbles().broadcast(canvas.tokens.controlled[0], \'<img src=' + file + ' style=border:0;max-height:64px;max-width:64px;>\');' +
        '}' +

        'if (game.settings.get(\'maemotes\', \'closeDialogWindow\')) {' +
          'document.getElementsByClassName(\'close-maemotes-button\')[0].click()' +
        '};" ' +
      'style="height: 66px; margin: 0 0 8px 0; padding: 0; width: 66px" ' +
      'title="">' +
      '<img ' +
        'src="' + file + '" ' +
        'style="border: 0; max-height: 64px; max-width: 64px;" ' +
        'title="' + file.split('/')[file.split('/').length - 1].split('.')[0] + '">' +
    '</button>';
}

//  TODOS:
//    [X] Close Dialog Window setting
//    [X] Enable Chat Bubbles setting
//    [X] Chat Bubbles Duration setting
//    [X] Custom emote uploader
//    [ ] Emote favourites
//    [ ] Search bar
