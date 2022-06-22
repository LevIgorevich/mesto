import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";

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

const placesArea = document.querySelector(".places");
const popupAddPlace = document.querySelector(".popup_type_add-place");
const popupAddBtn = document.querySelector(".profile__add-btn");
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

const clickEditBtn = () => {
  popupInputName.value = profileName.textContent;
  popupInputAbout.value = profileAbout.textContent;
  openPopup(popupEdit);
  popupInputName.dispatchEvent(new Event("input"));
  popupInputAbout.dispatchEvent(new Event("input"));
};

const editProfile = (evt) => {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileAbout.textContent = popupInputAbout.value;
  closePopup(popupEdit);
};

const clickUniClosePopup = (evt) => {
  if (
    evt.target.classList.contains("popup__close-btn") ||
    evt.target.classList.contains("popup")
  ) {
    closePopup(evt.target.closest(".popup"));
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

const prependPlace = (place) => {
  const placeItem = new Card(place, ".template-place");
  placesArea.prepend(placeItem.generatePlace());
};

const renderCards = (places) => {
  places.forEach((place) => prependPlace(place));
};

const handleAddPlaceSumbmit = (evt) => {
  evt.preventDefault();
  prependPlace({
    name: popupInputPlaceName.value,
    link: popupInputPlaceLinkImg.value,
  });
  closePopup(popupAddPlace);
};

const formValidator = {};
const enableFormValidation = () => {
  Array.from(document.forms).forEach((form) => {
    formValidator[form.name] = new FormValidator(selectors, form);
    formValidator[form.name].enableValidation();
  });
};

// Нажатие кнопок
popupEditBtn.addEventListener("click", clickEditBtn);
popupAddBtn.addEventListener("click", clickAddPlace);
document.addEventListener("mousedown", clickUniClosePopup);
popupFormEdit.addEventListener("submit", editProfile);
popupFormAddPlace.addEventListener("submit", handleAddPlaceSumbmit);

renderCards(initialCards);
enableFormValidation();
