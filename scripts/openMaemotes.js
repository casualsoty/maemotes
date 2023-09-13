/*  FUNCTIONS
 */

export const openMaemotes = _ => {
  let buttons = '';

  ['maegamba.png', 'maejam.png', 'maelmao.png', 'maelove.png', 'maeoopsie.png', 'maevil.png', 'maewhat.png', 'Maeyaya.gif', 'quemae.png', 'rosebedge.png', 'roseeyes.png', 'rosehmm.png', 'rosesmile.png', 'roseupside_down.png', 'roseweary.png'].forEach(artwork => {
    buttons +=
      '<button onclick="ChatMessage.create({ content: \'<img src=https://raw.githubusercontent.com/casualsoty/maemotes/main/artwork/' + artwork + ' style=border:0;width:64px; title=' + artwork.substring(0, artwork.length - 4) + '>\' });" ' +
      'style="width: 78px" ' +
      'title="' + artwork + '">' +
      '<img src="https://raw.githubusercontent.com/casualsoty/maemotes/main/artwork/' + artwork + '" ' +
      'style="border: 0; width: 64px;">' +
      '</button>';
  });

  new Dialog({
    buttons: {},
    content: '<div style="align-content: space-between; display: flex; flex-wrap: wrap; height: 164px; justify-content: space-between; width: 606px;">' + buttons + '</div>',
    title: "Maemotes"
  }, {
    height: 210,
    left: window.innerWidth - 622 - 13,
    top: window.innerHeight - 210 - 144 - 3,
    width: 622
  }).render(true);
}
