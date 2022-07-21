const SHOW_TIME = 5000;
const successPopupWrapper = document.querySelector('#success').content.querySelector('.success');
const successPopupMessageElement = successPopupWrapper.querySelector('.success__message');
const errorPopupWrapper = document.querySelector('#error').content.querySelector('.error');
const errorPopupMessageElement = errorPopupWrapper.querySelector('.error__message');
const errorPopupButtonElement = errorPopupWrapper.querySelector('.error__button');

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
  successPopupMessageElement.textContent = text;

  setTimeout(() => {
    successPopupWrapper.remove();
  }, SHOW_TIME);
  document.addEventListener('click', onPopupClick);
  document.addEventListener('keydown', onPopupEscKeydown);
};

const showPopupError = (text) => {
  document.body.append(errorPopupWrapper);
  errorPopupWrapper.append(errorPopupButtonElement);
  errorPopupMessageElement.textContent = text;

  errorPopupButtonElement.addEventListener('click', () => {
    errorPopupWrapper.remove();
  });

  document.addEventListener('click', onPopupClick);
  document.addEventListener('keydown', onPopupEscKeydown);
};

export {
  showPopupError,
  errorPopupMessageElement,
  showPopupSuccess,
  successPopupMessageElement
};
