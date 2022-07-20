import {createCapacityMessage} from './utils.js';

const template = document.querySelector('#card').content.querySelector('.popup');
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
  const card = template.cloneNode(true);

  const cardAvatar = card.querySelector('.popup__avatar');
  removePhotoElementWithoutData(dataAd.author.avatar, cardAvatar);

  const cardTitle = card.querySelector('.popup__title');
  removeElementWithoutData(dataAd.offer.title, cardTitle);

  const cardAddress = card.querySelector('.popup__text--address');
  removeElementWithoutData(dataAd.offer.address, cardAddress);

  const cardPrice = card.querySelector('.popup__text--price');
  cardPrice.textContent = `${dataAd.offer.price}  ₽/ночь`;

  const cardType = card.querySelector('.popup__type');
  if(!dataAd.offer.type) {
    cardType.remove();
  } else {
    cardType.textContent = types[dataAd.offer.type];
  }

  const cardCapacity = card.querySelector('.popup__text--capacity');
  createCapacityMessage(cardCapacity, dataAd.offer.rooms, dataAd.offer.guests);

  const cardTime = card.querySelector('.popup__text--time');
  cardTime.textContent = `Заезд после ${dataAd.offer.checkin}, выезд до ${dataAd.offer.checkout}`;

  const cardFeatures = dataAd.offer.features;
  const cardFeaturesContainer = card.querySelector('.popup__features');
  const cardFeaturesItems = card.querySelectorAll('.popup__feature');
  removeExtraFeatures(cardFeatures, cardFeaturesContainer, cardFeaturesItems);

  const cardDescription = card.querySelector('.popup__description');
  cardDescription.textContent = dataAd.offer.description;

  const randomSrc = dataAd.offer.photos;
  const photosContainer = card.querySelector('.popup__photos');
  const cardPhoto = card.querySelector('.popup__photo');
  addsImg(randomSrc, photosContainer, cardPhoto);

  return card;
};

export {renderCard};

