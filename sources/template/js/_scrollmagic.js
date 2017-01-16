$(function() {
  var controller = new ScrollMagic.Controller();

  var containerScene = new ScrollMagic.Scene({
      triggerElement: 'div.container-fluid',
      offset: 350
      
    })
    .setPin('h1.page-title')
    .addTo(controller);
});