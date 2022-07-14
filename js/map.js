import {renderCard} from './card.js';

const resetButton = document.querySelector('.ad-form__reset');
const addressInput = document.querySelector('#address');
// const AVATAR_DEFAULT = 'img/muffin-grey.svg';


const defaultCoords = {
  lat: 35.6895,
  lng: 139.692,
};

const COORDS_DIGITS = 5;

const map = L.map('map-canvas')
  .on('load', () => {
  })
  .setView({
    lat: 35.6895,
    lng: 139.692,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: defaultCoords.lat,
    lng: defaultCoords.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const adPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

//кнопка возвращает маркер в начальное место
resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: defaultCoords.lat,
    lng: defaultCoords.lng,
  });
});

const setAdress = (lat, lng) => {
  const addressLat = lat;
  const addressLng = lng;
  addressInput.value =  `Широта: ${addressLat}, долгота: ${addressLng}`;
};

//тут наверное нужно удалять обработчик событий
mainPinMarker.on('moveend', (evt) => {
  setAdress(
    evt.target.getLatLng().lat.toFixed(COORDS_DIGITS),
    evt.target.getLatLng().lng.toFixed(COORDS_DIGITS)
  );
});


const markerGroup = L.layerGroup().addTo(map);

const createMarker = (dataAd) => {
  const marker = L.marker({
    lat: dataAd.location.lat,
    lng: dataAd.location.lng,
  },
  {
    icon: adPinIcon,
  });

  marker
    .addTo(markerGroup)
    .bindPopup(renderCard(dataAd));
};


const renderMarkers = function (generatedAds) {
  generatedAds.forEach((ad) => {
    createMarker(ad);
  });
};

mainPinMarker.addTo(map);

export {renderMarkers};
