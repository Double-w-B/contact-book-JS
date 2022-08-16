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
  const themeMode = document.body.className;

  mainModule.modalContainerAddEdit.innerHTML = `
                         <div class="contact-img-upload">
                        <div class="avatar-container">
                            <label title="Press camera to add an image">
                                ${
                                  themeMode === "light-mode"
                                    ? '<img class="img-icon" src="../../icons/camera_plus_dark.svg" alt="icon" />'
                                    : '<img class="img-icon" src="../../icons/camera_plus_light.svg" alt="icon"/>'
                                }
                            <input type="file" />
                            </label>
                        </div>
                        <p>add an image</p>
                    </div>
                        <div class="new-con-main-info">
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

  const inputImg = document.querySelector("input[type=file]");
  const inputImgContainer = document.querySelector(".avatar-container label");
  const inputImgName = document.querySelector(".contact-img-upload p");

  let imgSrc = "";
  let imgName = "";

  const btnAccept = $(".accept");
  const btnCancel = $(".cancel");

  class Person {
    constructor(name, surname, phone, mail, address, notes, imgSrc, imgName) {
      this.name = name.toLowerCase();
      this.surname = surname.toLowerCase();
      this.phone = phone;
      this.mail = mail.toLowerCase();
      this.address = address;
      this.notes = notes;
      this.img = { src: imgSrc, name: imgName };
    }
  }

  /* Add avatar image */
  const addImage = (reader) => {
    const uploaded = reader.result;
    const inputImage = document.querySelector("input[type=file]").files[0];
    const avatarImg = document.createElement("img");

    inputImgName.innerText =
      inputImage.name.length > 15
        ? `...${inputImage.name.slice(-15)}`
        : `../${inputImage.name}`;

    inputImgContainer.insertBefore(avatarImg, inputImg);
    inputImgContainer.removeChild(inputImgContainer.children[0]);
    inputImgContainer.children[0].src = uploaded;
    inputImgContainer.children[0].draggable = false;
    inputImgContainer.children[0].className = "no-select";

    imgSrc = uploaded;
    imgName = `../${inputImage.name}`;
  };

  inputImg.addEventListener("change", () => {
    const reader = new FileReader();
    reader.addEventListener("load", () => addImage(reader));
    reader.readAsDataURL(inputImg.files[0]);
  });

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
      inputPhone.value.length >=6 &&
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
          inputNotes.value,
          imgSrc,
          imgName
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
