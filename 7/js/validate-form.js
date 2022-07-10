const adForm = document.querySelector('.ad-form');
const rooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const fieldPrice = adForm.querySelector('#price');
const type = adForm.querySelector('#type');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const LengthTitle = {
  MIN_SYMBOLS: 30,
  MAX_SYMBOLS: 100
};

const MAX_PRICE = 100000;

const MinPrice = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000
};

const ChangeWord = {
  palace: 'дворца',
  flat: 'квартиры',
  house: 'дома',
  bungalow: 'бунгало',
  hotel: 'отеля'
};

const MaxCapacityGuestInRooms = {
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

type.addEventListener('change', () => {
  fieldPrice.placeholder = MinPrice[type.value];
  fieldPrice.min = MinPrice[type.value];
  fieldPrice.value = '';
});

function validatePrice (value) {
  return value <= MAX_PRICE[type.value] && value >= MinPrice[type.value];
}

function errorMessagePrice () {
  if (fieldPrice.value < MinPrice[type.value]) {
    return `Стоимость ${ChangeWord[type.value]} не меньше ${MinPrice[type.value]}р`;
  }
  if(fieldPrice.value > MAX_PRICE) {
    return `Стоимость ${ChangeWord[type.value]} не более ${MAX_PRICE}р`;
  }

}

pristine.addValidator(fieldPrice, validatePrice, errorMessagePrice);

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
  pristine.validate();
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
  pristine.validate();
});

function validateTime () {
  return  timeIn.value === timeOut.value;
}

function errorTime () {
  return 'Время должно быть одинаково';
}

pristine.addValidator(timeOut, validateTime, errorTime);

function addValidatorsToForm () {
  adForm.addEventListener('submit', () => {
    pristine.validate();
  });
}

export{addValidatorsToForm};
