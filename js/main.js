import * as ui from "./ui.js";
import * as constructor from "./constructor.js";
import { displayMatches } from "./searchInput.js";
import { contactsSubmenu } from "./contactsSubmenu.js";
import { showAllContacts } from "./showAllContacts.js";
import { addContactModal } from "./modals/addContactModal.js";

const navigationLetters = document.querySelector(".letters__container");
const listOfContacts = document.querySelector(".list__contacts");
const list = document.querySelector(".list");
const navNewContactBtn = document.querySelector(".nav__btn--add");
const navAllContactsBtn = document.querySelector(".nav__btn--show");
const navMenuBtn = document.querySelector(".nav__btn--menu");
const contactsAmount = document.querySelector(".list__contacts-amount");
const modalBackdrop = document.querySelector(".modal__overlay");
const modalContactInfo = document.querySelector(".modal__contact-info");
const modalContactAddEdit = document.querySelector(".modal__contact-add");
const modalContactRemove = document.querySelector(".modal__contact-delete");
const searchInput = document.getElementById("search");

const menu = document.querySelector(".menu");
const menuSelectAllBtn = document.querySelector(".menu__btn--select");
const menuUnselectAllBtn = document.querySelector(".menu__btn--unselect");
const menuRemoveSelectedBtn = document.querySelector(".menu__btn--remove");
const menuChangeModeBtn = document.querySelector(".menu__btn--mode");

const contactsData = JSON.parse(localStorage.getItem("contacts")) || [];

class Person {
  constructor(name, surname, phone, email, address, notes, imgSrc, imgName) {
    this.name = name.toLowerCase();
    this.surname = surname.toLowerCase();
    this.phone = phone;
    this.email = email.toLowerCase();
    this.address = address;
    this.notes = notes;
    this.img = { src: imgSrc, name: imgName };
  }
}

/* Regular expressions */
const onlyNumbers = /^[0-9]+$/;
const textRegExp = /[ĄĆĘÓŚŻŹŁŃŚąćęóśżźłńś^0-9^а-я]/;
const emailRegExp = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
const everyThirdRegExp = /(?!^)(?=(?:\d{3})+(?:\.|$))/gm;
const mobileRegExp =
  /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/;
const tabletRegExp = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i;
/* Regular expressions */

if (!localStorage.theme) localStorage.theme = "light-mode";
document.body.className = localStorage.theme;

constructor.createContactsLength(contactsData);
constructor.createFooter();

showAllContacts();
contactsSubmenu();

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);

list.addEventListener("scroll", ui.hideScrollbarThumb);
navMenuBtn.addEventListener("click", () => menu.classList.toggle("show-menu"));
document.addEventListener("click", ui.hideMenu);

navNewContactBtn.addEventListener("click", addContactModal);
navAllContactsBtn.addEventListener("click", showAllContacts);

navigationLetters.addEventListener("click", ui.scrollTo);
menuChangeModeBtn.addEventListener("click", ui.themeMode);
menuRemoveSelectedBtn.addEventListener("click", ui.handleRemoveSelected);
menuSelectAllBtn.addEventListener("click", () =>
  ui.handleSelection("selectAll")
);
menuUnselectAllBtn.addEventListener("click", () =>
  ui.handleSelection("unselectAll")
);

export {
  contactsData,
  navigationLetters,
  listOfContacts,
  modalBackdrop,
  modalContactAddEdit,
  modalContactInfo,
  modalContactRemove,
  contactsAmount,
  searchInput,
  navMenuBtn,
  menuSelectAllBtn,
  menuUnselectAllBtn,
  menuChangeModeBtn,
  menuRemoveSelectedBtn,
  list,
  menu,
  textRegExp,
  emailRegExp,
  everyThirdRegExp,
  mobileRegExp,
  tabletRegExp,
  onlyNumbers,
  Person,
};
