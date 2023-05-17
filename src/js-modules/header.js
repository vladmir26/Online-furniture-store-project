$('.js-hamburger-link').click((event) => {
  event.preventDefault();
  $('#header').toggleClass('js-header--show-menu').removeClass('js-header--show-search');
});

$('.js-search-link').click((event) => {
  event.preventDefault();
  $('#header').toggleClass('js-header--show-search').removeClass('js-header--show-menu');
});
