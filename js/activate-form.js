const mapFiltersElement = document.querySelector('.map__filters');
const mapFiltersElements = mapFiltersElement.children;
const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.children;

const activateForm = (isActiveForm) => {
  if (isActiveForm) {
    adForm.classList.remove('ad-form--disabled');
    for (const element of adFormElements) {
      element.disabled = false;
    }
    mapFiltersElement.classList.remove('map__filters--disabled');
    for (const element of mapFiltersElements) {
      element.disabled = false;
    }
  } else {
    adForm.classList.add('ad-form--disabled');
    for (const element of adFormElements) {
      element.disabled = true;
    }
    mapFiltersElement.classList.add('map__filters--disabled');
    for (const element of mapFiltersElements) {
      element.disabled = true;
    }
  }
};

export{
  activateForm,
  adForm
};
