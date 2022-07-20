import { sendData } from './api.js';
import { errorPopupMessage, showPopupError } from './popup.js';

const MAX_PRICE = 100000;
const adForm = document.querySelector('.ad-form');
const titleInput = adForm.querySelector('#title');
const capacityInput = adForm.querySelector('#capacity');
const roomInput = adForm.querySelector('#room_number');
const priceInput = adForm.querySelector('#price');
const typeInput = adForm.querySelector('#type');
const timeInInput = adForm.querySelector('#timein');
const timeOutInput = adForm.querySelector('#timeout');
const submitButton = adForm.querySelector('.ad-form__submit');
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
    min: Number(priceInput.min),
    max: Number(priceInput.max),
  },
  start: Number(priceInput.min),
  step: 15,
  connect: 'lower'
});

priceInput.min = minPrice[typeInput.value];

sliderElement.noUiSlider.on('slide', () => {
  const sliderValue = Number(sliderElement.noUiSlider.get());
  priceInput.value = sliderValue;
  pristine.validate(priceInput);
});

priceInput.addEventListener('change', (evt) => {
  sliderElement.noUiSlider.set(Number(evt.target.value));
});

const validateLengthTitleAdForm = () => {
  const titleTrimmed = titleInput.value.trim();
  return titleTrimmed.length >= LengthTitle.MIN_SYMBOLS && titleTrimmed.length <= LengthTitle.MAX_SYMBOLS;
};

const errorMessageTitle = () => `Введите от ${LengthTitle.MIN_SYMBOLS} до ${LengthTitle.MAX_SYMBOLS} символов`;

pristine.addValidator(
  titleInput,
  validateLengthTitleAdForm,
  errorMessageTitle,
);

const validateCapacityGuestinRooms = () => maxCapacityGuestInRooms[+roomInput.value].includes(+capacityInput.value);

const errorMessageCapacityGuestInRooms = () => 'Неверное значение';

pristine.addValidator(
  capacityInput,
  validateCapacityGuestinRooms,
  errorMessageCapacityGuestInRooms
);

typeInput.addEventListener('change', () => {
  priceInput.placeholder = minPrice[typeInput.value];
  priceInput.min = minPrice[typeInput.value];
  priceInput.value = '';
});

const validatePrice = (value) => value <= MAX_PRICE && value >= minPrice[typeInput.value];

const errorMessagePrice = () => {
  if (priceInput.value < minPrice[typeInput.value]) {
    return `Стоимость ${changeWord[typeInput.value]} не меньше ${minPrice[typeInput.value]}р`;
  }
  if (priceInput.value > MAX_PRICE) {
    return `Стоимость ${changeWord[typeInput.value]} не более ${MAX_PRICE}р`;
  }
};

pristine.addValidator(
  priceInput,
  validatePrice,
  errorMessagePrice
);

timeInInput.addEventListener('change', () => {
  timeOutInput.value = timeInInput.value;
  pristine.validate();
});

timeOutInput.addEventListener('change', () => {
  timeInInput.value = timeOutInput.value;
  pristine.validate();
});

const validateTime = () => timeInInput.value === timeOutInput.value;

const errorTime = () => 'Время должно быть одинаково';

pristine.addValidator(timeOutInput, validateTime, errorTime);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправка...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const addsValidatorsToForm = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValidate = pristine.validate();


    if (isValidate) {
      const formData = new FormData(evt.target);
      blockSubmitButton();

      sendData(formData, onSuccess, () => {
        showPopupError(errorPopupMessage.textContent);
        unblockSubmitButton();
      });
    }
  });
};

export {
  sliderElement,
  priceInput,
  minPrice,
  typeInput,
  addsValidatorsToForm,
  adForm,
  unblockSubmitButton,
  pristine
};
