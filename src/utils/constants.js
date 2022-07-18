// Массив начальных мест, взятый из тренажера:
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

export const selectors = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn_submit',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: '.popup__input-error',
};

// Объявление переменных:

export const profileName = '.profile__name';
export const profileAbout = '.profile__about';
export const popupEditBtn = document.querySelector('.profile__edit-btn');
export const popupEdit = '.popup_type_edit';
export const popupFormEdit = document.querySelector('.popup__form');
export const popupInputName = document.querySelector(
  '.popup__input_type_user-name'
);
export const popupInputAbout = document.querySelector(
  '.popup__input_type_user-about'
);
export const popupAddPlace = '.popup_type_add-place';
export const popupAddBtn = document.querySelector('.profile__add-btn');
export const popupFormAddPlace = document.querySelector('.popup__form');
export const popupInputPlaceName = document.querySelector(
  '.popup__input_type_place-name'
);
export const popupInputPlaceLinkImg = document.querySelector(
  '.popup__input_type_link-img'
);
export const popupInputPlaceErrorName = document.querySelector(
  '.popup__input-error_type_place-name'
);
export const popupInputPlaceErrorLinkImg = document.querySelector(
  '.popup__input-error_type_link-img'
);

export const placesArea = '.places';
export const templatePlace = '.template-place';
export const popupShowImg = '.popup_type_show-img';
export const formValidators = {};
