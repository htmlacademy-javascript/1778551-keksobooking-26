import {getRandomElementArr,  collectRandomEl,  getRandomFloat, getRandomInt} from './utils.js';

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

//Функция генерирует объявление

function createsAds(index) {
  const location = {
    lat: getRandomFloat(Coordinates.LAT_MIN, Coordinates.LAT_MAX),
    lng: getRandomFloat(Coordinates.LNG_MIN, Coordinates.LNG_MAX),
  };
  return {
    author: {
      avatar: `img/avatars/user${String(index).padStart(2, '0')}.png`
    },
    offer: {
      title: 'Гостевой дом Бристоль',
      address: `${location.lat}, ${location.lng}`,
      price: getRandomInt(5, 10),
      type: getRandomElementArr(TYPES),
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
}

const createAdsArray = (count) => Array.from({length: count, createsAds}, (_, i) => createsAds(i + 1));
createAdsArray(COUNT_ADS);

export{createAdsArray};
