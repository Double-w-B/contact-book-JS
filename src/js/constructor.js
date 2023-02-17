import { alphabet } from "./data/data.js";
import * as utils from "./utils.js";
import * as main from "./main.js";

/* Info icon */
export const createInfoIcon = (text, iconClassName) => {
  const container = document.createElement("div");
  container.className = "message";

  const iconContainer = document.createElement("div");
  iconContainer.className = "message__icon no-select";
  const icon = document.createElement("i");
  icon.className = iconClassName;
  iconContainer.append(icon);

  const pElm = document.createElement("p");
  pElm.className = "message__text no-select";
  const textNode = document.createTextNode(text);
  pElm.append(textNode);

  container.append(iconContainer, pElm);
  main.listOfContacts.append(container);
};

/* Contacts length */
export const createContactsLength = (array) => {
  const pElm = document.createElement("p");
  const textNode = document.createTextNode(`Contacts: ${array.length}`);
  pElm.append(textNode);
  main.contactsAmount.append(pElm);
};

/* Navigation letters */
export const createNavigationLetters = () => {
  const availableLetters = utils.filteredFirstLetters();

  utils.removeChildrenElements(main.navigationLetters);

  for (const letter of alphabet) {
    const letterContainer = document.createElement("div");
    letterContainer.className = `${
      availableLetters.includes(letter) ? "letters__letter" : "no-name"
    } no-select`;
    const linkElm = document.createElement("a");
    linkElm.setAttribute("href", `#${letter}`);
    const linkNode = document.createTextNode(`${letter}`);
    linkElm.append(linkNode);
    letterContainer.append(linkElm);
    main.navigationLetters.append(letterContainer);
  }

  const freeSpaceDiv = document.createElement("div");
  freeSpaceDiv.className = "free-space";
  main.navigationLetters.append(freeSpaceDiv);
  return main.navigationLetters;
};

/* Single button */
export const createButton = (className, text) => {
  const button = document.createElement("button");
  button.className = className;
  const node = document.createTextNode(text);
  button.append(node);
  return button;
};

/* Footer */
export const createFooter = () => {
  const footer = document.querySelector("footer");

  const currentYear = new Date().getFullYear();

  const pElm = document.createElement("p");
  const pElmText = document.createTextNode(
    `\u00A9 ${currentYear} All Rights Reserved. made by `
  );

  const link = document.createElement("a");
  link.setAttribute("href", "https://github.com/Double-w-B");
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener noreferrer");
  const linkText = document.createTextNode("Wladyslaw Balandin");
  link.append(linkText);
  pElm.append(pElmText, link);
  footer.append(pElm);
  return footer;
};

/* Single contact */
export const createContact = (contact, goal) => {
  const { name, surname, phone, email, img, _id } = contact;
  const parentLiElm = document.createElement("li");

  const ulElm = document.createElement("ul");
  ulElm.className = "contact-list";

  const liElm = document.createElement("li");
  liElm.className = "one-child";
  liElm.id = _id;

  const contactImg = document.createElement("div");
  contactImg.className = "contact-img no-select";
  const firstIcon = document.createElement("i");
  firstIcon.className = "fas fa-check";
  const secondIcon = document.createElement("i");
  secondIcon.className = "fas fa-check hover hide";
  const imgElm = document.createElement("img");
  imgElm.src = img.src ? img.src : "";
  const pElmInitials = document.createElement("p");
  const pElmInitialsNode = document.createTextNode(
    `${name.slice(0, 1)}${surname.slice(0, 1)}`
  );
  pElmInitials.append(pElmInitialsNode);
  const avatar = img.src ? imgElm : pElmInitials;
  contactImg.append(firstIcon, secondIcon, avatar);

  const infoContainer = document.createElement("div");
  infoContainer.className = "contact";
  const fullNameElm = document.createElement("p");
  fullNameElm.className = "fullName";
  const fullNameNode = document.createTextNode(`${name} ${surname}`);
  fullNameElm.append(fullNameNode);
  const phoneElm = document.createElement("p");
  const phoneIcon = document.createElement("i");
  phoneIcon.className = "fas fa-phone";
  const phoneElNode = document.createTextNode(
    `${phone.replace(utils.everyThirdRegExp, " ")}`
  );
  phoneElm.append(phoneIcon, phoneElNode);
  infoContainer.append(fullNameElm, phoneElm);

  const submenuImg = document.createElement("div");
  submenuImg.className = "submenu-icon";
  const submenuIcon = document.createElement("img");
  submenuIcon.src = "./assets/arrowDown.svg";
  submenuIcon.alt = "";
  submenuImg.append(submenuIcon);

  const submenuContainer = document.createElement("div");
  submenuContainer.className = "submenu";
  const editButton = createButton("editCon", "Edit");
  const sendEmailButton = createButton("sendEm", "Send email");
  const deleteButton = createButton("deleteCon", "Delete");
  const emailLink = document.createElement("a");
  emailLink.setAttribute("href", `mailto:${email ? email : ""}`);
  emailLink.append(sendEmailButton);
  submenuContainer.append(editButton, emailLink, deleteButton);

  liElm.append(contactImg, infoContainer, submenuImg, submenuContainer);
  ulElm.append(liElm);
  parentLiElm.append(ulElm);

  if (goal === "shawAll") {
    return liElm;
  }
  return parentLiElm;
};

/* Letter section */
export const createLetterSection = (letter) => {
  const parentLi = document.createElement("li");
  parentLi.className = "letter-section";
  parentLi.id = `${letter}`;

  const letterSection = document.createElement("div");
  letterSection.className = "alphabet-sequence no-select";
  const pElm = document.createElement("p");
  const pElmNode = document.createTextNode(`${letter}`);
  pElm.append(pElmNode);
  letterSection.append(pElm);

  const ulElm = document.createElement("ul");
  ulElm.className = "contact-list";

  parentLi.append(letterSection, ulElm);
  return parentLi;
};

/* Loading Spinner */
export const createLoadingSpinner = () => {
  const container = document.createElement("div");
  container.className = "loadingIcon";
  const divOne = document.createElement("div");
  const divTwo = document.createElement("div");
  const divThree = document.createElement("div");
  const divFour = document.createElement("div");
  container.append(divOne, divTwo, divThree, divFour);
  return container;
};

/* Hint Icon */
export const createHintIcon = () => {
  const nav = document.querySelector("nav");

  const container = document.createElement("div");
  container.className = "hintIcon";
  const divOne = document.createElement("div");
  const divTwo = document.createElement("div");
  const divThree = document.createElement("div");
  container.append(divOne, divTwo, divThree);
  nav.append(container);
};
