import{ createAds } from './data.js';
import {activateForm} from './form.js';
import {addValidatorsToForm}from './validate-form.js';
import {renderMarkers} from './map.js';

// Количество выводимых объявлений
const COUNT_ADS = 10;

const generatedAds = createAds(COUNT_ADS);

renderMarkers(generatedAds);

activateForm(true);

addValidatorsToForm();
