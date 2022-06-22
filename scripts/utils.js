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

const closePopupByOverlay = (evt) => {
  if (evt.target.classList.contains("popup_active")) {
    const overlayPopup = evt.target;
    closePopup(overlayPopup);
  }
};

const closePopupByEsc = (evt) => {
  if (evt.key == "Escape") {
    const escPopup = document.querySelector(".popup_active");
    closePopup(escPopup);
  }
};

export { openPopup, closePopup };
