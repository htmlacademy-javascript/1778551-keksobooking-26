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
const filterTypeSelect = filtersWrapper.querySelector('#housing-type');
const filterPriceSelect = filtersWrapper.querySelector('#housing-price');
const filterRoomsSelect = filtersWrapper.querySelector('#housing-rooms');
const filterGuestsSelect = filtersWrapper.querySelector('#housing-guests');
const featuresFilter = filtersWrapper.querySelectorAll('.map__checkbox');

const findType = (ad) => filterTypeSelect.value === DEFAULT_VALUE || ad.offer.type === filterTypeSelect.value;
const findPrice = (ad) => filterPriceSelect.value === DEFAULT_VALUE || (ad.offer.price >= priceForFilter[filterPriceSelect.value].start && ad.offer.price <= priceForFilter[filterPriceSelect.value].end);
const findRooms = (ad) => filterRoomsSelect.value === DEFAULT_VALUE || ad.offer.rooms === +filterRoomsSelect.value;
const findGuests = (ad) => filterGuestsSelect.value === DEFAULT_VALUE || ad.offer.guests === +filterGuestsSelect.value;

const findFeatures = (ad) => Array.from(featuresFilter)
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
