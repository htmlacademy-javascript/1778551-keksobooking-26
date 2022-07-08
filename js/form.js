const mapFilters = document.querySelector('.map__filters');
const mapFiltersEl = mapFilters.children;
const adForm = document.querySelector('.ad-form');
const adFormEl = adForm.children;

const activateForm = (isActiveForm) => {
  if (isActiveForm) {
    adForm.classList.remove('ad-form--disabled');
    for (const element of adFormEl) {
      element.disabled = false;
    }
    mapFilters.classList.remove('map__filters--disabled');
    for (const element of mapFiltersEl) {
      element.disabled = false;
    }
  } else {
    adForm.classList.add('ad-form--disabled');
    for (const element of adFormEl) {
      element.disabled = true;
    }
    mapFilters.classList.add('map__filters--disabled');
    for (const element of mapFiltersEl) {
      element.disabled = true;
    }
  }
};

export{activateForm, adForm};
