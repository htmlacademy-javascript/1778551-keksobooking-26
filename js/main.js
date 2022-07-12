// import{ createAds } from './data.js';
// import { renderCard } from './card.js';
import {activateForm} from './form.js';
import {addValidatorsToForm}from './validate-form.js';
import {map} from './map.js';

// Количество выводимых объявлений
// const COUNT_ADS = 10;

// const generatedAds = createAds(COUNT_ADS);

// renderCard(generatedAds[0]);

activateForm(true);

addValidatorsToForm();
