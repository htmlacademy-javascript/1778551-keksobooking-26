const TYPES_PHOTO = ['jpg', 'jpeg', 'png'];
const fileAvatarElement = document.querySelector('.ad-form-header__input');
const previewAvatarElement = document.querySelector('.ad-form-header__preview img');
const filePhotoHomeElement = document.querySelector('.ad-form__input');
const previewPhotoHomeElement = document.querySelector('.ad-form__photo');

const uploadAvatar = () => {
  fileAvatarElement.addEventListener('change', () => {
    const file = fileAvatarElement.files[0];
    const fileName = file.name.toLowerCase();

    const matches = TYPES_PHOTO.some((item) => fileName.endsWith(item));

    if (matches) {
      previewAvatarElement.src = URL.createObjectURL(file);
    }
  });
};

const uploadHomePhoto = () => {
  filePhotoHomeElement.addEventListener('change', () => {
    const file = filePhotoHomeElement.files[0];
    const fileName = file.name.toLowerCase();

    const matches = TYPES_PHOTO.some((item) => fileName.endsWith(item));

    if (matches) {
      const imgPhoto = document.createElement('img');
      imgPhoto.style.width = '80px';
      imgPhoto.style.height = '80px';
      imgPhoto.src = URL.createObjectURL(file);
      previewPhotoHomeElement.appendChild(imgPhoto);
    }
  });
};

export {
  uploadAvatar,
  uploadHomePhoto,
  previewAvatarElement,
  previewPhotoHomeElement
};
