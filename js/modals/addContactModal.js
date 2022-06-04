import * as mainModule from "../main.js";
import { showAllContacts } from "../showAllContacts.js";
import { addEditModalStructure } from "./addEditModalStructure.js";
import { validationFunction } from "../validation.js";

const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);

/* Add new contact to an array */
export const addContactModal = () => {
  mainModule.modalOverlay.classList.add("open-modal");
  mainModule.modalContainerAddEdit.classList.add("open-modal");

  mainModule.modalContainerAddEdit.innerHTML = `<div class="new-con-main-info">
                        <div class="info">New Contact</div>
                        ${addEditModalStructure}
                        <button class="accept">Add</button>
                        <button class="cancel">Cancel</button>
                    </div>`;

  const inputName = document.getElementById("name");
  const inputSurname = document.getElementById("surname");
  const inputPhone = document.getElementById("phone");
  const inputEmail = document.getElementById("email");
  const inputAddress = document.getElementById("address");
  const inputNotes = document.getElementById("notes");

  const btnAccept = $(".accept");
  const btnCancel = $(".cancel");

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

  /* Add new contact */
  btnAccept.addEventListener("click", (e) => {
    e.stopPropagation();
    const contactImg = $$(".contact-img");
    const textRegExp = /[ĄĆĘÓŚŻŹŁŃŚąćęóśżźłńś^0-9^а-я]/;
    const emailRegExp = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    const checkNumber = mainModule.peopleData.map((person) => person.phone);

    validationFunction(inputName, inputSurname, inputPhone, inputEmail);

    if (
      inputName.value &&
      inputSurname.value &&
      !inputName.value.match(textRegExp) &&
      !inputSurname.value.match(textRegExp) &&
      inputPhone.value.match(/^[0-9]+$/) &&
      !checkNumber.includes(inputPhone.value) &&
      (!inputEmail.value || inputEmail.value.match(emailRegExp))
    ) {
      mainModule.peopleData.push(
        new Person(
          inputName.value,
          inputSurname.value,
          inputPhone.value,
          inputEmail.value,
          inputAddress.value,
          inputNotes.value
        )
      );

      contactImg.forEach((img) =>
        img.firstElementChild.classList.remove("show-checked")
      );
      localStorage.setItem("contacts", JSON.stringify(mainModule.peopleData));
      mainModule.modalOverlay.classList.remove("open-modal");
      mainModule.modalContainerAddEdit.classList.remove("open-modal");

      mainModule.contactsAmount.innerHTML = `<p>Contacts: ${mainModule.peopleData.length}</p>`;

      showAllContacts();
    }
  });

  btnCancel.addEventListener("click", () => {
    mainModule.modalOverlay.classList.remove("open-modal");
    mainModule.modalContainerAddEdit.classList.remove("open-modal");
  });
};
