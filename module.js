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
    document.getElementById('chat-controls').innerHTML +=
      '<style>.close-maemotes-button { display: none; }</style>' +
      '<a ' +
        'class="chat-control-icon" ' +
        'data-tooltip="' + game.i18n.localize('MAEMOTES.OpenMaemotesButtonTitle') + '"' +
        'id="open-maemotes-button" ' +
        'style="align-items: center; display: flex; font-size: 20px;">' +
        '<i class="' + (game.settings.get('maemotes', 'alternativeButtonIcon') ? 'fa-frog' : 'fa-face-smile') + ' fa"></i>'
      '</a>';

    document.getElementById('open-maemotes-button').addEventListener('click', _ => {
      const FOOTER = game.user.isGM ? game.i18n.localize('MAEMOTES.Dialog.FooterGamemaster') : game.i18n.localize('MAEMOTES.Dialog.FooterPlayer');
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
  } else {
    $('#open-maemotes-button i').removeClass(['fa-face-smile', 'fa-frog']).addClass(game.settings.get('maemotes', 'alternativeButtonIcon') ? 'fa-frog' : 'fa-face-smile');
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

  game.settings.register('maemotes', 'alternativeButtonIcon', {
    config: true,
    default: false,
    hint: game.i18n.localize('MAEMOTES.Settings.AlternativeButtonIcon.Hint'),
    name: game.i18n.localize('MAEMOTES.Settings.AlternativeButtonIcon.Name'),
    scope: 'client',
    type: Boolean
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
