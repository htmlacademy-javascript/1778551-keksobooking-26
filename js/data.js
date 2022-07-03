import {getRandomElementArr, getRandomElementsArr, getRandomFloat, getRandomInt} from './utils.js';

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

const RoomsAmount = {
  MIN_ROOMS: 1,
  MAX_ROOMS: 5
};

const GuestsAmount = {
  MIN_GUEST: 1,
  MAX_GUESTS: 10
};

//Функция генерирует объявление

function createsAd(index) {
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
      price: getRandomInt(1000, 5000),
      type: getRandomElementArr(TYPES),
      rooms: getRandomInt(RoomsAmount.MIN_ROOMS, RoomsAmount.MAX_ROOMS),
      guests: getRandomInt(GuestsAmount.MIN_GUEST, GuestsAmount.MAX_GUESTS),
      checkin: getRandomElementArr(CHECKIN_TIMES),
      checkout: getRandomElementArr(CHECKIN_TIMES),
      features: getRandomElementsArr(FEATURES),
      description: 'Это место отличное для тех, кто решил отдохнуть на полную. Отличный номер, при желании завтрак с панорамным видом.',
      photos: getRandomElementsArr(PHOTOS),
    },
    location
  };
}

const createAds = (count) => Array.from({length: count}, (_, i) => createsAd(i + 1));

export{createAds};
