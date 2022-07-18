export default class FormValidator {
  constructor(selector, form) {
    this._inactiveButtonClass = selector.inactiveButtonClass;
    this._inputErrorClass = selector.inputErrorClass;
    this._errorClass = selector.errorClass;
    this._form = form;
    this._inputList = Array.from(
      this._form.querySelectorAll(selector.inputSelector)
    );
    this._saveButton = this._form.querySelector(selector.submitButtonSelector);
  }

  _showError = (input) => {
    const inputError = document.querySelector(
      `${this._errorClass}_type_${input.id}`
    );
    input.classList.add(this._inputErrorClass);
    inputError.textContent = input.validationMessage;
  };

  _hideError = (input) => {
    const inputError = document.querySelector(
      `${this._errorClass}_type_${input.id}`
    );
    input.classList.remove(this._inputErrorClass);
    inputError.textContent = "";
  };

  _checkInputValidity = (input) => {
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    }
  };

  _hasInvalidInput = () => {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._saveButton.classList.add(this._inactiveButtonClass);
      this._saveButton.disabled = true;
    } else {
      this._saveButton.classList.remove(this._inactiveButtonClass);
      this._saveButton.disabled = false;
    }
  };

  _setEventListeners = () => {
    this._toggleButtonState();

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  };

  resetValidation = () => {
    this._inputList.forEach((input) => {
      this._hideError(input);
    });

    this._toggleButtonState();
  };

  enableValidation = () => {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  };
}
