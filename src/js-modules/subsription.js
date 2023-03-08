const formSubscription = document.querySelectorAll('.js-subscription-form');

formSubscription.forEach((elem) => {
  elem.addEventListener('submit', (event) => {
    event.preventDefault();
    const buttonSubscription = event.target.querySelectorAll('.js-subscription-button');
    buttonSubscription.forEach((el) => {
      const btntext = el.textContent;
      el.textContent = '';
      el.innerHTML += '<i class="fa fa-spinner fa-spin"/>';
      el.disabled = true;

      setTimeout(() => {
        el.textContent = btntext;
        el.disabled = false;
        elem.innerHTML += '<div class="window">Спасибо за заявку</div>';
      }, 10000);
    });
  });
});
