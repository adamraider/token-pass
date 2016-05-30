$(document).on('scroll', function (e) {
  var stop = Math.round($(window).scrollTop());
  if (stop > 1){
    $('.landing-nav').removeClass('pristine');
  } else {
    $('.landing-nav').addClass('pristine');
  }
});