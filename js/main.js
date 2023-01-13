import * as ui from "./ui.js";
import * as constructor from "./constructor.js";
import { displayMatches } from "./searchInput.js";
import { contactSubmenu } from "./contactSubmenu.js";
import { showAllContacts } from "./showAllContacts.js";
import { addContactModal } from "./modals/addContactModal.js";

const navigationLetters = document.querySelector(".letters__container");
const contacts = document.querySelector(".list__contacts");
const list = document.querySelector(".list");
const navNewContactBtn = document.querySelector(".nav__btn--add");
const navAllContactsBtn = document.querySelector(".nav__btn--show");
const navMenuBtn = document.querySelector(".nav__btn--menu");
const contactsAmount = document.querySelector(".list__contacts-amount");
const modalOverlay = document.querySelector(".modal__overlay");
const modalContainerInfo = document.querySelector(".modal__contact-info");
const modalContainerAddEdit = document.querySelector(".modal__contact-add");
const modalContainerRemoveSelected = document.querySelector(
  ".modal__contact-delete"
);
const searchInput = document.getElementById("search");
const searchIcon = document.querySelector(".fa-search");

const menu = document.querySelector(".menu");
const menuSelectAllBtn = document.querySelector(".menu__btn--select");
const menuUnselectAllBtn = document.querySelector(".menu__btn--unselect");
const menuRemoveSelectedBtn = document.querySelector(".menu__btn--remove");
const menuChangeModeBtn = document.querySelector(".menu__btn--mode");

let peopleData = JSON.parse(localStorage.getItem("contacts")) || [];

if (!localStorage.theme) localStorage.theme = "light-mode";
document.body.className = localStorage.theme;

constructor.createContactsLength(peopleData);
constructor.createFooter();

showAllContacts();
contactSubmenu();

/* Input styling */
searchInput.addEventListener("mouseover", () =>
  searchIcon.classList.add("input-hover")
);
searchInput.addEventListener("mouseleave", () =>
  searchIcon.classList.remove("input-hover")
);
searchInput.addEventListener("focus", () =>
  searchIcon.classList.add("input-focus")
);
searchInput.addEventListener("blur", () =>
  searchIcon.classList.remove("input-focus")
);

list.addEventListener("scroll", ui.hideScrollbarThumb);
navMenuBtn.addEventListener("click", () => menu.classList.toggle("show-menu"));
document.addEventListener("click", ui.hideMenu);

navNewContactBtn.addEventListener("click", addContactModal);
navAllContactsBtn.addEventListener("click", showAllContacts);

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);

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
  peopleData,
  navigationLetters,
  contacts,
  modalOverlay,
  modalContainerAddEdit,
  modalContainerInfo,
  modalContainerRemoveSelected,
  contactsAmount,
  searchInput,
  navMenuBtn,
  menuSelectAllBtn,
  menuUnselectAllBtn,
  menuChangeModeBtn,
  menuRemoveSelectedBtn,
  list,
  menu,
};
