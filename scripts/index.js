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
let profileArea = document.querySelector(".profile");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");
let popupEditBtn = document.querySelector(".profile__edit-btn");
let popupEdit = document.querySelector(".popup_type_edit");
let popupEditCloseBtn = popupEdit.querySelector(".popup__close-btn");
let popupFormEdit = popupEdit.querySelector(".popup__form");
let popupInputName = popupEdit.querySelector(".popup__input_type_user-name");
let popupInputAbout = popupEdit.querySelector(".popup__input_type_user-about");

// Места
let templatePlace = document.querySelector(".template-place").content;
let placesArea = document.querySelector(".places");
let popupAddPlace = document.querySelector(".popup_type_add-place");
let popupAddBtn = document.querySelector(".profile__add-btn");
let popupAddBtnClose = popupAddPlace.querySelector(".popup__close-btn");
let popupFormAddPlace = popupAddPlace.querySelector(".popup__form");
let popupInputPlaceName = popupAddPlace.querySelector(
  ".popup__input_type_place-name"
);
let popupInputPlaceLinkImg = popupAddPlace.querySelector(
  ".popup__input_type_link-img"
);

// Просмотр фото
let popupShowImg = document.querySelector(".popup_type_show-img");
let popupShowImgCloseBtn = popupShowImg.querySelector(".popup__close-btn");
let popupShowImgPlace = popupShowImg.querySelector(".popup__show-img");
let popupPlaceDescription = popupShowImg.querySelector(
  ".popup__place-description"
);

// Функции:

// Открытие и закрытие popup'ов
let openPopup = (popup) => {
  popup.classList.add("popup__active");
};

let closePopup = (popup) => {
  popup.classList.remove("popup__active");
};

let clickEditBtn = () => {
  popupInputName.value = profileName.textContent;
  popupInputAbout.value = profileAbout.textContent;
  openPopup(popupEdit);
};

let clickEditBtnClose = () => {
  closePopup(popupEdit);
};

let clickAddPlace = () => {
  popupFormAddPlace.reset();
  openPopup(popupAddPlace);
};

let clickAddPlaceClose = () => {
  closePopup(popupAddPlace);
};

let clickShowImg = (place) => {
  popupShowImgPlace.src = place.link;
  popupShowImgPlace.alt = place.name;
  popupPlaceDescription.textContent = place.name;
  openPopup(popupShowImg);
};

let clickShowImgClose = () => {
  closePopup(popupShowImg);
};

// Редактирование профиля
let editProfile = (evt) => {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileAbout.textContent = popupInputAbout.value;
  clickEditBtnClose();
};

// Добавление мест
let addPlace = (place) => {
  let placeItem = templatePlace.querySelector(".place").cloneNode(true);
  let placeDelete = placeItem.querySelector(".place__trash-btn");
  let placeImg = placeItem.querySelector(".place__img");
  let placeDescription = placeItem.querySelector(".place__description");
  let placeName = placeDescription.querySelector(".place__name");
  let placeHeartBtn = placeDescription.querySelector(".place__heart-btn");
  placeImg.src = place.link;
  placeImg.alt = place.name;
  placeImg.addEventListener("click", () => clickShowImg(place));
  placeName.textContent = place.name;
  placeDelete.addEventListener("click", deletePlace);
  placeHeartBtn.addEventListener("click", clickBtnLike);
  return placeItem;
};

// Добавить места из массива
let getPlace = (place) => {
  placesArea.prepend(addPlace(place));
};

let getPlaces = (places) => {
  places.forEach((place) => getPlace(place));
};

let addPlaceSumbmit = (evt) => {
  evt.preventDefault();
  let place = {};
  place.name = popupInputPlaceName.value;
  place.link = popupInputPlaceLinkImg.value;
  getPlace(place);
  closePopup(popupAddPlace);
};

// Поставить лайк
let clickBtnLike = (evt) => {
  evt.target.classList.toggle("place__heart-btn_active");
};

// Удалить место
let deletePlace = (evt) => {
  let place = evt.target.closest(".place");
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
popupFormAddPlace.addEventListener("submit", addPlaceSumbmit);
getPlaces(initialCards);
