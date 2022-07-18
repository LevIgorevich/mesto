export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeByEsc = this._closeByEsc.bind(this);
    this._handleClose = this._handleClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_active');
    document.addEventListener('keydown', this._closeByEsc);
  }

  close() {
    this._popup.classList.remove('popup_active');
    document.removeEventListener('keydown', this._closeByEsc);
  }

  _closeByEsc(evt) {
    if (evt.key !== 'Escape') return;
    this.close();
  }

  _handleClose(evt) {
    if (
      evt.target.classList.contains('popup__close-btn') ||
      evt.target.classList.contains('popup')
    ) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', this._handleClose);
  }
}
