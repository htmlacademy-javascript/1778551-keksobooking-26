import {getRandomElementArr,  collectRandomEl,  getRandomFloat, getRandomInt} from './utils.js';
import {TYPES, CHECKIN_TIMES, FEATURES, PHOTOS, Coordinates} from './parameters-ads.js';

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

const greateAdsArray = (count) => Array.from({length: count, createsAds}, (_, i) => createsAds(i + 1));
greateAdsArray(COUNT_ADS);

