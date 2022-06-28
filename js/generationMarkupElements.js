import {createAdsArray} from './data.js';

const mapCanvas = document.querySelector('#map-canvas');
const template = document.querySelector('#card').content.querySelector('.popup');

const createCards = createAdsArray();
// eslint-disable-next-line no-console
console.log(createCards);
