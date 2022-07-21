import { adForm } from './activate-form.js';
import { clearMarkers, defaultCoords, DEFAULT_ZOOM, mainPinMarker, map, setAdress } from './map.js';
import { previewAvatarElement, previewPhotoHomeElement } from './photo.js';
import { showPopupSuccess, successPopupMessageElement } from './popup.js';
import { addsValidatorsToForm, minPrice, priceInputElement, pristine, sliderElement, typeInputElement, unblockSubmitButton } from './validate-form.js';

const AVATAR_URL_DEFAULT = 'img/muffin-grey.svg';
const formMapFiltersElement = document.querySelector('.map__filters');
const resetButtonElement = document.querySelector('.ad-form__reset');

const resetDataForm = (form) => {
  form.reset();
  formMapFiltersElement.reset();
  setAdress(defaultCoords.lat, defaultCoords.lng);
  map.closePopup();
  previewAvatarElement.src = AVATAR_URL_DEFAULT;
  previewPhotoHomeElement.innerHTML = '';
  priceInputElement.placeholder = minPrice[typeInputElement.value];
  sliderElement.noUiSlider.reset();

  mainPinMarker.setLatLng(
    defaultCoords,
  );

  map.setView(
    defaultCoords,
    DEFAULT_ZOOM
  );
  clearMarkers();
};

const resetFormSuccess = (cb) => {
  addsValidatorsToForm(() => {
    showPopupSuccess(successPopupMessageElement.textContent);
    resetDataForm(adForm);
    cb();
    unblockSubmitButton();
  });
};

const resetFormButton = (cb) => {
  resetButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    pristine.reset();
    resetDataForm(adForm);
    cb();
  });
};

export {
  resetFormButton,
  resetFormSuccess
};
