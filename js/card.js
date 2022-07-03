import {createCapacityMessage} from './utils.js';
const mapCanvas = document.querySelector('#map-canvas');
const template = document.querySelector('#card').content.querySelector('.popup');

const types = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};

/**
 * Функция показывает карточку объявления.
 * @param {Object} dataAd - данные объявления
 */
const renderCard = (dataAd) => {
  const card = template.cloneNode(true);
  const cardAvatar = card.querySelector('.popup__avatar');
  cardAvatar.src = dataAd.author.avatar;
  const cardTitle = card.querySelector('.popup__title');
  cardTitle.textContent = dataAd.offer.title;
  const cardAddress = card.querySelector('.popup__text--address');
  cardAddress.textContent = dataAd.offer.address;
  const cardPrice = card.querySelector('.popup__text--price');
  cardPrice.textContent = `${dataAd.offer.price}  ₽/ночь`;
  const cardType = card.querySelector('.popup__type');
  cardType.textContent = types[dataAd.offer.type];
  const cardCapacity = card.querySelector('.popup__text--capacity');
  createCapacityMessage(cardCapacity, dataAd.offer.rooms, dataAd.offer.guests);
  const cardTime = card.querySelector('.popup__text--time');
  cardTime.textContent = `Заезд после ${dataAd.offer.checkin}, выезд до ${dataAd.offer.checkout}`;

  const cardFeatures = dataAd.offer.features;
  const cardFeaturesItem = card.querySelectorAll('.popup__feature');
  cardFeaturesItem.forEach((item) => {
    const isModifiers = cardFeatures.some((feature) => item.classList.contains(`popup__feature--${feature}`));
    if (!isModifiers) {
      item.remove();
    }
  });

  const cardDescription = card.querySelector('.popup__description');
  cardDescription.textContent = dataAd.offer.description;

  const randomSrc = dataAd.offer.photos;
  const photosContainer = card.querySelector('.popup__photos');
  const cardPhoto = card.querySelector('.popup__photo');
  randomSrc.forEach((value, index) => {
    if(index === 0) {
      cardPhoto.src = value;
    } else {
      const photoClone = cardPhoto.cloneNode();
      photoClone.src = value;
      photosContainer.append(photoClone);
    }
  });
  mapCanvas.append(card);
};

export {renderCard};

