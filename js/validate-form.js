import { adForm } from './activate-form.js';
import { sendData } from './api.js';
import { errorPopupMessageElement, showPopupError } from './popup.js';

const MAX_PRICE = 100000;
const titleInputElement = adForm.querySelector('#title');
const capacityInputElement = adForm.querySelector('#capacity');
const roomInputElement = adForm.querySelector('#room_number');
const priceInputElement = adForm.querySelector('#price');
const typeInputElement = adForm.querySelector('#type');
const timeInInputElement = adForm.querySelector('#timein');
const timeOutInputElement = adForm.querySelector('#timeout');
const submitButtonElement = adForm.querySelector('.ad-form__submit');
const sliderElement = document.querySelector('.ad-form__slider');

const LengthTitle = {
  MIN_SYMBOLS: 30,
  MAX_SYMBOLS: 100
};

const minPrice = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000
};

const changeWord = {
  palace: 'дворца',
  flat: 'квартиры',
  house: 'дома',
  bungalow: 'бунгало',
  hotel: 'отеля'
};

const maxCapacityGuestInRooms = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

noUiSlider.create(sliderElement, {
  range: {
    min: Number(priceInputElement.min),
    max: Number(priceInputElement.max),
  },
  start: Number(priceInputElement.min),
  step: 15,
  connect: 'lower'
});

priceInputElement.min = minPrice[typeInputElement.value];

sliderElement.noUiSlider.on('slide', () => {
  const sliderValue = Number(sliderElement.noUiSlider.get());
  priceInputElement.value = sliderValue;
  pristine.validate(priceInputElement);
});

priceInputElement.addEventListener('change', (evt) => {
  sliderElement.noUiSlider.set(Number(evt.target.value));
});

const validateLengthTitleAdForm = () => {
  const titleTrimmed = titleInputElement.value.trim();
  return titleTrimmed.length >= LengthTitle.MIN_SYMBOLS && titleTrimmed.length <= LengthTitle.MAX_SYMBOLS;
};

const showErrorMessageTitle = () => `Введите от ${LengthTitle.MIN_SYMBOLS} до ${LengthTitle.MAX_SYMBOLS} символов`;

pristine.addValidator(
  titleInputElement,
  validateLengthTitleAdForm,
  showErrorMessageTitle,
);

const validateCapacityGuestinRooms = () => maxCapacityGuestInRooms[+roomInputElement.value].includes(+capacityInputElement.value);

const showErrorMessageCapacityGuestInRooms = () => 'Неверное значение';

pristine.addValidator(
  capacityInputElement,
  validateCapacityGuestinRooms,
  showErrorMessageCapacityGuestInRooms
);

typeInputElement.addEventListener('change', () => {
  priceInputElement.placeholder = minPrice[typeInputElement.value];
  priceInputElement.min = minPrice[typeInputElement.value];
  priceInputElement.value = '';
});

const validatePrice = (value) => value <= MAX_PRICE && value >= minPrice[typeInputElement.value];

const showErrorMessagePrice = () => {
  if (priceInputElement.value < minPrice[typeInputElement.value]) {
    return `Стоимость ${changeWord[typeInputElement.value]} не меньше ${minPrice[typeInputElement.value]}р`;
  }
  if (priceInputElement.value > MAX_PRICE) {
    return `Стоимость ${changeWord[typeInputElement.value]} не более ${MAX_PRICE}р`;
  }
};

pristine.addValidator(
  priceInputElement,
  validatePrice,
  showErrorMessagePrice
);

timeInInputElement.addEventListener('change', () => {
  timeOutInputElement.value = timeInInputElement.value;
  pristine.validate();
});

timeOutInputElement.addEventListener('change', () => {
  timeInInputElement.value = timeOutInputElement.value;
  pristine.validate();
});

const validateTime = () => timeInInputElement.value === timeOutInputElement.value;

const showErrorTime = () => 'Время должно быть одинаково';

pristine.addValidator(
  timeOutInputElement,
  validateTime,
  showErrorTime
);

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Отправка...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

const addsValidatorsToForm = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValidate = pristine.validate();


    if (isValidate) {
      const formData = new FormData(evt.target);
      blockSubmitButton();

      sendData(formData, onSuccess, () => {
        showPopupError(errorPopupMessageElement.textContent);
        unblockSubmitButton();
      });
    }
  });
};

export {
  sliderElement,
  priceInputElement,
  minPrice,
  typeInputElement,
  addsValidatorsToForm,
  unblockSubmitButton,
  pristine
};
