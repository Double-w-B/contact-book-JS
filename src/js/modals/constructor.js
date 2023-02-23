import * as main from "../main.js";
import * as utils from "../utils.js";
import { createButton, createNewElement } from "../constructor.js";
import { createLoadingSpinner } from "../constructor.js";

/* Single input */
export const createInputContent = (type, className) => {
  function setTitle() {
    if (type === "phone") {
      return "- only numbers - from 6 to 9 characters";
    }
    if (type === "email") {
      return "- e.g. name@mail.com";
    }
    if (type === "password") {
      return "";
    }
    return "- only Latin characters";
  }

  const inputContainer = createNewElement("div", className);

  const input = createNewElement("input");
  input.id = type;
  input.type = type.includes("password") ? "password" : "text";
  input.name = type;
  input.title = setTitle();
  input.required = true;

  if (type.includes("-")) type = type.split("-").join(" ");
  if (type === "phone") input.maxLength = "9";
  if (type === "address" || type === "notes") input.maxLength = "40";
  if (type === "password") input.maxLength = "16";

  const label = createNewElement("label");
  const labelSpan = createNewElement("span");
  const labelSpanNode = document.createTextNode("*");
  labelSpan.append(labelSpanNode);
  const labelNode = document.createTextNode(
    `${type.substring(0, 1).toUpperCase() + type.substring(1)}`
  );
  if (type === "name" || type === "surname" || type === "phone") {
    label.append(labelNode, labelSpan);
  } else {
    label.append(labelNode);
  }

  if (type === "address" || type === "notes") {
    inputContainer.append(input, label);
    return inputContainer;
  }

  if (type.includes("password")) {
    const iconContainer = createNewElement("div", "icon");
    const showPasswordIcon = createNewElement("i", "fa-solid fa-eye");
    iconContainer.append(showPasswordIcon);
    inputContainer.append(iconContainer);
  }

  if (type === "user name" || type === "user email" || type === "password") {
    const pElmErrorRequired = createNewElement("p", "error-hint-required");
    const pElmErrorNameReqNode = document.createTextNode(`${type} is required`);
    pElmErrorRequired.append(pElmErrorNameReqNode);

    inputContainer.append(input, label, pElmErrorRequired);
    return inputContainer;
  }

  const pElmErrorName = createNewElement("p", "error-hint");
  const pElmErrorNameNode = document.createTextNode(
    `invalid ${type === "phone" ? "number" : type}`
  );
  pElmErrorName.append(pElmErrorNameNode);

  const pElmErrorNameReq = createNewElement("p", "error-hint-required");
  const pElmErrorNameReqNode = document.createTextNode(
    `${type === "phone" ? "number" : type} is required`
  );
  pElmErrorNameReq.append(pElmErrorNameReqNode);

  if (type === "phone") {
    const pElmErrorLength = createNewElement("p", "error-hint-length");
    const pElmErrorLengthNode = document.createTextNode("min. 6 characters");
    pElmErrorLength.append(pElmErrorLengthNode);

    const pElmErrorNumber = createNewElement("p", "error-hint-number");
    const pElmErrorNumberNode = document.createTextNode(
      "number already exists"
    );
    pElmErrorNumber.append(pElmErrorNumberNode);

    inputContainer.append(
      input,
      label,
      pElmErrorName,
      pElmErrorNameReq,
      pElmErrorLength,
      pElmErrorNumber
    );
    return inputContainer;
  }

  inputContainer.append(input, label, pElmErrorName, pElmErrorNameReq);
  return inputContainer;
};

/* Image input */
export const createImgInput = (name, src) => {
  const themeMode = document.body.className;

  function setImgSrc() {
    if (src) return src;
    if (themeMode === "light-mode") return "./assets/camera_plus_dark.svg";
    return "./assets/camera_plus_light.svg";
  }

  function setTextNode() {
    if (!name) return "add an image";
    if (name.length > 15) return `...${name.slice(-15)}`;
    return `.../${name}`;
  }

  const imgContainer = createNewElement("div", "contact-img-upload");
  const avatarContainer = createNewElement("div", "avatar-container");

  const label = createNewElement("label");
  if (src) label.className = "disable";
  label.title = "Press camera to add an image";
  const imgEl = createNewElement("img");
  imgEl.className = src ? "" : "img-icon";
  imgEl.src = setImgSrc();
  imgEl.alt = "";

  const input = createNewElement("input");
  input.type = "file";
  input.setAttribute("accept", "image/png, image/gif, image/jpeg, image/webp");
  label.append(imgEl, input);
  const icon = createNewElement("i", `fas fa-times ${!src && "hide"}`);
  avatarContainer.append(label, icon);

  const pEl = createNewElement("p");
  const pElNode = document.createTextNode(`${setTextNode()}`);
  pEl.append(pElNode);

  imgContainer.append(avatarContainer, pEl);

  return imgContainer;
};

