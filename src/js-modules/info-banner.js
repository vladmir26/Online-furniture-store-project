$('.info-banner__close-button-link').click(() => {
  $('.info-banner').fadeOut(4000);

  localStorage.setItem('infoBannerClosed', 'true');
});
