const openPopup = (popup) => {
  popup.classList.add("popup_active");
  document.addEventListener("mousedown", closePopupByOverlay);
  document.addEventListener("keydown", closePopupByEsc);
};

export { openPopup };
