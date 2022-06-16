//Функции вызова случайных чисел предоставила HTML ACADEMY

//Parameters
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'];

const CHECKIN_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const Coordinates = {
  LAT_MIN: 35.65000,
  LAT_MAX: 35.70000,
  LNG_MIN: 139.70000,
  LNG_MAX: 139.80000
};

//Количество выводимых объявлений
const COUNT_ADS = 10;

/**
 * Функция вызова случайного целого числа
 * @param {number} a - мнимальное число
 * @param {number} b - максимальное число
 * @return {Int} - сгенерированное целое число
 */
function getRandomInt(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}
getRandomInt();

/**
 * Функция вызова случайного числа(Float)
 * @param {number} a - мнимальное число
 * @param {number} b - максимальное число
 * @param {toFixed} digits - количество цифр после запятой
 * @return {Float} - сгенерированное число(Float)
 */
function getRandomFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}
getRandomFloat();

/**
 *Функция вызова случайного элемента массива
 * @param {Arr} имя массива, elements - элемент массива
 * @returns {string} [i] - рандомный элемент массива
 */
const getRandomElementArr = (elements) => elements[getRandomInt(0, elements.length-1)];

/**
 * Функция генерирует новый массив строк с случайной длинной массива из существующего
 * @param {array} массив от которого мы будем брать данные
 * @returns {resultArray} сгенерированный массив с случайной длинной
 */
const collectRandomEl = (array) => {
  const resultArray = [];
  while (resultArray.length < getRandomInt(1, array.length)) { //пока длинна нового массива меньше данного, производится генерация элементов в новый массив
    const randomElement = array[(getRandomInt(0, array.length - 1))]; // рандомный элемент берется из длинный массива
    if (!resultArray.includes(randomElement)) { //если в новом массиве нет рандомного элемента, тогда
      resultArray.push(randomElement); //добавляем этот элемент в созданный массив с случайной длинной
    }
  }

  return resultArray;
};

//Функция создает объявление
const createsAds = (index) => {
  const location = {
    lat: getRandomFloat(Coordinates.LAT_MIN, Coordinates.LAT_MAX),
    lng: getRandomFloat(Coordinates.LNG_MIN, Coordinates.LNG_MAX),
  };
  return {
    author: {
      avatar: `img/avatars/user${String(index).padStart(2,'0')}.png`
    },
    offer: {
      title: 'Гостевой дом Бристоль',
      address: `${location.lat}, ${location.lng}`,
      price: getRandomInt(5,10),
      type : getRandomElementArr(TYPES),
      rooms: getRandomInt(1, 4),
      guests: getRandomInt(1, 6),
      checkin: getRandomElementArr(CHECKIN_TIMES),
      checkout: getRandomElementArr(CHECKIN_TIMES),
      features: collectRandomEl(FEATURES),
      description: 'Это место отличное для тех, кто решил отдохнуть на полную. Отличный номер, при желании завтрак с панорамным видом.',
      photos: collectRandomEl(PHOTOS),
    },
    location
  };
};

const greateAdsArray = (count) => Array.from({length: count, createsAds}, (_, i) => createsAds(i + 1));

// similarWizard(5);
greateAdsArray(COUNT_ADS);


