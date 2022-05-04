import { asideLetters } from "./asideLetters.js";
import { openAddConModal } from "./addContactModal.js";
import { checkConLength } from "./checkContainerLength.js";
import { displayMatches } from "./searchInput.js";
import { showAllContacts } from "./showAllContacts.js";
import {
  invalidItem,
  unavailableNumber,
  requiredInput,
} from "./validation.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const letters = $(".letters__container");
const contacts = $(".list__contacts");
const list = $(".list");
const btnAllCon = $(".nav__btn--show");
const btnAddCon = $(".nav__btn--add");
const btnMenu = $(".nav__btn--menu");
const conAmount = $(".list__contacts-amount");
const modalOverlay = $(".modal__overlay");
const modalContainerInfo = $(".modal__container");
const modalContainerNewCon = $(".modal__new-contact");
const modalDeleteQuestion = $(".modal__delete-confirm");
const menu = $(".menu");
const searchInput = document.getElementById("search");
const searchIcon = $(".fa-search");

const modeBtn = $(".menu__btn--mode");

let peopleData = JSON.parse(localStorage.getItem("contacts")) || [];

if (!localStorage.theme) localStorage.theme = "light-mode";
document.body.className = localStorage.theme;

letters.innerHTML = asideLetters();

conAmount.innerHTML = `<p>Contacts: ${peopleData.length}</p>`;

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

btnMenu.addEventListener("click", () => menu.classList.toggle("show-menu"));
document.addEventListener("click", (e) => {
  e.target !== btnMenu && menu.classList.remove("show-menu");
  searchInput.value = "";
});

btnAddCon.addEventListener("click", () => {
  openAddConModal();
  const inputName = document.getElementById("name");
  const inputSurname = document.getElementById("surname");
  const inputPhone = document.getElementById("phone");
  const inputEmail = document.getElementById("email");
  const inputAddress = document.getElementById("address");
  const inputNotes = document.getElementById("notes");

  const btnAddNewCon = $(".accept");
  const btnCancelNewCon = $(".cancel");

  class Person {
    constructor(name, surname, phone, mail, address, notes) {
      this.name = name.toLowerCase();
      this.surname = surname.toLowerCase();
      this.phone = phone;
      this.mail = mail.toLowerCase();
      this.address = address.toLowerCase();
      this.notes = notes.toLowerCase();
    }
  }

  btnAddNewCon.addEventListener("click", () => {
    const conImg = $$(".contact-img");
    const textRegExp = /[ĄĆĘÓŚŻŹŁŃŚąćęóśżźłńś^0-9^а-я]/;
    const emailRegExp = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    const checkNumber = peopleData.map((person) => person.phone);

    !inputName.value && requiredInput(inputName);
    !inputSurname.value && requiredInput(inputSurname);

    if (!inputPhone.value) {
      requiredInput(inputPhone);
    }
    if (inputPhone.value && !inputPhone.value.match(/^[0-9]+$/)) {
      invalidItem(inputPhone);
    }

    inputName.value.match(textRegExp) && invalidItem(inputName);
    inputSurname.value.match(textRegExp) && invalidItem(inputSurname);
    inputEmail.value &&
      !inputEmail.value.match(emailRegExp) &&
      invalidItem(inputEmail);

    if (
      inputName.value &&
      inputSurname.value &&
      !inputName.value.match(textRegExp) &&
      !inputSurname.value.match(textRegExp) &&
      (!inputEmail.value || inputEmail.value.match(emailRegExp))
    ) {
      checkNumber.includes(inputPhone.value) && unavailableNumber(inputPhone);
    }

    if (
      inputName.value &&
      inputSurname.value &&
      !inputName.value.match(textRegExp) &&
      !inputSurname.value.match(textRegExp) &&
      inputPhone.value.match(/^[0-9]+$/) &&
      !checkNumber.includes(inputPhone.value) &&
      (!inputEmail.value || inputEmail.value.match(emailRegExp))
    ) {
      peopleData.push(
        new Person(
          inputName.value,
          inputSurname.value,
          inputPhone.value,
          inputEmail.value,
          inputAddress.value,
          inputNotes.value
        )
      );

      conImg.forEach((img) =>
        img.firstElementChild.classList.remove("show-checked")
      );
      localStorage.setItem("contacts", JSON.stringify(peopleData));
      modalOverlay.classList.remove("open-modal");
      modalContainerNewCon.classList.remove("open-modal");

      conAmount.innerHTML = `<p>Contacts: ${peopleData.length}</p>`;

      showAllContacts();
    }
  });

  btnCancelNewCon.addEventListener("click", () => {
    modalOverlay.classList.remove("open-modal");
    modalContainerNewCon.classList.remove("open-modal");
  });
});

