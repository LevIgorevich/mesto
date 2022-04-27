let popup = document.querySelector(".popup");
let popupOpenBtn = document.querySelector(".profile__edit-btn");
let popupCloseBtn = document.querySelector(".popup__close-btn");
let popupSaveBtn = document.querySelector(".popup__save-btn");
let popupForm = document.querySelector(".popup__form");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");
let inputName = document.querySelector("#user-name");
let inputAbout = document.querySelector("#user-about");

function openPopup(){
    popup.classList.add('popup__active');
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
}

function closePopup(){
    popup.classList.remove('popup__active');
}

function editProfile(event){
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    closePopup();
}

popupOpenBtn.addEventListener('click', openPopup);

popupCloseBtn.addEventListener('click', closePopup);

popupForm.addEventListener('submit', editProfile);

