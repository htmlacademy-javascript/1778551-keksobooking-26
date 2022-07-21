import { activateForm } from './activate-form.js';
import { defaultCoords, DEFAULT_ZOOM, map, setAdress } from './map.js';
import { getData } from './api.js';
import { debounce} from './utils.js';
import { showAds, createPins } from './filters-form.js';
import { uploadAvatar, uploadHomePhoto } from './photo.js';
import { showPopupError } from './popup.js';
import { resetFormButton, resetFormSuccess } from './reset.js';

const RERENDER_DELAY = 500;
activateForm(false);
map
  .on('load', () => {
    activateForm(true);
    setAdress(defaultCoords.lat, defaultCoords.lng);
  })
  .setView(
    defaultCoords,
    DEFAULT_ZOOM
  );

getData((cards) => {
  showAds(cards);
  createPins(debounce(() => showAds(cards), RERENDER_DELAY));
  resetFormSuccess(debounce(() => showAds(cards), RERENDER_DELAY));
  resetFormButton(debounce(() => showAds(cards), RERENDER_DELAY));
}, showPopupError);

uploadAvatar();
uploadHomePhoto();