/* Main info AddContactModal */
export const createMainInfoStructure = () => {
  const container = createNewElement("div", "new-con-main-info");

  const mainInfoForm = createNewElement("form");
  const formInfoOne = createNewElement("div", "info-one");

  const nameInput = createInputContent("name", "name-input");
  const surnameInput = createInputContent("surname", "surname-input");
  formInfoOne.append(nameInput, surnameInput);

  const formInfoTwo = createNewElement("div", "info-two");

  const phoneInput = createInputContent("phone", "phone-input");
  const emailInput = createInputContent("email", "email-input");
  formInfoTwo.append(phoneInput, emailInput);

  mainInfoForm.append(formInfoOne, formInfoTwo);
  container.append(mainInfoForm);

  return container;
};

/* Secondary info AddContactModal*/
export const createSecondaryInfoStructure = () => {
  const container = createNewElement("div", "new-con-secondary-info");
  const form = createNewElement("form");
  const addressInput = createInputContent("address", "address-input");
  const notesInput = createInputContent("notes", "notes-input");
  const pElm = createNewElement("p", "infoMsg");

  form.append(addressInput, notesInput, pElm);
  container.append(form);

  return container;
};

/* Add contact modal */
export const createAddContactModalContent = () => {
  utils.removeChildrenElements(main.modalContactAddEdit);

  const imgSection = createImgInput(false, false);
  const mainInfo = createMainInfoStructure();
  const secondaryInfo = createSecondaryInfoStructure();

  const buttonsContainer = createNewElement("div", "new-con-btns");
  const addButton = createButton("accept", "Add");
  const cancelButton = createButton("cancel", "Close");
  const loadingSpinner = createLoadingSpinner();
  buttonsContainer.append(addButton, cancelButton, loadingSpinner);

  main.modalContactAddEdit.append(
    imgSection,
    mainInfo,
    secondaryInfo,
    buttonsContainer
  );
  return main.modalContactAddEdit;
};

/* Edit contact modal */
export const createEditContactModalContent = (name, src) => {
  utils.removeChildrenElements(main.modalContactAddEdit);

  const imgSection = createImgInput(name, src);
  const mainInfo = createMainInfoStructure();
  const secondaryInfo = createSecondaryInfoStructure();

  const buttonsContainer = createNewElement("div", "new-con-btns");
  const saveButton = createButton("save", "Save");
  const cancelButton = createButton("cancel", "Close");
  const loadingSpinner = createLoadingSpinner();
  buttonsContainer.append(saveButton, cancelButton, loadingSpinner);

  main.modalContactAddEdit.append(
    imgSection,
    mainInfo,
    secondaryInfo,
    buttonsContainer
  );

  return main.modalContactAddEdit;
};

/* Remove single contact modal */
export const createRemoveSingleContactModal = (selectedContact) => {
  utils.removeChildrenElements(main.modalContactRemove);

  const container = createNewElement("div", "confirm-container no-select");
  const questionContainer = createNewElement("div", "confirm-question");

  const span = createNewElement("span", "selected-contact");
  const spanNode = document.createTextNode(`${selectedContact}`);
  span.append(spanNode);

  const pElm = createNewElement("p");

  pElm.append("Are you sure you want to delete the ", span, " contact?");
  questionContainer.append(pElm);

  const buttonsContainer = createNewElement("div", "confirm-btns");
  const deleteButton = createButton("confirm-delete", "Delete");
  const cancelButton = createButton("confirm-cancel", "Cancel");
  const loadingSpinner = createLoadingSpinner();
  buttonsContainer.append(deleteButton, cancelButton, loadingSpinner);

  container.append(questionContainer, buttonsContainer);
  main.modalContactRemove.append(container);
  return main.modalContactRemove;
};

