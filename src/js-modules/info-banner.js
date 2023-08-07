$('.info-banner__close-button-link').click(() => {
  $('.info-banner').fadeOut(2000);
  $('.header').addClass('header-animation');
  localStorage.setItem('infoBannerClosed', 'true');
});
