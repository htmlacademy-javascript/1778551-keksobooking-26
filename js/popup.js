const SHOW_TIME = 5000;
const successPopupElement = document.querySelector('#success').content.querySelector('.success');
const successPopupMessageElement = successPopupElement.querySelector('.success__message');
const errorPopupElement = document.querySelector('#error').content.querySelector('.error');
const errorPopupMessageElement = errorPopupElement.querySelector('.error__message');
const errorPopupButtonElement = errorPopupElement.querySelector('.error__button');

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
  successPopupElement.remove();
  errorPopupElement.remove();

  document.removeEventListener('keydown', onPopupEscKeydown);
  document.removeEventListener('click', onPopupClick);
}

const showPopupSuccess = (text) => {
  document.body.append(successPopupElement);
  successPopupMessageElement.textContent = text;

  setTimeout(() => {
    successPopupElement.remove();
  }, SHOW_TIME);
  document.addEventListener('click', onPopupClick);
  document.addEventListener('keydown', onPopupEscKeydown);
};

const showPopupError = (text) => {
  document.body.append(errorPopupElement);
  errorPopupElement.append(errorPopupButtonElement);
  errorPopupMessageElement.textContent = text;

  errorPopupButtonElement.addEventListener('click', () => {
    errorPopupElement.remove();
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
