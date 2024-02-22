const renderLayout = appId => {
  if (game.settings.get('maemotes', 'alternativeSeasonalLayout')) {
    if (new Date().getMonth() == 0 || new Date().getMonth() == 11) {
      $('#app-' + appId + ' > section').addClass('winter-0')
      $('.seasonal-layout-1').addClass('winter-1');
      $('.seasonal-layout-2').addClass('winter-2');
    } else if (new Date().getMonth() == 2 || new Date().getMonth() == 3) {
      $('#app-' + appId + ' > section').addClass('easter-0')
      $('.seasonal-layout-1').addClass('easter-1');
      $('.seasonal-layout-2').addClass('easter-2');
    } else if (new Date().getMonth() == 5 || new Date().getMonth() == 6) {
      $('#app-' + appId + ' > section').addClass('summer-0')
      $('.seasonal-layout-1').addClass('summer-1');
      $('.seasonal-layout-2').addClass('summer-2');
    } else if (new Date().getMonth() == 9 || new Date().getMonth() == 10) {
      $('#app-' + appId + ' > section').addClass('halloween-0')
      $('.seasonal-layout-1').addClass('halloween-1');
      $('.seasonal-layout-2').addClass('halloween-2');
    }
  }
}