btnAllCon.addEventListener("click", () => showAllContacts());

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);

showAllContacts();

/* Remove selected items */
const removeSelectBtn = $(".menu__btn--remove");

removeSelectBtn.addEventListener("click", () => {
  const conImg = $$(".contact-img");
  let itemsToRemove = [];

  conImg.forEach((li) => {
    const parentElId = li.parentElement.id;
    li.firstElementChild.classList.contains("show-checked") &&
      itemsToRemove.push(parentElId);
  });

  if (itemsToRemove.length === 0) return;

  modalOverlay.classList.add("open-modal");
  modalDeleteQuestion.classList.add("open-modal");

  modalDeleteQuestion.innerHTML = `
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
                            }
                            ?</p>
                        </div>
                        <div class="confirm-btns">
                            <button class="confirm-delete">Delete</button>
                            <button class="confirm-cancel">Cancel</button>
                        </div>
                    </div>`;

  const confirmDelBtn = $(".confirm-delete");
  const confirmCanBtn = $(".confirm-cancel");

  /* Confirm Btn */
  confirmDelBtn.addEventListener("click", () => {
    /* find the index of selected object */
    itemsToRemove.map((id) =>
      peopleData.map(
        (person) =>
          person.phone === id &&
          peopleData.splice(peopleData.indexOf(person), 1)
      )
    );

    conImg.forEach(
      (li) =>
        li.firstElementChild.classList.contains("show-checked") &&
        li.parentElement.remove()
    );

    modalOverlay.classList.remove("open-modal");
    modalDeleteQuestion.classList.remove("open-modal");
    letters.innerHTML = asideLetters();
    conAmount.innerHTML = `<p>Contacts: ${peopleData.length}</p>`;
    checkConLength();
    itemsToRemove = [];
    localStorage.setItem("contacts", JSON.stringify(peopleData));
  });

  /* Deny Btn */
  confirmCanBtn.addEventListener("click", () => {
    modalOverlay.classList.remove("open-modal");
    modalDeleteQuestion.classList.remove("open-modal");
    itemsToRemove = [];
  });
});

/* Move To */
letters.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.hasAttribute("href")) {
    const id = e.target.getAttribute("href").slice(1);
    const element = document.getElementById(id);

    let position = element.offsetTop - 10;
    list.scrollTo({
      left: 0,
      top: position,
    });
  }
  return;
});

/* Dark/Light mode */
modeBtn.addEventListener("click", () => {
  if (document.body.classList.contains("dark-mode")) {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    localStorage.theme = document.body.className;

    setTimeout(() => {
      modeBtn.innerText = "Dark mode";
    }, 300);
  } else {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
    localStorage.theme = document.body.className;

    setTimeout(() => {
      modeBtn.innerText = "Light mode";
    }, 300);
  }
});

export {
  peopleData,
  letters,
  contacts,
  modalOverlay,
  modalContainerNewCon,
  modalContainerInfo,
  modalDeleteQuestion,
  conAmount,
  showAllContacts,
  searchInput,
};
