import * as ui from "./ui.js";
import * as constructor from "./constructor.js";
import { displayMatches } from "./searchInput.js";
import { contactsSubmenu } from "./contactsSubmenu.js";
import { showAllContacts } from "./showAllContacts.js";
import { addContactModal } from "./modals/addContactModal.js";
import { checkCurrentUser } from "./fetch/index.js";
import "../../src/scss/style.scss";

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
const modalUpdateData = document.querySelector(".modal__contact-update");
const modalAuth = document.querySelector(".modal__auth");
const modalContactInfo = document.querySelector(".modal__contact-info");
const modalContactAddEdit = document.querySelector(".modal__contact-add");
const modalContactRemove = document.querySelector(".modal__contact-delete");

const menu = document.querySelector(".menu");
const menuSelectAllBtn = document.querySelector(".menu__btn--select");
const menuUnselectAllBtn = document.querySelector(".menu__btn--unselect");
const menuRemoveSelectedBtn = document.querySelector(".menu__btn--remove");
const menuChangeModeBtn = document.querySelector(".menu__btn--mode");
const menuUpdateDataBtn = document.querySelector(".menu__btn--update");
const menuAuthBtn = document.querySelector(".menu__btn--auth");
const menuButtons = document.querySelectorAll(
  ".menu button:not(.menu__btn--auth)"
);

const userAuth = { isUserLoggedIn: false, userName: "", userEmail: "" };
const data = { contacts: [] };

if (!localStorage.theme) localStorage.theme = "light-mode";
document.body.className = localStorage.theme;

constructor.createHintIcon();
constructor.createContactsLength(data.contacts);
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
menuUpdateDataBtn.addEventListener("click", ui.openUpdateDataModal);

export {
  data,
  navigationLetters,
  listOfContacts,
  modalBackdrop,
  modalContactAddEdit,
  modalContactInfo,
  modalContactRemove,
  modalUpdateData,
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
  menuUpdateDataBtn,
  menuAuthBtn,
  list,
  menu,
  modalAuth,
  userAuth,
};
