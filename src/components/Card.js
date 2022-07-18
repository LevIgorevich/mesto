export default class Card {
  constructor({ name, link, showImg }, placeSelector) {
    this._name = name;
    this._link = link;
    this._placeSelector = placeSelector;
    this._showImg = showImg;
  }

  _getTemplate() {
    const placeElement = document
      .querySelector(this._placeSelector)
      .content.querySelector('.place')
      .cloneNode(true);

    return placeElement;
  }

  _clickBtnLike = (evt) => {
    evt.target.classList.toggle('place__heart-btn_active');
  };

  _deletePlace = (evt) => {
    this._placeElement.remove();
    this._placeElement = null;
  };

  _setEventListeners() {
    this._placeElement
      .querySelector('.place__heart-btn')
      .addEventListener('click', (evt) => this._clickBtnLike(evt));
    this._placeElement
      .querySelector('.place__trash-btn')
      .addEventListener('click', (evt) => this._deletePlace(evt));
    this._placeElement
      .querySelector('.place__img')
      .addEventListener('click', () => this._showImg());
  }

  generatePlace() {
    this._placeElement = this._getTemplate();
    this._setEventListeners();
    const placeImg = this._placeElement.querySelector('.place__img');
    const placeName = this._placeElement.querySelector('.place__name');

    placeImg.src = this._link;
    placeImg.alt = this._name;
    placeName.textContent = this._name;

    return this._placeElement;
  }
}
