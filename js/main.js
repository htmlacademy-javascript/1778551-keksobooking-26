import{ createAds } from './data.js';
import { renderCard } from './card.js';

//Количество выводимых объявлений
const COUNT_ADS = 10;

const generatedAds = createAds(COUNT_ADS);

renderCard(generatedAds[0]);
