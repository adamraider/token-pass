$(document).on('scroll', function (e) {
  var stop = Math.round($(window).scrollTop());
  if (stop > 1){
    $('.landing-nav').removeClass('pristine');
  } else {
    $('.landing-nav').addClass('pristine');
  }
});

$('.toggle-mobile-nav').on('click', function (e) {
  var $nav = $('#mobile-nav')
  if ($nav.hasClass('active')) {
    $nav.removeClass('active');
  } else {
    $nav.addClass('active');
  }
});