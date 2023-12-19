const renderLayout = _ => {
  $('.seasonal-layout-1').removeClass('winter-1').addClass(game.settings.get('maemotes', 'alternativeSeasonalLayout').toLowerCase() + '-1');
}
