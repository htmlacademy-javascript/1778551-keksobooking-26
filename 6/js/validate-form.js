import {LengthTitle, MaxPriceAd, MaxCapacityGuestInRooms}  from './data.js';

const adForm = document.querySelector('.ad-form');
const rooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

/**
 * @param {*LengthTitle} value
 * @returns количество символов заголовка объявления от и до
 */
function validateLengthTitleAdForm (value) {
  return value.length >= LengthTitle.MIN_SYMBOLS && value.length <= LengthTitle.MAX_SYMBOLS;
}

/**
 * @returns  @returns String error минимальное и максимальное количестов символов
 */
function errorMessageTitle () {
  return `Введите от ${LengthTitle.MIN_SYMBOLS} до ${LengthTitle.MAX_SYMBOLS} символов`;
}

//валидация заголовка
pristine.addValidator(
  adForm.querySelector('#title'),
  validateLengthTitleAdForm,
  errorMessageTitle);


/**
 * @param {* MaxPriceAd} value
 * @returns максимальная сумма за ночь
 */
function validateMaxPriceAdForm (value) {
  return value <= MaxPriceAd.MAX_PRICE;
}

/**
 * @returns String error максимальная сумма за ночь
 */
function errorMessageMaxPrice () {
  return `Максимальная сумма ${MaxPriceAd.MAX_PRICE}`;
}

//валидация цены за ночь
pristine.addValidator(
  adForm.querySelector('#price'),
  validateMaxPriceAdForm,
  errorMessageMaxPrice);


function validateCapacityGuestinRooms() {
  return  MaxCapacityGuestInRooms[+rooms.value].includes(+capacity.value);
}

function errorMessageCapacityGuestInRooms() {
  return 'Неверное значение';
}

pristine.addValidator(
  capacity,
  validateCapacityGuestinRooms,
  errorMessageCapacityGuestInRooms
);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
