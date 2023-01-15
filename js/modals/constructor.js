import { createButton } from "../constructor.js";
import * as main from "../main.js";
import { removeChildrenElements } from "../utils.js";

/* Single input */
const createInputContent = (type, className) => {
  const setTitle = () => {
    if (type === "phone") {
      return "- only numbers - from 6 to 9 characters";
    }
    if (type === "email") {
      return "- e.g. name@mail.com";
    }
    return "- only Latin characters";
  };

  const inputContainer = document.createElement("div");
  inputContainer.className = className;

  const input = document.createElement("input");
  input.id = type;
  input.type = "text";
  input.name = type;
  input.title = setTitle();
  input.required = true;
  if (type === "phone") input.maxLength = "9";
  if (type === "address" || type === "notes") input.maxLength = "40";

  const label = document.createElement("label");
  const labelSpan = document.createElement("span");
  const labelSpanNode = document.createTextNode("*");
  labelSpan.append(labelSpanNode);
  const labelNode = document.createTextNode(
    `${type.substring(0, 1).toUpperCase() + type.substring(1)}`
  );
  if (type === "email" || type === "address" || type === "notes") {
    label.append(labelNode);
  } else {
    label.append(labelNode, labelSpan);
  }

  if (type === "address" || type === "notes") {
    inputContainer.append(input, label);
    return inputContainer;
  }

  const pElmErrorName = document.createElement("p");
  pElmErrorName.className = "error-hint";
  const pElmErrorNameNode = document.createTextNode(
    `invalid ${type === "phone" ? "number" : type}`
  );
  pElmErrorName.append(pElmErrorNameNode);
  const pElmErrorNameReq = document.createElement("p");
  pElmErrorNameReq.className = "error-hint-required";
  const pElmErrorNameReqNode = document.createTextNode(
    `${type === "phone" ? "number" : type} is required`
  );
  pElmErrorNameReq.append(pElmErrorNameReqNode);

  if (type === "phone") {
    const pElmErrorLength = document.createElement("p");
    pElmErrorLength.className = "error-hint-length";
    const pElmErrorLengthNode = document.createTextNode("min. 6 characters");
    pElmErrorLength.append(pElmErrorLengthNode);

    const pElmErrorNumber = document.createElement("p");
    pElmErrorNumber.className = "error-hint-number";
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
    if (themeMode === "light-mode") return "../../icons/camera_plus_dark.svg";
    return "../../icons/camera_plus_light.svg";
  }

  function setTextNode() {
    if (!name) return "add an image";
    if (name.length > 15) return `...${name.slice(-15)}`;
    return name;
  }

  const imgContainer = document.createElement("div");
  imgContainer.className = "contact-img-upload";

  const avatarContainer = document.createElement("div");
  avatarContainer.className = "avatar-container";

  const label = document.createElement("label");
  label.title = "Press camera to add an image";
  const imgEl = document.createElement("img");
  imgEl.className = src ? "" : "img-icon";
  imgEl.src = setImgSrc();
  imgEl.alt = "";

  const input = document.createElement("input");
  input.type = "file";
  label.append(imgEl, input);
  const icon = document.createElement("i");
  icon.className = `fas fa-times ${!src && "hide"}`;
  avatarContainer.append(label, icon);

  const pEl = document.createElement("p");
  const pElNode = document.createTextNode(`${setTextNode()}`);
  pEl.append(pElNode);

  imgContainer.append(avatarContainer, pEl);

  return imgContainer;
};

/* Main info */
export const createMainInfoStructure = () => {
  const mainInfoContainer = document.createElement("div");
  mainInfoContainer.className = "new-con-main-info";

  const mainInfoForm = document.createElement("form");
  const formInfoOne = document.createElement("div");
  formInfoOne.className = "info-one";

  const nameInput = createInputContent("name", "name-input");
  const surnameInput = createInputContent("surname", "surname-input");
  formInfoOne.append(nameInput, surnameInput);

  const formInfoTwo = document.createElement("div");
  formInfoTwo.className = "info-two";

  const phoneInput = createInputContent("phone", "phone-input");
  const emailInput = createInputContent("email", "email-input");
  formInfoTwo.append(phoneInput, emailInput);

  mainInfoForm.append(formInfoOne, formInfoTwo);
  mainInfoContainer.append(mainInfoForm);

  return mainInfoContainer;
};

/* Secondary info */
export const createSecondaryInfoStructure = () => {
  const secondaryInfoContainer = document.createElement("div");
  secondaryInfoContainer.className = "new-con-secondary-info";

  const secondaryInfoForm = document.createElement("form");

  const addressInput = createInputContent("address", "address-input");
  const notesInput = createInputContent("notes", "notes-input");
  secondaryInfoForm.append(addressInput, notesInput);
  secondaryInfoContainer.append(secondaryInfoForm);

  return secondaryInfoContainer;
};

