const renderEmotes = _ => {
  const MAEMOTES_INPUT = document.getElementById('maemotes-input').value;

  document.getElementById('maemotes').innerHTML = '';

  if (game.settings.get('maemotes', 'displayDefaultEmotes')) {
    [
      'maeoopsie.png',
      'maewhat.png', 'quemae.png',
      'Maeyaya.gif', 'maegamba.png', 'maejam.png', 'maelmao.png', 'maelove.png', 'maevil.png',
      'rosebedge.png', 'roseeyes.png', 'rosehmm.png', 'rosesmile.png', 'roseupside_down.png', 'roseweary.png'
    ].forEach(artwork => {
      if (artwork.split('.')[0].toLowerCase().includes(MAEMOTES_INPUT)) {
        document.getElementById('maemotes').innerHTML += getButton('modules/maemotes/artwork/default/' + artwork)
      }
    });
  }

  if (game.settings.get('maemotes', 'displayCustomEmotes')) {
    for (let i = 1; i < 51; i++) {
      if (game.settings.get('maemotes', 'customEmote' + i) && game.settings.get('maemotes', 'customEmote' + i).toLowerCase().includes(MAEMOTES_INPUT)) {
        document.getElementById('maemotes').innerHTML += getButton(game.settings.get('maemotes', 'customEmote' + i))
      }
    }
  }
}
