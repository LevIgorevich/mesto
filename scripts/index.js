import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup } from "./utils.js";
const selectors = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-btn_submit",
  inactiveButtonClass: "popup__save-btn_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: ".popup__input-error",
};

// Объявление переменных:
// Редактирование профиля
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const popupEditBtn = document.querySelector(".profile__edit-btn");
const popupEdit = document.querySelector(".popup_type_edit");
const popupFormEdit = popupEdit.querySelector(".popup__form");
const popupInputName = popupEdit.querySelector(".popup__input_type_user-name");
const popupInputAbout = popupEdit.querySelector(
  ".popup__input_type_user-about"
);
const popupEditCloseBtn = popupEdit.querySelector(".popup__close-btn");

const placesArea = document.querySelector(".places");
const popupAddPlace = document.querySelector(".popup_type_add-place");
const popupAddBtn = document.querySelector(".profile__add-btn");
const popupAddBtnClose = popupAddPlace.querySelector(".popup__close-btn");
const popupFormAddPlace = popupAddPlace.querySelector(".popup__form");
const popupInputPlaceName = popupAddPlace.querySelector(
  ".popup__input_type_place-name"
);
const popupInputPlaceLinkImg = popupAddPlace.querySelector(
  ".popup__input_type_link-img"
);

const popupInputPlaceErrorName = popupAddPlace.querySelector(
  ".popup__input-error_type_place-name"
);
const popupInputPlaceErrorLinkImg = popupAddPlace.querySelector(
  ".popup__input-error_type_link-img"
);

// Функции:

// Открытие и закрытие popup'ов

const closePopup = (popup) => {
  popup.classList.remove("popup_active");
  document.addEventListener("mousedown", closePopupByOverlay);
  document.addEventListener("keydown", closePopupByEsc);
};

const clickEditBtn = () => {
  popupInputName.value = profileName.textContent;
  popupInputAbout.value = profileAbout.textContent;
  openPopup(popupEdit);
  popupInputName.dispatchEvent(new Event("input"));
  popupInputAbout.dispatchEvent(new Event("input"));
};

const clickEditBtnClose = () => {
  closePopup(popupEdit);
};

const editProfile = (evt) => {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileAbout.textContent = popupInputAbout.value;
  clickEditBtnClose();
};

const closePopupByOverlay = (evt) => {
  const overlayPopup = evt.target;
  if (overlayPopup.classList.contains("popup_active")) {
    closePopup(overlayPopup);
  }
};

const closePopupByEsc = (evt) => {
  if (evt.key == "Escape") {
    const escPopup = document.querySelector(".popup_active");
    closePopup(escPopup);
  }
};

// Добавление мест

const insertPlace = () => {
  popupFormAddPlace.reset();
  popupInputPlaceName.dispatchEvent(new Event("input"));
  popupInputPlaceLinkImg.dispatchEvent(new Event("input"));
  popupInputPlaceName.classList.remove("popup__input_type_error");
  popupInputPlaceLinkImg.classList.remove("popup__input_type_error");
  popupInputPlaceErrorName.textContent = "";
  popupInputPlaceErrorLinkImg.textContent = "";
};

const clickAddPlace = () => {
  insertPlace();
  openPopup(popupAddPlace);
};

const clickAddPlaceClose = () => {
  closePopup(popupAddPlace);
};

const prependPlace = (place) => {
  const placeItem = new Card(place, ".template-place");
  placesArea.prepend(placeItem.generatePlace());
};

const renderCards = (places) => {
  places.forEach((place) => prependPlace(place));
};

const handleAddPlaceSumbmit = (evt) => {
  evt.preventDefault();
  // place.name = popupInputPlaceName.value;
  // place.link = popupInputPlaceLinkImg.value;
  prependPlace({
    name: popupInputPlaceName.value,
    link: popupInputPlaceLinkImg.value,
  });
  clickAddPlaceClose;
};

const enableFormValidation = () => {
  const forms = Array.from(document.forms);
  forms.forEach((form) => {
    const formValidator = new FormValidator(selector, form);
    formValidator.enableValidation();
  });
};

// Нажатие кнопок
popupEditBtn.addEventListener("click", clickEditBtn);
popupEditCloseBtn.addEventListener("click", clickEditBtnClose);
popupAddBtn.addEventListener("click", clickAddPlace);
popupAddBtnClose.addEventListener("click", clickAddPlaceClose);
popupFormEdit.addEventListener("submit", editProfile);
popupFormAddPlace.addEventListener("submit", handleAddPlaceSumbmit);

renderCards(initialCards);
enableFormValidation();

export { openPopup };
