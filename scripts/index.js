// Объявление переменных:

// Редактирование профиля
const profileArea = document.querySelector(".profile");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const popupEditBtn = document.querySelector(".profile__edit-btn");
const popupEdit = document.querySelector(".popup_type_edit");
const popupEditCloseBtn = popupEdit.querySelector(".popup__close-btn");
const popupFormEdit = popupEdit.querySelector(".popup__form");
const popupInputName = popupEdit.querySelector(".popup__input_type_user-name");
const popupInputAbout = popupEdit.querySelector(
  ".popup__input_type_user-about"
);

// Места
const templatePlace = document.querySelector(".template-place").content;
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

//Переменные для ошибок
const popupSubmitBtn = popupAddPlace.querySelector(".popup__save-btn_submit");
const popupInputPlaceErrorName = popupAddPlace.querySelector(
  ".popup__input-error_type_place-name"
);
const popupInputPlaceErrorLinkImg = popupAddPlace.querySelector(
  ".popup__input-error_type_link-img"
);

// Просмотр фото
const popupShowImg = document.querySelector(".popup_type_show-img");
const popupShowImgCloseBtn = popupShowImg.querySelector(".popup__close-btn");
const popupShowImgPlace = popupShowImg.querySelector(".popup__show-img");
const popupPlaceDescription = popupShowImg.querySelector(
  ".popup__place-description"
);

// Функции:

// Открытие и закрытие popup'ов
const openPopup = (popup) => {
  popup.classList.add("popup_active");
  document.addEventListener("mousedown", closePopupByOverlay);
  document.addEventListener("keydown", closePopupByEsc);
};

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

const clickAddPlace = () => {
  openPopup(popupAddPlace);
};

const clickAddPlaceClose = () => {
  closePopup(popupAddPlace);
};

const clickShowImg = (place) => {
  popupShowImgPlace.src = place.link;
  popupShowImgPlace.alt = place.name;
  popupPlaceDescription.textContent = place.name;
  openPopup(popupShowImg);
};

const clickShowImgClose = () => {
  closePopup(popupShowImg);
};

const closePopupByOverlay = (evt) => {
  const overlayPopup = evt.target;
  if (!overlayPopup.classList.contains("popup_active")) {
    closePopup(overlayPopup);
  }
  closePopup(overlayPopup);
};

const closePopupByEsc = (evt) => {
  if (evt.key == "Escape") {
    const escPopup = document.querySelector(".popup_active");
    closePopup(escPopup);
  }
};

// Редактирование профиля
const editProfile = (evt) => {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileAbout.textContent = popupInputAbout.value;
  clickEditBtnClose();
};

// Добавление мест
const insertPlace = (place) => {
  const placeItem = templatePlace.querySelector(".place").cloneNode(true);
  const placeDelete = placeItem.querySelector(".place__trash-btn");
  const placeImg = placeItem.querySelector(".place__img");
  const placeDescription = placeItem.querySelector(".place__description");
  const placeName = placeDescription.querySelector(".place__name");
  const placeHeartBtn = placeDescription.querySelector(".place__heart-btn");
  placeImg.src = place.link;
  placeImg.alt = place.name;
  placeImg.addEventListener("click", () => clickShowImg(place));
  placeName.textContent = place.name;
  placeDelete.addEventListener("click", deletePlace);
  placeHeartBtn.addEventListener("click", clickBtnLike);
  return placeItem;
};

// Добавить места из массива
const prependPlace = (place) => {
  placesArea.prepend(insertPlace(place));
};

const renderCards = (places) => {
  places.forEach((place) => prependPlace(place));
};

const handleAddPlaceSumbmit = (evt) => {
  evt.preventDefault();
  const place = {};
  place.name = popupInputPlaceName.value;
  place.link = popupInputPlaceLinkImg.value;
  prependPlace(place);
  closePopup(popupAddPlace);
  evt.target.reset();
  popupSubmitBtn.classList.add("popup__save-btn_disabled");
  popupSubmitBtn.disabled = true;
};

// Поставить лайк
const clickBtnLike = (evt) => {
  evt.target.classList.toggle("place__heart-btn_active");
};

// Удалить место
const deletePlace = (evt) => {
  const place = evt.target.closest(".place");
  place.remove();
};

// Нажатие кнопок
popupEditBtn.addEventListener("click", clickEditBtn);
popupEditCloseBtn.addEventListener("click", clickEditBtnClose);
popupAddBtn.addEventListener("click", clickAddPlace);
popupAddBtnClose.addEventListener("click", clickAddPlaceClose);
popupShowImgCloseBtn.addEventListener("click", clickShowImgClose);
popupFormEdit.addEventListener("submit", editProfile);
popupFormAddPlace.addEventListener("submit", handleAddPlaceSumbmit);
renderCards(initialCards);
