const renderEmotes = _ => {
  document.getElementById('maemotes').innerHTML = '';

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
    ].forEach(artwork => {
      if (artwork.split('.')[0].includes(document.getElementById('maemotes-input').value)) {
        document.getElementById('maemotes').innerHTML += getButton('modules/maemotes/artwork/default/' + artwork)
      }
    });
  }

  if (game.settings.get('maemotes', 'displayCustomEmotes')) {
    for (let i = 1; i < 51; i++) {
      if (game.settings.get('maemotes', 'customEmote' + i)) {
        document.getElementById('maemotes').innerHTML += getButton(game.settings.get('maemotes', 'customEmote' + i))
      }
    }
  }
}
