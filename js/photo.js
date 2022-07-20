const TYPES_PHOTO = ['jpg', 'jpeg', 'png'];
const fileAvatar = document.querySelector('.ad-form-header__input');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const filePhotoHome = document.querySelector('.ad-form__input');
const previewPhotoHome = document.querySelector('.ad-form__photo');

const uploadAvatar = () => {
  fileAvatar.addEventListener('change', () => {
    const file = fileAvatar.files[0];
    const fileName = file.name.toLowerCase();

    const matches = TYPES_PHOTO.some((item) => fileName.endsWith(item));

    if (matches) {
      previewAvatar.src = URL.createObjectURL(file);
    }
  });
};

const uploadHomePhoto = () => {
  filePhotoHome.addEventListener('change', () => {
    const file = filePhotoHome.files[0];
    const fileName = file.name.toLowerCase();

    const matches = TYPES_PHOTO.some((item) => fileName.endsWith(item));

    if (matches) {
      const imgPhoto = document.createElement('img');
      imgPhoto.style.width = '80px';
      imgPhoto.style.height = '80px';
      imgPhoto.src = URL.createObjectURL(file);
      previewPhotoHome.appendChild(imgPhoto);
    }
  });
};

export {
  uploadAvatar,
  uploadHomePhoto,
  previewAvatar,
  previewPhotoHome
};
