const selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-btn_submit",
  inactiveButtonClass: "popup__save-btn_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: ".popup__input-error",
};

const showError = (input, errorClass, inputErrorClass) => {
  const inputError = document.querySelector(`${errorClass}_type_${input.id}`);
  input.classList.add(inputErrorClass);
  inputError.textContent = input.validationMessage;
};

const hideError = (input, errorClass, inputErrorClass) => {
  const inputError = document.querySelector(`${errorClass}_type_${input.id}`);
  input.classList.remove(inputErrorClass);
  inputError.textContent = "";
};

const checkInputValidity = (input, errorClass, inputErrorClass) => {
  if (!input.validity.valid) {
    showError(input, errorClass, inputErrorClass);
  } else {
    hideError(input, errorClass, inputErrorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, saveButton, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    saveButton.classList.add(inactiveButtonClass);
    saveButton.disabled = true;
  } else {
    saveButton.classList.remove(inactiveButtonClass);
    saveButton.disabled = false;
  }
};

const setEventListeners = (
  form,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) => {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const saveButton = form.querySelector(submitButtonSelector);

  toggleButtonState(inputList, saveButton, inactiveButtonClass);

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(input, errorClass, inputErrorClass);

      toggleButtonState(inputList, saveButton, inactiveButtonClass);
    });
  });
};

const enableValidation = (selectors) => {
  const formList = Array.from(
    document.querySelectorAll(selectors.formSelector)
  );

  formList.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(
      form,
      selectors.inputSelector,
      selectors.submitButtonSelector,
      selectors.inactiveButtonClass,
      selectors.inputErrorClass,
      selectors.errorClass
    );
  });
};

enableValidation(selectors);
