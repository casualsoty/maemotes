const getButton = file => {
  return '' +
    '<button ' +
      'onclick="' +
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
      'style="height: 66px; margin: 0 4px 8px 4px; padding: 0; width: 66px">' +
      '<img ' +
        'src="' + file + '" ' +
        'style="border: 0; max-height: 64px; max-width: 64px;" ' +
        'title="' + file.split('/')[file.split('/').length - 1].split('.')[0] + '">' +
    '</button>';
}
