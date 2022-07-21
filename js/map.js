import { renderCard } from './card.js';

const DEFAULT_ZOOM = 13;
const COORDS_DIGITS = 5;
const addressInputElement = document.querySelector('#address');
const defaultCoords = {
  lat: '35.68950',
  lng: '139.69200',
};
const map = L.map('map-canvas');

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
  defaultCoords,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

const adPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const setAdress = (lat, lng) => {
  const addressLat = lat;
  const addressLng = lng;
  addressInputElement.value =  `Широта: ${addressLat}, долгота: ${addressLng}`;
};

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

const clearMarkers = () => {
  markerGroup.clearLayers();
};

export {
  map,
  defaultCoords,
  DEFAULT_ZOOM,
  setAdress,
  clearMarkers,
  mainPinMarker,
  createMarker
};
