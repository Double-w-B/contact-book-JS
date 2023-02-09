import * as main from "./main.js";
import { showAllContacts } from "./showAllContacts.js";
import * as fetchData from "./fetch/index.js";
/* Remove children elements */
export const removeChildrenElements = (parentElm) => {
  while (parentElm.firstChild) {
    parentElm.removeChild(parentElm.firstChild);
  }
};

/* Check letter section */
export const checkLetterSection = () => {
  const letterSection = document.querySelectorAll(".letter-section");
  letterSection.forEach((element) => {
    const letterSectionLength = element.children[1].children.length;
    if (letterSectionLength === 0) element.remove();
    showAllContacts();
  });
};

/* Detect user device */
export const deviceType = () => {
  const userAgent = navigator.userAgent;

  if (tabletRegExp.test(userAgent)) {
    return "tablet";
  } else if (mobileRegExp.test(userAgent)) {
    return "mobile";
  }
  return "desktop";
};

/* Filter contacts names first letter */
export const filteredFirstLetters = () => {
  const namesFirstLetter = main.data.contacts.map((i) => i.name.slice(0, 1));
  const filteredLetters = [...new Set(namesFirstLetter)];
  return filteredLetters;
};

/* Add avatar image */
export const addImage = (reader) => {
  const uploaded = reader.result;
  const inputImg = document.querySelector("input[type=file]");
  const inputImgContainer = document.querySelector(".avatar-container label");
  const inputImgName = document.querySelector(".contact-img-upload p");
  const inputImage = document.querySelector("input[type=file]").files[0];
  const avatarImg = document.createElement("img");
  const inputImgRemoveBtn = document.querySelector(
    ".avatar-container .fa-times"
  );


  inputImgName.innerText =
    inputImage.name.length > 15
      ? `...${inputImage.name.slice(-15)}`
      : `.../${inputImage.name}`;

  inputImgContainer.insertBefore(avatarImg, inputImg);
  inputImgContainer.removeChild(inputImgContainer.children[0]);
  inputImgContainer.children[0].src = uploaded;
  inputImgContainer.children[0].draggable = false;
  inputImgContainer.children[0].className = "no-select";
  inputImgRemoveBtn.classList.remove("hide");

  const contactImage = new FormData();
  contactImage.append("image", inputImage);
  fetchData.uploadContactImage(contactImage);
};

/* Remove avatar image*/
export const removeImage = () => {
  const inputImgContainer = document.querySelector(".avatar-container label");
  const inputImgInput = document.querySelector("input[type=file]");
  const inputImgName = document.querySelector(".contact-img-upload p");
  const inputImgRemoveBtn = document.querySelector(
    ".avatar-container .fa-times"
  );

  const themeMode = document.body.className;
  const avatarImg = document.createElement("img");
  inputImgContainer.insertBefore(avatarImg, inputImgInput);
  inputImgContainer.removeChild(inputImgContainer.children[0]);

  const inputImg = document.querySelector(".avatar-container label img");
  inputImg.classList.add("img-icon");
  inputImgRemoveBtn.classList.add("hide");
  inputImg.src =
    themeMode === "light-mode"
      ? "./assets/camera_plus_dark.svg"
      : "./assets/camera_plus_light.svg";

  inputImgName.textContent = "add an image";
};

class Person {
  constructor(
    name,
    surname,
    phone,
    email,
    address,
    notes,
    imgSrc,
    imgName,
    imgId
  ) {
    this.name = name.toLowerCase();
    this.surname = surname.toLowerCase();
    this.phone = phone;
    this.email = email.toLowerCase();
    this.address = address;
    this.notes = notes;
    this.img = { src: imgSrc, name: imgName, id: imgId };
  }
}

/* Regular expressions */
const onlyNumbersRegExp = /^[0-9]+$/;
const textRegExp = /[ĄĆĘÓŚŻŹŁŃŚąćęóśżźłńś^0-9^а-я]/;
const emailRegExp = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
const everyThirdRegExp = /(?!^)(?=(?:\d{3})+(?:\.|$))/gm;
const mobileRegExp =
  /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/;
const tabletRegExp = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i;

export {
  Person,
  onlyNumbersRegExp,
  textRegExp,
  emailRegExp,
  everyThirdRegExp,
  mobileRegExp,
  tabletRegExp,
};
