import { createCapacityMessage } from './utils.js';

const templateElement = document.querySelector('#card').content.querySelector('.popup');
const types = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};

const removeElementWithoutData = (data, element) => {
  if (!data) {
    element.remove();
  } else {
    element.textContent = data;
  }
};

const removePhotoElementWithoutData = (data, element) => {
  if (!data) {
    element.remove();
  } else {
    element.src = data;
  }
};

const removeExtraFeatures = (dataFeatures, container, featuresItems ) => {
  if (!dataFeatures) {
    container.remove();
  } else {
    featuresItems.forEach((item) => {
      const isModifiers = dataFeatures.some((feature) => item.classList.contains(`popup__feature--${feature}`));

      if (!isModifiers) {
        item.remove();
      }
    });
  }
};

const addsImg = (dataSrc, container, photo) => {
  if (!dataSrc) {
    container.remove();
  } else {
    dataSrc.forEach((value, index) => {
      if(index === 0) {
        photo.src = value;
      } else {
        const photoClone = photo.cloneNode();
        photoClone.src = value;
        container.append(photoClone);
      }
    });
  }
};

const renderCard = (dataAd) => {
  const cardElement = templateElement.cloneNode(true);

  const cardAvatar = cardElement.querySelector('.popup__avatar');
  removePhotoElementWithoutData(dataAd.author.avatar, cardAvatar);

  const cardTitleElement = cardElement.querySelector('.popup__title');
  removeElementWithoutData(dataAd.offer.title, cardTitleElement);

  const cardAddressElement = cardElement.querySelector('.popup__text--address');
  removeElementWithoutData(dataAd.offer.address, cardAddressElement);

  const cardPriceElement = cardElement.querySelector('.popup__text--price');
  cardPriceElement.textContent = `${dataAd.offer.price}  ₽/ночь`;

  const cardTypeElement = cardElement.querySelector('.popup__type');
  if(!dataAd.offer.type) {
    cardTypeElement.remove();
  } else {
    cardTypeElement.textContent = types[dataAd.offer.type];
  }

  const cardCapacityElement = cardElement.querySelector('.popup__text--capacity');
  createCapacityMessage(cardCapacityElement, dataAd.offer.rooms, dataAd.offer.guests);

  const cardTimeElement = cardElement.querySelector('.popup__text--time');
  cardTimeElement.textContent = `Заезд после ${dataAd.offer.checkin}, выезд до ${dataAd.offer.checkout}`;

  const cardFeatures = dataAd.offer.features;
  const cardFeaturesElements = cardElement.querySelector('.popup__features');
  const cardFeaturesElement = cardElement.querySelectorAll('.popup__feature');
  removeExtraFeatures(cardFeatures, cardFeaturesElements, cardFeaturesElement);

  const cardDescriptionElement = cardElement.querySelector('.popup__description');
  cardDescriptionElement.textContent = dataAd.offer.description;

  const randomSrc = dataAd.offer.photos;
  const photosElements = cardElement.querySelector('.popup__photos');
  const cardPhotoElement = cardElement.querySelector('.popup__photo');
  addsImg(randomSrc, photosElements, cardPhotoElement);

  return cardElement;
};

export {
  renderCard
};

