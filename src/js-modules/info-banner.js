$('.info-banner__close-button-link').click(() => {
  $('.info-banner').fadeOut(2000);

  localStorage.setItem('infoBannerClosed', 'true');
});