/* Remove many contacts modal */
export const createRemoveManyContactsModal = (itemsToRemove) => {
  utils.removeChildrenElements(main.modalContactRemove);

  const content = createNewElement("div", "confirm-container");
  const questionContainer = createNewElement("div", "confirm-question");

  const pElm = createNewElement("p");

  const span = createNewElement("span", "selected-contact");
  const spanTextNode = document.createTextNode(`${itemsToRemove.length}`);
  span.append(spanTextNode);

  const firstTextNode = document.createTextNode(
    "Are you sure you want to delete "
  );
  const secondTextNode = document.createTextNode(
    `${itemsToRemove.length < 3 ? "" : "all the "}`
  );
  const lastTextNode = document.createTextNode(
    `${itemsToRemove.length === 1 ? " contact" : " contacts"}?`
  );
  pElm.append(firstTextNode, secondTextNode, span, lastTextNode);
  questionContainer.append(pElm);

  const buttonsContainer = createNewElement("div", "confirm-btns");
  const loadingSpinner = createLoadingSpinner();

  const deleteBtn = createButton("confirm-delete", "Delete");
  const cancelBtn = createButton("confirm-cancel", "Cancel");
  buttonsContainer.append(deleteBtn, cancelBtn, loadingSpinner);

  content.append(questionContainer, buttonsContainer);
  main.modalContactRemove.append(content);
  return main.modalContactRemove;
};

/* Contact info modal */
export const createContactInfoModal = (contact) => {
  const { name, surname, phone, email, address, notes, img } = contact;
  utils.removeChildrenElements(main.modalContactInfo);

  const topInfo = createNewElement("div", "top_info");
  const topInfoImg = createNewElement("div", "top_info-avatar");

  if (img.src) {
    const contactImg = createNewElement("img", "no-select");
    contactImg.draggable = false;
    contactImg.src = img.src;
    contactImg.alt = "contact img";
    topInfoImg.append(contactImg);
  }
  if (!img.src) {
    const pElm = createNewElement("p", "no-select");
    const pElmNode = document.createTextNode(
      `${name.substring(0, 1)}${surname.substring(0, 1)}`
    );
    pElm.append(pElmNode);
    topInfoImg.append(pElm);
  }
  topInfo.append(topInfoImg);

  const bottomInfo = createNewElement("div", "bottom_info");

  const bottomInfoName = createNewElement("div", "bottom_info-name");
  const fullName = createNewElement("p");
  const fullNameNode = document.createTextNode(`${name} ${surname}`);
  fullName.append(fullNameNode);
  const underline = createNewElement("div", "bottom_info-name-underline");
  bottomInfoName.append(fullName, underline);

  const bottomInfoDetails = createNewElement("div", "bottom_info-details");
  const pElmPhone = createNewElement("p");
  const phoneIcon = createNewElement("i", "fas fa-phone no-select");
  const pElmPhoneNode = document.createTextNode(
    `${phone.replace(utils.everyThirdRegExp, " ")}`
  );
  pElmPhone.append(phoneIcon, pElmPhoneNode);

  const pElmEmail = createNewElement("p");
  const emailIcon = createNewElement("i", "fas fa-at no-select");
  const emailCopyIcon = createNewElement("i", "fas fa-copy no-select");
  emailCopyIcon.title = "copy";
  const emailCopySpan = createNewElement("span", "copied");
  const emailCopySpanNode = document.createTextNode("Copied!");
  emailCopySpan.append(emailCopySpanNode);
  const noEmailSpan = createNewElement("span");
  const noEmailSpanNode = document.createTextNode("no email passed");
  noEmailSpan.append(noEmailSpanNode);
  if (email) {
    pElmEmail.append(emailIcon, email, emailCopyIcon, emailCopySpan);
  } else {
    pElmEmail.append(emailIcon, noEmailSpan);
  }

  const pElmAddress = createNewElement("p");
  const addressIcon = createNewElement("i", "fas fa-map-marker-alt no-select");
  const addressIconNode = document.createTextNode(`\u00A0`);
  addressIcon.append(addressIconNode);
  const addressLink = createNewElement("a");
  addressLink.setAttribute("href", `http://maps.google.com/?q=${address}`);
  addressLink.setAttribute("target", "_blank");
  addressLink.draggable = false;
  const locationIcon = createNewElement("i", "fas fa-location-arrow");
  addressLink.append(locationIcon);
  const addressSpan = createNewElement("span");
  const addressSpanNode = document.createTextNode("no address passed");
  addressSpan.append(addressSpanNode);
  if (address) {
    pElmAddress.append(addressIcon, address, addressLink);
  } else {
    pElmAddress.append(addressIcon, addressSpan);
  }

  const pElmNotes = createNewElement("p");
  const notesIcon = createNewElement("i", "far fa-edit no-select");
  const notesSpan = createNewElement("span");
  const notesSpanNode = document.createTextNode("no notes passed");
  notesSpan.append(notesSpanNode);
  if (notes) {
    pElmNotes.append(notesIcon, notes);
  } else {
    pElmNotes.append(notesIcon, notesSpan);
  }

  const closeButton = createButton("bottom_info-close-btn", "Close");

  bottomInfoDetails.append(
    pElmPhone,
    pElmEmail,
    pElmAddress,
    pElmNotes,
    closeButton
  );
  bottomInfo.append(bottomInfoName, bottomInfoDetails);
  main.modalContactInfo.append(topInfo, bottomInfo);
  return main.modalContactInfo;
};

