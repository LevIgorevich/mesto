// Массив начальных мест, взятый из тренажера:
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

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
};

const closePopup = (popup) => {
  popup.classList.remove("popup_active");
};

const clickEditBtn = () => {
  popupInputName.value = profileName.textContent;
  popupInputAbout.value = profileAbout.textContent;
  openPopup(popupEdit);
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
popupShowImgPlace.addEventListener("click", clickShowImg);
popupShowImgCloseBtn.addEventListener("click", clickShowImgClose);
popupFormEdit.addEventListener("submit", editProfile);
popupFormAddPlace.addEventListener("submit", handleAddPlaceSumbmit);
renderCards(initialCards);
