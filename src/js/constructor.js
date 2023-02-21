import { alphabet } from "./data/data.js";
import * as utils from "./utils.js";
import * as main from "./main.js";

export function createNewElement(elm, elmClass) {
  const newElm = document.createElement(elm);
  if (elmClass) {
    newElm.className = elmClass;
    return newElm;
  }
  return newElm;
}

export const createButton = (className, text) => {
  const button = createNewElement("button", className);
  const node = document.createTextNode(text);
  button.append(node);
  return button;
};

export function createIconButton(iconClass, btnClass, txt) {
  const button = createNewElement("button", btnClass);
  const btnTxt = document.createTextNode(txt);
  const span = createNewElement("span");
  const i = createNewElement("i", iconClass);
  span.append(i);
  if (!txt) {
    button.append(span);
    return button;
  }
  button.append(span, btnTxt);
  return button;
}

/* Info icon */
export const createInfoIcon = (text, iconClassName) => {
  const container = createNewElement("div", "message");

  const iconContainer = createNewElement("div", "message__icon no-select");
  const icon = createNewElement("i", iconClassName);
  iconContainer.append(icon);

  const pElm = createNewElement("p", "message__text no-select");
  const textNode = document.createTextNode(text);
  pElm.append(textNode);

  container.append(iconContainer, pElm);
  main.listOfContacts.append(container);
};

/* Contacts length */
export const createContactsLength = (array) => {
  const pElm = createNewElement("p");
  const textNode = document.createTextNode(`Contacts: ${array.length}`);
  pElm.append(textNode);
  main.contactsAmount.append(pElm);
};

/* Navigation letters */
export const createNavigationLetters = () => {
  const availableLetters = utils.filteredFirstLetters();

  utils.removeChildrenElements(main.navigationLetters);

  for (const letter of alphabet) {
    const letterContainer = createNewElement("div");
    letterContainer.className = `${
      availableLetters.includes(letter) ? "letters__letter" : "no-name"
    } no-select`;
    const linkElm = createNewElement("a");
    linkElm.setAttribute("href", `#${letter}`);
    const linkNode = document.createTextNode(`${letter}`);
    linkElm.append(linkNode);
    letterContainer.append(linkElm);
    main.navigationLetters.append(letterContainer);
  }

  const freeSpaceDiv = createNewElement("div", "free-space");
  main.navigationLetters.append(freeSpaceDiv);
  return main.navigationLetters;
};

/* Footer */
export const createFooter = () => {
  const footer = document.querySelector("footer");

  const currentYear = new Date().getFullYear();

  const pElm = createNewElement("p");
  const pElmText = document.createTextNode(
    `\u00A9 ${currentYear} All Rights Reserved. made by `
  );

  const link = createNewElement("a");
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

  const parentLiElm = createNewElement("li");
  const ulElm = createNewElement("ul", "contact-list");
  const liElm = createNewElement("li", "one-child");
  liElm.id = _id;

  const contactImg = createNewElement("div", "contact-img no-select");
  const firstIcon = createNewElement("i", "fas fa-check");
  const secondIcon = createNewElement("i", "fas fa-check hover hide");
  const imgElm = createNewElement("img");
  imgElm.src = img.src ? img.src : "";
  const pElmInitials = createNewElement("p");
  const pElmInitialsNode = document.createTextNode(
    `${name.slice(0, 1)}${surname.slice(0, 1)}`
  );
  pElmInitials.append(pElmInitialsNode);
  const avatar = img.src ? imgElm : pElmInitials;
  contactImg.append(firstIcon, secondIcon, avatar);

  const infoContainer = createNewElement("div", "contact");
  const fullNameElm = createNewElement("p", "fullName");
  const fullNameNode = document.createTextNode(`${name} ${surname}`);
  fullNameElm.append(fullNameNode);
  const phoneElm = createNewElement("p");
  const phoneIcon = createNewElement("i", "fas fa-phone");
  const phoneElNode = document.createTextNode(
    `${phone.replace(utils.everyThirdRegExp, " ")}`
  );
  phoneElm.append(phoneIcon, phoneElNode);
  infoContainer.append(fullNameElm, phoneElm);

  const submenuImg = createNewElement("div", "submenu-icon");
  const submenuIcon = createNewElement("img");
  submenuIcon.src = "./assets/arrowDown.svg";
  submenuIcon.alt = "";
  submenuImg.append(submenuIcon);

  const submenuContainer = createNewElement("div", "submenu");
  const editButton = createButton("editCon", "Edit");
  const sendEmailButton = createButton("sendEm", "Send email");
  const deleteButton = createButton("deleteCon", "Delete");
  const emailLink = createNewElement("a");
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
  const parentLi = createNewElement("li", "letter-section");
  parentLi.id = `${letter}`;

  const letterSection = createNewElement("div", "alphabet-sequence no-select");
  const pElm = createNewElement("p");
  const pElmNode = document.createTextNode(`${letter}`);
  pElm.append(pElmNode);
  letterSection.append(pElm);

  const ulElm = createNewElement("ul", "contact-list");

  parentLi.append(letterSection, ulElm);
  return parentLi;
};

