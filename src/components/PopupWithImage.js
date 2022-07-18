import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._place = this._popup.querySelector('.popup__show-img');
    this._placeDesctiption = this._popup.querySelector(
      '.popup__place-description'
    );
  }

  open({ name, link }) {
    this._place.src = link;
    this._place.alt = name;
    this._placeDesctiption.textContent = name;
    super.open();
  }
}
