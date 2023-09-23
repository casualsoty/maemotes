/*  INITIALIZATIONS
 */

let dialog = '';
let scripts = '' +
  '<script ' +
    'src="modules/maemotes/scripts/get-button.js" ' +
    'type="text/javascript"></script>' +
  '<script ' +
    'src="modules/maemotes/scripts/maemote-chat-bubbles.js" ' +
    'type="text/javascript"></script>' +
  '<script ' +
    'src="modules/maemotes/scripts/render-emotes.js" ' +
    'type="text/javascript"></script>';

/*  MAIN
 */

Hooks.on('changeSidebarTab', _ => {
  if (!document.getElementById('open-maemotes-button')) {

    /*  1
     */

    document.getElementById('chat-controls').innerHTML +=
      '<style>.close-maemotes-button { display: none; }</style>' +
      '<a ' +
        'class="chat-control-icon" ' +
        'id="open-maemotes-button" ' +
        'title="' + game.i18n.localize('MAEMOTES.OpenMaemotesButtonTitle') + '">' +
        '<svg ' +
          'class="bi bi-emoji-smile-fill" ' +
          'fill="currentColor" ' +
          'height="21" ' +
          'style="position: relative; top: 3px;" ' +
          'viewBox="0 0 16 16" ' +
          'width="21" ' +
          'xmlns="http://www.w3.org/2000/svg">' +
          '<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"/>'
        '</svg>' +
      '</a>';

    /*  2
     */

    document.getElementById('open-maemotes-button').addEventListener('click', _ => {
      const FOOTER = game.user.role > 2 ? game.i18n.localize('MAEMOTES.Dialog.FooterGamemaster') : game.i18n.localize('MAEMOTES.Dialog.FooterPlayer');
      let isDialogOpen = 0;

      if (dialog) {
        dialog.close();
        isDialogOpen = 1;
      }

      dialog = new Dialog({
        buttons: { 'close-maemotes-button': _ },
        content:
          '<input ' +
            'id="maemotes-input" ' +
            'oninput="renderEmotes();" ' +
            'placeholder="' + game.i18n.localize('MAEMOTES.Dialog.InputPlaceholder') + '" ' +
            'style="margin: 0 4px 8px 4px; width: 214px;" ' +
            'type="text">' +
          '<div ' +
            'id="maemotes" ' +
            'style="display: flex; flex-wrap: wrap;"></div>' +
          '<div style="text-align: center;">' + FOOTER + '</div>' +
          scripts,
        title: game.i18n.localize('MAEMOTES.Dialog.Title'),
        close: _ => dialog = '',
        render: _ => renderEmotes(),
      }, {
        height: 294,  /* 30 + 8 + (26 + 8) + (66 * 3 + 8 * 2) + 8 */
        left: window.innerWidth - 244 - 310,
        top: window.innerHeight - 294 - 12 - 4,
        width: 244    /* (8 * 2) + (66 * 3 + 8 * 3) + 6 */
      });
      scripts = '';

      setTimeout(_ => dialog.render(true), isDialogOpen * 250);
    });
  }
});

Hooks.once('init', _ => {
  game.settings.register('maemotes', 'closeDialogWindow', {
    config: true,
    default: true,
    hint: game.i18n.localize('MAEMOTES.Settings.CloseDialogWindow.Hint'),
    name: game.i18n.localize('MAEMOTES.Settings.CloseDialogWindow.Name'),
    scope: 'client',
    type: Boolean
  });

  game.settings.register('maemotes', 'enableChatBubbles', {
    config: true,
    default: true,
    hint: game.i18n.localize('MAEMOTES.Settings.EnableChatBubbles.Hint'),
    name: game.i18n.localize('MAEMOTES.Settings.EnableChatBubbles.Name'),
    scope: 'client',
    type: Boolean
  });

  game.settings.register('maemotes', 'chatBubblesDuration', {
    config: true,
    default: 2,
    hint: game.i18n.localize('MAEMOTES.Settings.ChatBubblesDuration.Hint'),
    name: game.i18n.localize('MAEMOTES.Settings.ChatBubblesDuration.Name'),
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
    hint: game.i18n.localize('MAEMOTES.Settings.DisplayDefaultEmotes.Hint'),
    name: game.i18n.localize('MAEMOTES.Settings.DisplayDefaultEmotes.Name'),
    scope: 'client',
    type: Boolean
  });

  game.settings.register('maemotes', 'displayCustomEmotes', {
    config: true,
    default: true,
    hint: game.i18n.localize('MAEMOTES.Settings.DisplayCustomEmotes.Hint'),
    name: game.i18n.localize('MAEMOTES.Settings.DisplayCustomEmotes.Name'),
    scope: 'client',
    type: Boolean
  });
});

Hooks.once('ready', _ => {
  for (let i = 1; i < 51; i++) {
    game.settings.register('maemotes', 'customEmote' + i, {
      config: true,
      filePicker: 'image',
      hint: game.i18n.localize('MAEMOTES.Settings.CustomEmote#.Hint'),
      name: game.i18n.localize('MAEMOTES.Settings.CustomEmote#.Name') + i,
      scope: 'world',
      type: String
    });
  }
});
