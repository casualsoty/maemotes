const renderLayout = appId => {
  if (game.settings.get('maemotes', 'alternativeSeasonalLayout')) {
    if (new Date().getMonth() == 0 || new Date().getMonth() == 11) {
      $('#app-' + appId + ' > section').addClass('winter-0')
      $('.seasonal-layout-1').addClass('winter-1');
      $('.seasonal-layout-2').addClass('winter-2');
    }
  }
}
