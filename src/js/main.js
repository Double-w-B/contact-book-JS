import * as ui from "./ui.js";
import * as constructor from "./constructor.js";
import { displayMatches } from "./searchInput.js";
import { contactsSubmenu } from "./contactsSubmenu.js";
import { showAllContacts } from "./showAllContacts.js";
import { addContactModal } from "./modals/addContactModal.js";
import "../../src/scss/style.scss";
import { checkCurrentUser } from "./fetch/index.js";

const navigationLetters = document.querySelector(".letters__container");
const list = document.querySelector(".list");
const listOfContacts = document.querySelector(".list__contacts");
const contactsAmount = document.querySelector(".list__contacts-amount");
const inputContainer = document.querySelector(".input__container");
const navNewContactBtn = document.querySelector(".nav__btn--add");
const navAllContactsBtn = document.querySelector(".nav__btn--show");
const navMenuBtn = document.querySelector(".nav__btn--menu");
const searchInput = document.getElementById("search");

const modalBackdrop = document.querySelector(".modal__backdrop");
const modalAuth = document.querySelector(".modal__auth");
const modalContactInfo = document.querySelector(".modal__contact-info");
const modalContactAddEdit = document.querySelector(".modal__contact-add");
const modalContactRemove = document.querySelector(".modal__contact-delete");

const menu = document.querySelector(".menu");
const menuSelectAllBtn = document.querySelector(".menu__btn--select");
const menuUnselectAllBtn = document.querySelector(".menu__btn--unselect");
const menuRemoveSelectedBtn = document.querySelector(".menu__btn--remove");
const menuChangeModeBtn = document.querySelector(".menu__btn--mode");
const menuAuthBtn = document.querySelector(".menu__btn--auth");
const menuButtons = document.querySelectorAll(
  ".menu button:not(.menu__btn--auth)"
);

let userAuth = { isUserLoggedIn: false };
const contactsData = JSON.parse(localStorage.getItem("contacts")) || [];

if (!localStorage.theme) localStorage.theme = "light-mode";
document.body.className = localStorage.theme;


constructor.createHintIcon();
constructor.createContactsLength(contactsData);
constructor.createNavigationLetters();
constructor.createFooter();
showAllContacts();
contactsSubmenu();
checkCurrentUser();

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);

list.addEventListener("scroll", ui.hideScrollbarThumb);
navMenuBtn.addEventListener("click", () => {
  const hintIcon = document.querySelector(".hintIcon");
  menu.classList.toggle("show-menu");
  hintIcon.classList.toggle("opacity");
});
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
menuAuthBtn.addEventListener("click", ui.openAuthModal);

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
  navNewContactBtn,
  navAllContactsBtn,
  inputContainer,
  menuButtons,
  menuSelectAllBtn,
  menuUnselectAllBtn,
  menuChangeModeBtn,
  menuRemoveSelectedBtn,
  menuAuthBtn,
  list,
  menu,
  modalAuth,
  userAuth,
};