/* Auth modal */
export const createAuthModal = () => {
  utils.removeChildrenElements(main.modalAuth);

  const credentials = createNewElement("div", "modal__auth__credentials");
  const emailInput = createInputContent("user-email", "userEmail-input");
  const passwordInput = createInputContent("password", "password-input");
  const pElm = createNewElement("p", "infoMsg");
  credentials.append(emailInput, passwordInput, pElm);

  const changeButtonContainer = createNewElement("div", "modal__auth__change");
  const changeButton = createButton("modal__auth__change__button", "register");
  const loadingIcon = createLoadingSpinner();
  changeButtonContainer.append(changeButton, loadingIcon);

  const buttonsContainer = createNewElement("div", "modal__auth__buttons");
  const loginButton = createButton("modal__auth__buttons-auth", "login");
  const closeButton = createButton("modal__auth__buttons-close", "close");
  buttonsContainer.append(loginButton, closeButton);

  main.modalAuth.append(credentials, changeButtonContainer, buttonsContainer);

  return main.modalAuth;
};

export const createUpdateDataModal = () => {
  utils.removeChildrenElements(main.modalUpdateData);

  const credentials = createNewElement("div", "modal__update__credentials");
  const nameInput = createInputContent("user-name", "userName-input");
  const newNameInput = createInputContent("new-name", "newUserName-input");

  const pElm = createNewElement("p", "infoMsg");
  credentials.append(nameInput, newNameInput, pElm);

  const changeButtonsContainer = createNewElement(
    "div",
    "modal__update__change"
  );
  const changeNameButton = createButton(
    "modal__update__change__button-name",
    "name"
  );
  changeNameButton.classList.add("active");
  const changeEmailButton = createButton(
    "modal__update__change__button-email",
    "email"
  );
  const changePasswordButton = createButton(
    "modal__update__change__button-password",
    "password"
  );

  const loadingIcon = createLoadingSpinner();
  changeButtonsContainer.append(
    changeNameButton,
    changePasswordButton,
    changeEmailButton,
    loadingIcon
  );

  const buttonsContainer = createNewElement("div", "modal__update__buttons");
  const loginButton = createButton("modal__update__buttons-update", "update");
  const closeButton = createButton("modal__update__buttons-close", "close");
  buttonsContainer.append(loginButton, closeButton);

  main.modalUpdateData.append(
    credentials,
    changeButtonsContainer,
    buttonsContainer
  );

  const userNameInput = credentials.querySelector(".userName-input input");
  userNameInput.value = main.userAuth.userName;

  return main.modalUpdateData;
};

export const createUserRemoveModal = () => {
  utils.removeChildrenElements(main.modalAccountRemove);

  const infoContainer = createNewElement("div", "modal__account__alert");
  const header = createNewElement("p");
  header.textContent = "Confirm password to continue";
  const mainAlert = createNewElement("p");
  const secondaryAlert = createNewElement("p");

  mainAlert.textContent =
    "Your account and all your contacts will be permanently deleted.";
  secondaryAlert.textContent = "You will no longer be able to log in.";
  infoContainer.append(header, mainAlert, secondaryAlert);

  const form = createNewElement("form");
  const passwordInput = createInputContent("password", "password-input");
  const pElm = createNewElement("p", "infoMsg");
  form.append(passwordInput, pElm);

  const loadingIcon = createLoadingSpinner();

  const buttonsContainer = createNewElement("div", "modal__account__buttons");
  const confirmButton = createButton(
    "modal__account__buttons-confirm",
    "confirm"
  );
  const closeButton = createButton("modal__account__buttons-close", "close");
  buttonsContainer.append(confirmButton, closeButton, loadingIcon);

  main.modalAccountRemove.append(infoContainer, form, buttonsContainer);
};