/* Loading Spinner */
export const createLoadingSpinner = () => {
  const container = createNewElement("div", "loadingIcon");

  for (let i = 0; i < 4; i++) {
    const div = createNewElement("div");
    container.append(div);
  }

  return container;
};

/* Hint Icon */
export const createHintIcon = () => {
  const container = createNewElement("div", "hintIcon");

  for (let i = 0; i < 3; i++) {
    const div = createNewElement("div");
    container.append(div);
  }
  main.nav.append(container);
};

export function createMenu() {
  const ulContainer = createNewElement("ul");

  const accountLi = createNewElement("li", "hide");
  const accountButton = createIconButton(
    "fa-solid fa-circle-user",
    "menu__btn--account",
    "Account"
  );
  const ulAccount = createNewElement("ul");
  const updateDataLi = createNewElement("li");
  const updateDataButton = createButton("menu__btn--update", "Update data");
  updateDataLi.append(updateDataButton);
  const removeAccountLi = createNewElement("li");
  const removeAccountButton = createButton(
    "menu__btn--remove-user",
    "Remove Account"
  );
  removeAccountLi.append(removeAccountButton);
  ulAccount.append(updateDataLi, removeAccountLi);
  accountLi.append(accountButton, ulAccount);

  const contactsLi = createNewElement("li", "hide");
  const contactsButton = createIconButton(
    "fa-solid fa-users",
    "menu__btn--contacts",
    "Contacts"
  );
  const ulContacts = createNewElement("ul");
  const selectAllLi = createNewElement("li");
  const selectAllButton = createButton("menu__btn--select", "Select all");
  selectAllLi.append(selectAllButton);
  const unselectAllLi = createNewElement("li");
  const unselectAllButton = createButton("menu__btn--unselect", "Unselect all");
  unselectAllLi.append(unselectAllButton);
  const removeSelectedLi = createNewElement("li");
  const removeSelectedButton = createButton(
    "menu__btn--remove",
    "Remove Selected"
  );
  removeSelectedLi.append(removeSelectedButton);
  ulContacts.append(selectAllLi, unselectAllLi, removeSelectedLi);
  contactsLi.append(contactsButton, ulContacts);

  const themeLi = createNewElement("li");
  const themeButton = createIconButton(
    "fa-solid fa-moon",
    "menu__btn--mode",
    "Dark Theme"
  );
  themeLi.append(themeButton);

  const authLi = createNewElement("li");
  const authButton = createIconButton(
    "fa-solid fa-arrow-right-to-bracket",
    "menu__btn--auth",
    "Log in"
  );
  authLi.append(authButton);
  ulContainer.append(accountLi, contactsLi, themeLi, authLi);
  main.menu.append(ulContainer);
}

export function createNav() {
  const inputContainer = createNewElement("div", "input__container disable");

  const input = createNewElement("input");
  input.type = "text";
  input.id = "search";
  input.placeholder = "Name, number ...";
  input.onfocus = function () {
    this.placeholder = "";
  };
  input.onblur = function () {
    this.placeholder = "Name, number ...";
  };
  input.autocomplete = "off";
  input.setAttribute("required", true);

  const searchIconContainer = createNewElement("div", "input__search-icon");
  const searchIcon = createNewElement("i", "fas fa-search");
  searchIconContainer.append(searchIcon);

  inputContainer.append(input, searchIconContainer);
  const addButton = createIconButton(
    "fas fa-user-plus",
    "nav__btn--add hide no-select",
    "Add New"
  );
  const listButton = createIconButton(
    "fas fa-address-book",
    "nav__btn--show hide no-select",
    "List"
  );
  const menuButton = createIconButton(
    "fas fa-bars",
    "nav__btn--menu no-select"
  );

  main.nav.append(inputContainer, addButton, listButton, menuButton);
}

export function createModals() {
  const modals = [
    "modal__auth",
    "modal__contact-info",
    "modal__contact-add",
    "modal__contact-delete",
    "modal__account-update",
    "modal__account-delete",
  ];

  for (let modal of modals) {
    const div = createNewElement("div", modal);
    main.modalBackdrop.append(div);
  }
}
