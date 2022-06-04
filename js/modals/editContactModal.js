import * as mainModule from "../main.js";
import { validationFunction } from "../validation.js";
import { addEditModalStructure } from "./addEditModalStructure.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export const editContactModal = () => {
  const editBtns = $$(".editCon");

  editBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      mainModule.modalOverlay.classList.add("open-modal");
      mainModule.modalContainerAddEdit.classList.add("open-modal");

      mainModule.modalContainerAddEdit.innerHTML = `<div class="new-con-main-info">
                        <div class="info">Edit contact</div>
                        ${addEditModalStructure}
                        <button class="save">Save</button>
                        <button class="cancel">Cancel</button>
                    </div>`;

      const inputName = document.getElementById("name");
      const inputSurname = document.getElementById("surname");
      const inputPhone = document.getElementById("phone");
      const inputEmail = document.getElementById("email");
      const inputAddress = document.getElementById("address");
      const inputNotes = document.getElementById("notes");

      const btnSave = $(".save");
      const btnCancel = $(".cancel");

      const checkNumber = mainModule.peopleData.map((person) => person.phone);
      const id = e.target.parentElement.parentElement.id;
      const textRegExp = /[ĄĆĘÓŚŻŹŁŃŚąćęóśżźłńś^0-9^а-я]/;
      const emailRegExp = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

      mainModule.peopleData.map((person) => {
        const { name, surname, phone, mail, address, notes } = person;

        if (btn.parentElement.parentElement.id === phone) {
          inputName.value = `${name}`;
          inputSurname.value = `${surname}`;
          inputPhone.value = `${phone}`;
          inputEmail.value = `${mail}`;
          inputAddress.value = `${address}`;
          inputNotes.value = `${notes}`;
        }
      });

      btnSave.addEventListener("click", (e) => {
        e.stopPropagation();

        validationFunction(inputName, inputSurname, inputPhone, inputEmail);

        if (
          inputName.value &&
          inputSurname.value &&
          !inputName.value.match(textRegExp) &&
          !inputSurname.value.match(textRegExp) &&
          inputPhone.value.match(/^[0-9]+$/) &&
          (!inputEmail.value || inputEmail.value.match(emailRegExp)) &&
          ((checkNumber.includes(inputPhone.value) &&
            inputPhone.value === id) ||
            (!checkNumber.includes(inputPhone.value) &&
              inputPhone.value !== id))
        ) {
          inputPhone.classList.remove("invalid-input");
          inputPhone.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
            "invalid-input"
          );
          mainModule.peopleData.map((person) => {
            if (person.phone === btn.parentElement.parentElement.id) {
              person.name = inputName.value.toLowerCase();
              person.surname = inputSurname.value.toLowerCase();
              person.phone = inputPhone.value;
              person.mail = inputEmail.value.toLowerCase();
              person.address = inputAddress.value.toLowerCase();
              person.notes = inputNotes.value.toLowerCase();
            }
          });
        } else {
          return;
        }

        mainModule.modalOverlay.classList.remove("open-modal");
        mainModule.modalContainerAddEdit.classList.remove("open-modal");

        mainModule.contactsAmount.innerHTML = `<p>Contacts: ${mainModule.peopleData.length}</p>`;

        mainModule.showAllContacts();
        localStorage.setItem("contacts", JSON.stringify(mainModule.peopleData));
      });
      btnCancel.addEventListener("click", (e) => {
        e.stopPropagation();
        mainModule.modalOverlay.classList.remove("open-modal");
        mainModule.modalContainerAddEdit.classList.remove("open-modal");
      });
    });
  });
};