/* Add contact modal */
export const createAddContactModalContent = () => {
  removeChildrenElements(main.modalContactAddEdit);

  const imgSection = createImgInput(false, false);
  const mainInfo = createMainInfoStructure();
  const secondaryInfo = createSecondaryInfoStructure();

  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "new-con-btns";
  const addButton = createButton("accept", "Add");
  const cancelButton = createButton("cancel", "Cancel");
  buttonsContainer.append(addButton, cancelButton);

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
  removeChildrenElements(main.modalContactAddEdit);

  const imgSection = createImgInput(name, src);
  const mainInfo = createMainInfoStructure();
  const secondaryInfo = createSecondaryInfoStructure();

  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "new-con-btns";
  const saveButton = createButton("save", "Save");
  const cancelButton = createButton("cancel", "Cancel");
  buttonsContainer.append(saveButton, cancelButton);

  main.modalContactAddEdit.append(
    imgSection,
    mainInfo,
    secondaryInfo,
    buttonsContainer
  );

  return main.modalContactAddEdit;
};

export const createRemoveSingleContactModal = (selectedContact) => {
  removeChildrenElements(main.modalContactRemove);

  const container = document.createElement("div");
  container.className = "confirm-container  no-select";

  const questionContainer = document.createElement("div");
  questionContainer.className = "confirm-question";

  const span = document.createElement("span");
  span.className = "selected-contact";
  const spanNode = document.createTextNode(`${selectedContact}`);
  span.append(spanNode);

  const pElm = document.createElement("p");

  pElm.append("Are you sure you want to delete the ", span, " contact?");
  questionContainer.append(pElm);

  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "confirm-btns";
  const deleteButton = createButton("confirm-delete", "Delete");
  const cancelButton = createButton("confirm-cancel", "Cancel");
  buttonsContainer.append(deleteButton, cancelButton);
  container.append(questionContainer, buttonsContainer);
  main.modalContactRemove.append(container);
  return main.modalContactRemove;
};

export const createContactInfoModal = (contact) => {
  const { name, surname, phone, email, address, notes, img } = contact;
  removeChildrenElements(main.modalContactInfo);

  function creteIcon(className) {
    const icon = document.createElement("i");
    icon.className = className;
    return icon;
  }

  const topInfo = document.createElement("div");
  topInfo.className = "top_info";
  const topInfoImg = document.createElement("div");
  topInfoImg.className = "top_info-avatar";
  if (img.src) {
    const contactImg = document.createElement("img");
    contactImg.className = "no-select";
    contactImg.draggable = false;
    contactImg.src = img.src;
    contactImg.alt = "contact img";
    topInfoImg.append(contactImg);
  }
  if (!img.src) {
    const pElm = document.createElement("p");
    pElm.className = "no-select";
    const pElmNode = document.createTextNode(
      `${name.substring(0, 1)}${surname.substring(0, 1)}`
    );
    pElm.append(pElmNode);
    topInfoImg.append(pElm);
  }
  topInfo.append(topInfoImg);

  const bottomInfo = document.createElement("div");
  bottomInfo.className = "bottom_info";

  const bottomInfoName = document.createElement("div");
  bottomInfoName.className = "bottom_info-name";
  const fullName = document.createElement("p");
  const fullNameNode = document.createTextNode(`${name} ${surname}`);
  fullName.append(fullNameNode);
  const underline = document.createElement("div");
  underline.className = "bottom_info-name-underline";
  bottomInfoName.append(fullName, underline);

  const bottomInfoDetails = document.createElement("div");
  bottomInfoDetails.className = "bottom_info-details";
  const pElmPhone = document.createElement("p");
  const phoneIcon = creteIcon("fas fa-phone-alt no-select");
  const pElmPhoneNode = document.createTextNode(
    `${phone.replace(main.everyThirdRegExp, " ")}`
  );
  pElmPhone.append(phoneIcon, pElmPhoneNode);

  const pElmEmail = document.createElement("p");
  const emailIcon = creteIcon("fas fa-at no-select");
  const emailCopyIcon = creteIcon("fas fa-copy no-select");
  emailCopyIcon.title = "copy";
  const emailCopySpan = document.createElement("span");
  emailCopySpan.className = "copied";
  const emailCopySpanNode = document.createTextNode("Copied!");
  emailCopySpan.append(emailCopySpanNode);
  const noEmailSpan = document.createElement("span");
  const noEmailSpanNode = document.createTextNode("no email passed");
  noEmailSpan.append(noEmailSpanNode);
  if (email) {
    pElmEmail.append(emailIcon, email, emailCopyIcon, emailCopySpan);
  } else {
    pElmEmail.append(emailIcon, noEmailSpan);
  }

  const pElmAddress = document.createElement("p");
  const addressIcon = creteIcon("fas fa-map-marker-alt no-select");
  const addressIconNode = document.createTextNode(`\u00A0`);
  addressIcon.append(addressIconNode);
  const addressLink = document.createElement("a");
  addressLink.setAttribute("href", `http://maps.google.com/?q=${address}`);
  addressLink.setAttribute("target", "_blank");
  addressLink.draggable = false;
  const locationIcon = creteIcon("fas fa-location-arrow");
  addressLink.append(locationIcon);
  const addressSpan = document.createElement("span");
  const addressSpanNode = document.createTextNode("no address passed");
  addressSpan.append(addressSpanNode);
  if (address) {
    pElmAddress.append(addressIcon, address, addressLink);
  } else {
    pElmAddress.append(addressIcon, addressSpan);
  }

  const pElmNotes = document.createElement("p");
  const notesIcon = creteIcon("far fa-edit no-select");
  const notesSpan = document.createElement("span");
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
