import { modalOverlay, modalContainerNewCon, peopleData, conAmount, showAllContacts } from "../main.js";
import { invalidItem,
unavailableNumber,
requiredInput } from "./validation.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export const editContact = () => {
  const editBtn = $$(".fa-user-edit");

  editBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      modalOverlay.classList.add("open-modal");
      modalContainerNewCon.classList.add("open-modal");

      modalContainerNewCon.innerHTML = `<div class="new-con-main-info">
                        <div class="info">Contact details</div>
                        <form>
                        <div class="info-one">
                            <div class="name-input">
                                <input type="text" id="name" name="name" placeholder="Name*"
                                    onfocus="this.placeholder=''" onblur="this.placeholder='Name*'" required>
                                    <div class="error-hint">invalid name</div>
                                    <div class="error-hint-required">name is required</div>

                            </div>
                            <div class="surname-input">
                                <input type="text" id="surname" name="surname" placeholder="Surname*"
                                    onfocus="this.placeholder=''" onblur="this.placeholder='Surname*'" required>
                                    <div class="error-hint">invalid surname</div>
                                    <div class="error-hint-required">surname is required</div>

                            </div>
                            </div>
                            <div class="info-two">
                            <div class="phone-input">
                                <input type="number" id="phone" name="phone" placeholder="Phone*"
                                    onfocus="this.placeholder=''" onblur="this.placeholder='Phone*'" required>
                                    <div class="error-hint">invalid number</div>
                                    <div class="error-hint-required">number is required</div>
                                    <div class="error-hint-number">number already exists</div>

                            </div>
                            <div class="mail-input">
                                <input type="mail" id="email" name="email" placeholder="Email"
                                    onfocus="this.placeholder=''" onblur="this.placeholder='Email'" required>
                            </div>
                            </div>
                        </form>
                    </div>
                    <div class="new-con-secondary-info">
                        <form>
                            <div class="address-input">
                                <input type="text" id="address" name="address" placeholder="Address"
                                    onfocus="this.placeholder=''" onblur="this.placeholder='Address'">
                            </div>
                            <div class="notes-input">
                                <input type="text" id="notes" name="notes" placeholder="Notes"
                                    onfocus="this.placeholder=''" onblur="this.placeholder='Notes'">
                            </div>
                        </form>
                    </div>
                    <div class="new-con-btns">
                        <button class="change">Change</button>
                        <button class="cancel">Cancel</button>
                    </div>`;

      const inputName = document.getElementById("name");
      const inputSurname = document.getElementById("surname");
      const inputPhone = document.getElementById("phone");
      const inputEmail = document.getElementById("email");
      const inputAddress = document.getElementById("address");
      const inputNotes = document.getElementById("notes");

      const btnChangeCon = $(".change");
      const btnCancelNewCon = $(".cancel");

      const checkNumber = peopleData.map((person) => person.phone);
      const id = e.target.parentElement.parentElement.id;

      peopleData.map((person) => {
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

      btnChangeCon.addEventListener("click", () => {

        !inputName.value && requiredInput(inputName);
        !inputSurname.value && requiredInput(inputSurname);

        if (!inputPhone.value) {
          requiredInput(inputPhone);
        } else if (!inputPhone.value.match(/^[0-9]+$/)) {
          invalidItem(inputPhone);
        }

        inputName.value.match(/[ĄĆĘÓŚŻŹŁŃŚąćęóśżźłńś^0-9^а-я]/) &&
          invalidItem(inputName);
        inputSurname.value.match(/[ĄĆĘÓŚŻŹŁŃŚąćęóśżźłńś^0-9^а-я]/) &&
          invalidItem(inputSurname);

        if (
          inputName.value &&
          inputSurname.value &&
          !inputName.value.match(/[ĄĆĘÓŚŻŹŁŃŚąćęóśżźłńś^0-9^а-я]/) &&
          !inputSurname.value.match(/[ĄĆĘÓŚŻŹŁŃŚąćęóśżźłńś^0-9^а-я]/)
        ) {
          checkNumber.includes(inputPhone.value) &&
            unavailableNumber(inputPhone);
        }

        if (
          inputName.value &&
          inputSurname.value &&
          !inputName.value.match(/[ĄĆĘÓŚŻŹŁŃŚąćęóśżźłńś^0-9^а-я]/) &&
          !inputSurname.value.match(/[ĄĆĘÓŚŻŹŁŃŚąćęóśżźłńś^0-9^а-я]/) &&
          inputPhone.value.match(/^[0-9]+$/) &&
          ((checkNumber.includes(inputPhone.value) &&
            inputPhone.value === id) ||
            (!checkNumber.includes(inputPhone.value) &&
              inputPhone.value !== id))
        ) {
          peopleData.map((person) => {
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

        modalOverlay.classList.remove("open-modal");
        modalContainerNewCon.classList.remove("open-modal");

        conAmount.innerHTML = `<p>Contacts: ${peopleData.length}</p>`;

        showAllContacts();
        localStorage.setItem("contacts", JSON.stringify(peopleData));
      });
      btnCancelNewCon.addEventListener("click", () => {
        modalOverlay.classList.remove("open-modal");
        modalContainerNewCon.classList.remove("open-modal");
      });
    });
  });
};
