import './index.css'; // добавьте импорт главного файла стилей

import {
  initialCards,
  selectors,
  profileName,
  profileAbout,
  popupEditBtn,
  popupEdit,
  popupInputName,
  popupInputAbout,
  placesArea,
  templatePlace,
  popupAddPlace,
  popupAddBtn,
  popupShowImg,
  formValidators,
} from '../utils/constants.js';

import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

// Функции:

const enableFormValidation = () => {
  const forms = Array.from(document.forms);
  forms.forEach((form) => {
    const formValidator = new FormValidator(selectors, form);
    const formName = form.getAttribute('name');
    formValidators[formName] = formValidator;
    formValidator.enableValidation();
  });
};

enableFormValidation();

const popupWithImage = new PopupWithImage(popupShowImg);
popupWithImage.setEventListeners();

const createPlace = ({ name, link }) => {
  const place = new Card(
    {
      name,
      link,
      showImg: () => {
        popupWithImage.open({ name, link });
      },
    },
    templatePlace
  );
  const placeElement = place.generatePlace();

  return placeElement;
};

const placeList = new Section(
  {
    data: initialCards,
    renderer: (placeItem) => {
      const placeElement = createPlace(placeItem);
      placeList.setItem(placeElement);
    },
  },
  placesArea
);

placeList.renderItems();

const userInfo = new UserInfo({
  nameSelector: profileName,
  aboutSelector: profileAbout,
});

const popupEditProfile = new PopupWithForm(
  {
    initializeForm: () => {
      const userData = userInfo.getUserInfo();
      popupInputName.value = userData.name;
      popupInputAbout.value = userData.about;
      formValidators['popupEditForm'].resetValidation();
    },
    handleSubmit: (evt) => {
      evt.preventDefault();

      const inputValues = popupEditProfile.getInputValues();
      userInfo.setUserInfo(inputValues);

      popupEditProfile.close();
    },
  },
  popupEdit
);

popupEditProfile.setEventListeners();
popupEditBtn.addEventListener(
  'click',
  popupEditProfile.open.bind(popupEditProfile)
);

const popupAddPlaces = new PopupWithForm(
  {
    initializeForm: () => {
      formValidators['popupAddPlaceForm'].resetValidation();
    },
    handleSubmit: (evt) => {
      evt.preventDefault();

      const inputValues = popupAddPlaces.getInputValues();
      const placeItem = {
        name: inputValues['placeName'],
        link: inputValues['linkImg'],
      };

      const placeElement = createPlace(placeItem);
      placeList.setItem(placeElement);
      popupAddPlaces.close();
    },
  },
  popupAddPlace
);
popupAddPlaces.setEventListeners();
popupAddBtn.addEventListener('click', popupAddPlaces.open.bind(popupAddPlaces));
