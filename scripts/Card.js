import { openPopup } from "./index.js";

export default class Card {
  constructor(data, placeSelector) {
    this._name = data.name;
    this._link = data.link;
    this._placeSelector = placeSelector;
    this._popupShowImg = document.querySelector(".popup_type_show-img");
  }

  _getTemplate() {
    const placeElement = document
      .querySelector(this._placeSelector)
      .content.querySelector(".place")
      .cloneNode(true);

    return placeElement;
  }

  _clickBtnLike = (evt) => {
    evt.target.classList.toggle("place__heart-btn_active");
  };

  _openPopupShowImg = () => {
    const showImg = this._popupShowImg.querySelector(".popup__show-img");
    const placeInfo = this._popupShowImg.querySelector(
      ".popup__place-description"
    );
    showImg.src = this._link;
    showImg.alt = this._name;
    placeInfo.textContent = this._name;
    openPopup(this._popupShowImg);
  };

  _deletePlace = (evt) => {
    const place = evt.target.closest(".place");
    place.remove();
  };

  _setEventListeners() {
    this._placeElement
      .querySelector(".place__heart-btn")
      .addEventListener("click", (evt) => this._clickBtnLike(evt));
    this._placeElement
      .querySelector(".place__trash-btn")
      .addEventListener("click", (evt) => this._deletePlace(evt));
    this._placeElement
      .querySelector(".place__img")
      .addEventListener("click", () => this._openPopupShowImg());
  }

  generatePlace() {
    this._placeElement = this._getTemplate();
    this._setEventListeners();
    const placeImg = this._placeElement.querySelector(".place__img");
    const placeName = this._placeElement.querySelector(".place__name");

    placeImg.src = this._link;
    placeImg.alt = this._name;
    placeName.textContent = this._name;

    return this._placeElement;
  }
}
