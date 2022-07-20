const SHOW_TIME = 5000;
const successPopupWrapper = document.querySelector('#success').content.querySelector('.success');
const successPopupMessage = successPopupWrapper.querySelector('.success__message');
const errorPopupWrapper = document.querySelector('#error').content.querySelector('.error');
const errorPopupMessage = errorPopupWrapper.querySelector('.error__message');
const errorPopupButton = errorPopupWrapper.querySelector('.error__button');

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removePopup();
  }
};

const onPopupClick = () => {
  removePopup();
};

function removePopup () {
  successPopupWrapper.remove();
  errorPopupWrapper.remove();

  document.removeEventListener('keydown', onPopupEscKeydown);
  document.removeEventListener('click', onPopupClick);
}

const showPopupSuccess = (text) => {
  document.body.append(successPopupWrapper);
  successPopupMessage.textContent = text;

  setTimeout(() => {
    successPopupWrapper.remove();
  }, SHOW_TIME);
  document.addEventListener('click', onPopupClick);
  document.addEventListener('keydown', onPopupEscKeydown);
};

const showPopupError = (text) => {
  document.body.append(errorPopupWrapper);
  errorPopupWrapper.append(errorPopupButton);
  errorPopupMessage.textContent = text;

  errorPopupButton.addEventListener('click', () => {
    errorPopupWrapper.remove();
  });

  document.addEventListener('click', onPopupClick);
  document.addEventListener('keydown', onPopupEscKeydown);
};

export {
  showPopupError,
  errorPopupMessage,
  showPopupSuccess,
  successPopupMessage
};
