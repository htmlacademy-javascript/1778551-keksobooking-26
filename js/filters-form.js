import { createMarker, clearMarkers } from './map.js';

const MAX_AD_COUNT = 10;
const DEFAULT_VALUE = 'any';

const priceForFilter = {
  low: {
    start: 0,
    end: 10000,
  },
  middle: {
    start: 10000,
    end: 50000,
  },
  high: {
    start: 50000,
    end: 100000,
  }
};

const filtersWrapper = document.querySelector('.map__filters');
const filterTypeElement = filtersWrapper.querySelector('#housing-type');
const filterPriceElement = filtersWrapper.querySelector('#housing-price');
const filterRoomsElement = filtersWrapper.querySelector('#housing-rooms');
const filterGuestsElement = filtersWrapper.querySelector('#housing-guests');
const featuresFilterElements = filtersWrapper.querySelectorAll('.map__checkbox');

const findType = (ad) => filterTypeElement.value === DEFAULT_VALUE || ad.offer.type === filterTypeElement.value;
const findPrice = (ad) => filterPriceElement.value === DEFAULT_VALUE || (ad.offer.price >= priceForFilter[filterPriceElement.value].start && ad.offer.price <= priceForFilter[filterPriceElement.value].end);
const findRooms = (ad) => filterRoomsElement.value === DEFAULT_VALUE || ad.offer.rooms === +filterRoomsElement.value;
const findGuests = (ad) => filterGuestsElement.value === DEFAULT_VALUE || ad.offer.guests === +filterGuestsElement.value;

const findFeatures = (ad) => Array.from(featuresFilterElements)
  .every((filterFeature) => {
    if (!filterFeature.checked) {
      return true;
    }
    if (!ad.offer.features) {
      return false;
    }
    return ad.offer.features.includes(filterFeature.value);
  });

const showAds = (ads) => {
  const filteredData = [];

  for (let i = 0; i < ads.length; i++) {
    const ad = ads[i];
    if (
      findType(ad) &&
      findPrice(ad) &&
      findRooms(ad) &&
      findGuests(ad) &&
      findFeatures(ad)
    ) {
      const card = createMarker(ad);
      filteredData.push(card);

      if (filteredData.length === MAX_AD_COUNT) {
        break;
      }
    }
  }
  return filteredData;
};


const createPins = (cb) => {
  filtersWrapper.addEventListener('change', () => {
    clearMarkers();
    cb();
  });
};

export {
  showAds,
  createPins
};
