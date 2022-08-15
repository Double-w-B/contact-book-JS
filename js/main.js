import { sideLetters } from "./sideLetters.js";
import { addContactModal } from "./modals/addContactModal.js";
import { checkConLength } from "./checkContainerLength.js";
import { displayMatches } from "./searchInput.js";
import { showAllContacts } from "./showAllContacts.js";
import { contactSubmenu } from "./contactSubmenu.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const sideLettersContainer = $(".letters__container");
const contacts = $(".list__contacts");
const list = $(".list");
const navNewContactBtn = $(".nav__btn--add");
const navAllContactsBtn = $(".nav__btn--show");
const navMenuBtn = $(".nav__btn--menu");
const contactsAmount = $(".list__contacts-amount");
const modalOverlay = $(".modal__overlay");
const modalContainerInfo = $(".modal__contact-info");
const modalContainerAddEdit = $(".modal__contact-add");
const modalContainerRemoveSelected = $(".modal__contact-delete");
const searchInput = document.getElementById("search");
const searchIcon = $(".fa-search");

const menu = $(".menu");
const menuSelectAllBtn = $(".menu__btn--select");
const menuUnselectAllBtn = $(".menu__btn--unselect");
const menuRemoveSelectedBtn = $(".menu__btn--remove");
const menuChangeModeBtn = $(".menu__btn--mode");

const footer = $("footer");

let peopleData = JSON.parse(localStorage.getItem("contacts")) || [];

if (!localStorage.theme) localStorage.theme = "light-mode";
document.body.className = localStorage.theme;

sideLettersContainer.innerHTML = sideLetters();

contactsAmount.innerHTML = `<p>Contacts: ${peopleData.length}</p>`;

/* Detect user device */
const deviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  } else if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile";
  }
  return "desktop";
};

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

/* Hide scrollbar */
const scrollbarThumb = () => {
  list.classList.add("move");
  setTimeout(() => {
    list.classList.remove("move");
  }, 700);
};
list.addEventListener("scroll", scrollbarThumb);

navMenuBtn.addEventListener("click", () => menu.classList.toggle("show-menu"));
document.addEventListener("click", (e) => {
  menu.classList.contains("show-menu") &&
    e.target !== menuSelectAllBtn &&
    e.target !== menuUnselectAllBtn &&
    e.target !== menuRemoveSelectedBtn &&
    e.target !== navMenuBtn &&
    menu.classList.remove("show-menu");
});

navNewContactBtn.addEventListener("click", addContactModal);
navAllContactsBtn.addEventListener("click", showAllContacts);

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);

showAllContacts();
contactSubmenu();

/* Remove selected contacts */

menuRemoveSelectedBtn.addEventListener("click", () => {
  const contactImg = $$(".contact-img");
  let itemsToRemove = [];

  contactImg.forEach((li) => {
    const parentElId = li.parentElement.id;
    li.firstElementChild.classList.contains("show-checked") &&
      itemsToRemove.push(parentElId);
  });

  if (itemsToRemove.length === 0) return;

  menu.classList.remove("show-menu");
  modalOverlay.classList.add("open-modal");
  modalContainerRemoveSelected.classList.add("open-modal");

  modalContainerRemoveSelected.innerHTML = `
                        <div class="confirm-container">
                        <div class="confirm-question">
                            <p>Are you sure you want to delete
                             ${itemsToRemove.length < 5 ? "" : "all the"}
                             <span class="selected-contact">
                            ${itemsToRemove.length}</span> 
                            ${
                              itemsToRemove.length === 1
                                ? "contact"
                                : "contacts"
                            }?
                            </p>
                        </div>
                        <div class="confirm-btns">
                            <button class="confirm-delete">Delete</button>
                            <button class="confirm-cancel">Cancel</button>
                        </div>
                    </div>`;

  const btnConfirm = $(".confirm-delete");
  const btnCancel = $(".confirm-cancel");

  /* Confirm Btn */
  btnConfirm.addEventListener("click", (e) => {
    e.stopPropagation();
    /* find the index of selected object */
    itemsToRemove.map((id) =>
      peopleData.map(
        (person) =>
          person.phone === id &&
          peopleData.splice(peopleData.indexOf(person), 1)
      )
    );

    contactImg.forEach(
      (li) =>
        li.firstElementChild.classList.contains("show-checked") &&
        li.parentElement.remove()
    );

    modalOverlay.classList.remove("open-modal");
    modalContainerRemoveSelected.classList.remove("open-modal");
    sideLettersContainer.innerHTML = sideLetters();
    contactsAmount.innerHTML = `<p>Contacts: ${peopleData.length}</p>`;
    checkConLength();
    itemsToRemove = [];
    localStorage.setItem("contacts", JSON.stringify(peopleData));
  });

  /* Cancel Btn */
  btnCancel.addEventListener("click", (e) => {
    e.stopPropagation();

    modalOverlay.classList.remove("open-modal");
    modalContainerRemoveSelected.classList.remove("open-modal");
    itemsToRemove = [];
  });
});

/* Move To */
sideLettersContainer.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.hasAttribute("href")) {
    const id = e.target.getAttribute("href").slice(1);

    if (document.getElementById(id) === null) return;

    const element = document.getElementById(id);
    let position = element.offsetTop - 15;

    list.scrollTo({
      left: 0,
      top: position,
    });
  }
});

/* Dark/Light mode */
const themeMode = () => {
  if (document.body.classList.contains("dark-mode")) {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    localStorage.theme = document.body.className;

    setTimeout(() => {
      menuChangeModeBtn.innerText = "Dark mode";
    }, 300);
  } else {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
    localStorage.theme = document.body.className;

    setTimeout(() => {
      menuChangeModeBtn.innerText = "Light mode";
    }, 300);
  }
};
menuChangeModeBtn.addEventListener("click", themeMode);

/* Footer */
footer.innerHTML = `<p>
      &copy; ${new Date().getFullYear()} All Rights Reserved. made by
      <a href="https://github.com/Double-w-B" target="_blank" rel="noopener noreferrer">
      Władysław Balandin
      </a>
    </p>`;

export {
  peopleData,
  sideLettersContainer,
  contacts,
  modalOverlay,
  modalContainerAddEdit,
  modalContainerInfo,
  modalContainerRemoveSelected,
  contactsAmount,
  showAllContacts,
  searchInput,
  menuSelectAllBtn,
  menuUnselectAllBtn,
  deviceType,
};
