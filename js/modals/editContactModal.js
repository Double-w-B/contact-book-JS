import * as mainModule from "../main.js";
import { validationFunction } from "../validation.js";
import { addEditModalStructure } from "./addEditModalStructure.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export const editContactModal = () => {
  const editBtns = $$(".editCon");

  editBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const themeMode = document.body.className;
      mainModule.modalOverlay.classList.add("open-modal");
      mainModule.modalContainerAddEdit.classList.add("open-modal");

      const filteredContact = mainModule.peopleData.find(
        (person) => btn.closest("li").id === person.phone
      );

      const {
        img: { src, name },
      } = filteredContact;

      mainModule.modalContainerAddEdit.innerHTML = `
                    <div class="contact-img-upload">
                        <div class="avatar-container">
                            <label>
                            ${
                              src
                                ? `<img src=${src} alt='avatar'/>`
                                : themeMode === "light-mode"
                                ? `<img class="img-icon" src="../../icons/camera_plus_dark.svg" alt="icon"/>`
                                : `<img class="img-icon" src="../../icons/camera_plus_light.svg" alt="icon"/>`
                            }
                            <input type="file" />
                            </label>

                            ${
                              src
                                ? '<i class="fas fa-times"></i>'
                                : '<i class="fas fa-times hide"></i>'
                            }
                          
                        </div>
                        <p>${
                          name
                            ? name.length > 15
                              ? `...${name.slice(-15)}`
                              : name
                            : "add an image"
                        }</p>
                    </div>
                    <div class="new-con-main-info">
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

      const inputImgContainer = $(".avatar-container label");
      const inputImgRemoveBtn = $(".avatar-container .fa-times");
      const inputImgInput = $("input[type=file]");
      const inputImgName = $(".contact-img-upload p");

      let imgSrc = src;
      let imgName = name;

      /* Remove avatar image*/
      const removeImage = () => {
        const themeMode = document.body.className;
        const avatarImg = document.createElement("img");
        inputImgContainer.insertBefore(avatarImg, inputImgInput);
        inputImgContainer.removeChild(inputImgContainer.children[0]);

        const inputImg = $(".avatar-container label img");
        inputImg.classList.add("img-icon");
        inputImgRemoveBtn.classList.add("hide");
        themeMode === "light-mode"
          ? (inputImg.src = "../../icons/camera_plus_dark.svg")
          : (inputImg.src = "../../icons/camera_plus_light.svg");
        inputImgName.innerText = "add an image";
        imgSrc = "";
        imgName = "";
      };
      inputImgRemoveBtn.addEventListener("click", removeImage);

      const btnSave = $(".save");
      const btnCancel = $(".cancel");

      const checkNumber = mainModule.peopleData.map((person) => person.phone);
      const contactId = e.target.closest("li").id;
      const textRegExp = /[ĄĆĘÓŚŻŹŁŃŚąćęóśżźłńś^0-9^а-я]/;
      const emailRegExp = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

      mainModule.peopleData.find((person) => {
        const { name, surname, phone, mail, address, notes } = person;

        if (contactId === phone) {
          inputName.value = `${name}`;
          inputSurname.value = `${surname}`;
          inputPhone.value = `${phone}`;
          inputEmail.value = `${mail}`;
          inputAddress.value = `${address}`;
          inputNotes.value = `${notes}`;
        }
      });

      /* Add avatar image */
      const addImage = (reader) => {
        const uploaded = reader.result;
        const inputImage = $("input[type=file]").files[0];
        const avatarImg = document.createElement("img");

        inputImgName.innerText =
          inputImage.name.length > 20
            ? `...${inputImage.name.slice(-15)}`
            : `../${inputImage.name}`;

        inputImgContainer.insertBefore(avatarImg, inputImgInput);
        inputImgContainer.removeChild(inputImgContainer.children[0]);
        inputImgContainer.children[0].src = uploaded;
        inputImgContainer.children[0].draggable = false;
        inputImgContainer.children[0].className = "no-select";
        inputImgRemoveBtn.classList.remove("hide");

        imgSrc = uploaded;
        imgName = `../${inputImage.name}`;
      };

      inputImgInput.addEventListener("change", () => {
        const reader = new FileReader();
        reader.addEventListener("load", () => addImage(reader));
        reader.readAsDataURL(inputImgInput.files[0]);
      });

      /* Save changes */
      btnSave.addEventListener("click", (e) => {
        e.stopPropagation();

        validationFunction(inputName, inputSurname, inputPhone, inputEmail);

        if (
          inputName.value &&
          inputSurname.value &&
          !inputName.value.match(textRegExp) &&
          !inputSurname.value.match(textRegExp) &&
          inputPhone.value.match(/^[0-9]+$/) &&
          inputPhone.value.length >= 6 &&
          (!inputEmail.value || inputEmail.value.match(emailRegExp)) &&
          ((checkNumber.includes(inputPhone.value) &&
            inputPhone.value === contactId) ||
            (!checkNumber.includes(inputPhone.value) &&
              inputPhone.value !== contactId))
        ) {
          inputPhone.classList.remove("invalid-input");
          inputPhone.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
            "invalid-input"
          );

          mainModule.peopleData.map((person) => {
            if (person.phone === contactId) {
              person.name = inputName.value.toLowerCase();
              person.surname = inputSurname.value.toLowerCase();
              person.phone = inputPhone.value;
              person.mail = inputEmail.value.toLowerCase();
              person.address = inputAddress.value;
              person.notes = inputNotes.value;
              person.img = { src: imgSrc, name: imgName };
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

      /* Cancel changes */
      btnCancel.addEventListener("click", (e) => {
        e.stopPropagation();
        mainModule.modalOverlay.classList.remove("open-modal");
        mainModule.modalContainerAddEdit.classList.remove("open-modal");
      });
    });
  });
};
