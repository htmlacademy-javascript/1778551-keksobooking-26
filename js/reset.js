import { clearMarkers, defaultCoords, DEFAULT_ZOOM, mainPinMarker, map, setAdress } from './map.js';
import { previewAvatar, previewPhotoHome } from './photo.js';
import { showPopupSuccess, successPopupMessage } from './popup.js';
import { addsValidatorsToForm, adForm, minPrice, priceInput, pristine, sliderElement, typeInput, unblockSubmitButton} from './validate-form.js';

const AVATAR = 'img/muffin-grey.svg';
const formMapFilters = document.querySelector('.map__filters');
const resetButton = document.querySelector('.ad-form__reset');

const resetDataForm = (form) => {
  form.reset();
  formMapFilters.reset();
  setAdress(defaultCoords.lat, defaultCoords.lng);
  map.closePopup();
  previewAvatar.src = AVATAR;
  previewPhotoHome.innerHTML = '';
  priceInput.placeholder = minPrice[typeInput.value];
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
    showPopupSuccess(successPopupMessage.textContent);
    resetDataForm(adForm);
    cb();
    unblockSubmitButton();
  });
};

const resetFormButton = (cb) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    pristine.reset();
    resetDataForm(adForm);
    cb();
  });
};

export {
  resetDataForm,
  resetFormButton,
  resetFormSuccess
};
