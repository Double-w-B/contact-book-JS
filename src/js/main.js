import * as ui from "./ui.js";
import * as modal from "./modals";
import * as constructor from "./constructor.js";
import { searchDebounce } from "./searchInput.js";
import { contactsSubmenu } from "./contactsSubmenu.js";
import { showAllContacts } from "./showAllContacts.js";
import { checkCurrentUser } from "./fetch/index.js";
import "../../src/scss/style.scss";

const userAuth = { isUserLoggedIn: false, userName: "", userEmail: "" };
const data = { contacts: [] };
const contactImage = {
  cloudinaryImageId: "",
  contactImageName: "",
  contactImageUrl: "",
};

const nav = document.querySelector("nav");
const menu = document.querySelector(".menu");
const list = document.querySelector(".list");
const listOfContacts = document.querySelector(".list__contacts");
const navigationLetters = document.querySelector(".letters__container");
const contactsAmount = document.querySelector(".list__contacts-amount");
const modalBackdrop = document.querySelector(".modal__backdrop");

constructor.createNav();
constructor.createMenu();
constructor.createHintIcon();
constructor.createNavigationLetters();
constructor.createContactsLength(data.contacts);
constructor.createFooter();
constructor.createModals();

const navInputContainer = document.querySelector(".input__container");
const navSearchInput = document.getElementById("search");
const navAllContactsBtn = document.querySelector(".nav__btn--show");
const navNewContactBtn = document.querySelector(".nav__btn--add");
const navMenuBtn = document.querySelector(".nav__btn--menu");
const navHintIcon = document.querySelector(".hintIcon");

const modalAuth = document.querySelector(".modal__auth");
const modalContactInfo = document.querySelector(".modal__contact-info");
const modalContactAddEdit = document.querySelector(".modal__contact-add");
const modalContactRemove = document.querySelector(".modal__contact-delete");
const modalUpdateData = document.querySelector(".modal__account-update");
const modalAccountRemove = document.querySelector(".modal__account-delete");

const menuSelectAllBtn = document.querySelector(".menu__btn--select");
const menuUnselectAllBtn = document.querySelector(".menu__btn--unselect");
const menuRemoveSelectedBtn = document.querySelector(".menu__btn--remove");
const menuChangeModeBtn = document.querySelector(".menu__btn--mode");
const menuUpdateDataBtn = document.querySelector(".menu__btn--update");
const menuAuthBtn = document.querySelector(".menu__btn--auth");
const menuAccountBtn = document.querySelector(".menu__btn--account");
const menuContactsBtn = document.querySelector(".menu__btn--contacts");
const menuRemoveAccountBtn = document.querySelector(".menu__btn--remove-user");
const menuAllOptions = document.querySelectorAll(".menu > ul > li");

const menuButtons = document.querySelectorAll(
  ".menu button:not(.menu__btn--auth)"
);

if (!localStorage.theme) localStorage.theme = "light-mode";
document.body.className = localStorage.theme;

if (localStorage.theme === "dark-mode") {
  const icon = menuChangeModeBtn.querySelector("i");
  icon.className = "fa-solid fa-sun";
  menuChangeModeBtn.childNodes[1].textContent = "Light Theme";
}

showAllContacts();
contactsSubmenu();
checkCurrentUser();
ui.checkWindowResize();

document.addEventListener("click", ui.hideMenu);
window.addEventListener("resize", ui.checkWindowResize);

navSearchInput.addEventListener("change", searchDebounce());
navSearchInput.addEventListener("keyup", searchDebounce());
navMenuBtn.addEventListener("click", ui.handleMenuButton);
navNewContactBtn.addEventListener("click", modal.addContactModal);
navAllContactsBtn.addEventListener("click", showAllContacts);
navigationLetters.addEventListener("click", ui.scrollTo);

menuChangeModeBtn.addEventListener("click", ui.themeMode);
menuRemoveSelectedBtn.addEventListener("click", modal.removeManyContactsModal);
menuSelectAllBtn.addEventListener("click", () =>
  ui.handleSelection("selectAll")
);
menuUnselectAllBtn.addEventListener("click", () =>
  ui.handleSelection("unselectAll")
);
menuAuthBtn.addEventListener("click", ui.openAuthModal);
menuUpdateDataBtn.addEventListener("click", ui.openUpdateDataModal);
menuAccountBtn.addEventListener("click", ui.showMenuOptions);
menuContactsBtn.addEventListener("click", ui.showMenuOptions);
menuRemoveAccountBtn.addEventListener("click", ui.openRemoveAccountModal);
list.addEventListener("scroll", ui.hideScrollbarThumb);

export {
  data,
  nav,
  list,
  menu,
  userAuth,
  contactImage,
  listOfContacts,
  navigationLetters,
  contactsAmount,
  navSearchInput,
  navMenuBtn,
  navHintIcon,
  navNewContactBtn,
  navAllContactsBtn,
  navInputContainer,
  menuButtons,
  menuSelectAllBtn,
  menuUnselectAllBtn,
  menuChangeModeBtn,
  menuRemoveSelectedBtn,
  menuUpdateDataBtn,
  menuAuthBtn,
  menuAccountBtn,
  menuContactsBtn,
  menuAllOptions,
  modalBackdrop,
  modalAuth,
  modalContactAddEdit,
  modalContactInfo,
  modalContactRemove,
  modalUpdateData,
  modalAccountRemove,
};
