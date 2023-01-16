import * as main from "../main.js";
import * as utils from "../utils.js";
import { validation } from "../validation.js";
import { showAllContacts } from "../showAllContacts.js";
import { createEditContactModalContent } from "./constructor.js";

export const editContactModal = () => {
  main.listOfContacts.addEventListener("click", handleListClick);

  function openModal() {
    main.modalBackdrop.classList.add("open-modal");
    main.modalContactAddEdit.classList.add("open-modal");
  }
  function closeModal() {
    main.modalBackdrop.classList.remove("open-modal");
    main.modalContactAddEdit.classList.remove("open-modal");
  }

  function handleListClick(e) {
    if (!e.target.className || e.target.className !== "editCon") return;

    function handleAddImage() {
      function loadLogic() {
        const inputImage = document.querySelector("input[type=file]").files[0];

        utils.addImage(reader);
        imgSrc = reader.result;
        imgName = `../${inputImage.name}`;
      }
      const reader = new FileReader();
      reader.addEventListener("load", loadLogic);
      reader.readAsDataURL(imgInput.files[0]);
    }

    function handleRemoveImage() {
      utils.removeImage();
      imgSrc = "";
      imgName = "";
    }

    function saveChanges() {
      const contactsNumbers = main.contactsData.map((person) => person.phone);

      validation(inputName, inputSurname, inputPhone, inputEmail);

      if (
        inputName.value &&
        inputSurname.value &&
        !inputName.value.match(utils.textRegExp) &&
        !inputSurname.value.match(utils.textRegExp) &&
        inputPhone.value.match(/^[0-9]+$/) &&
        inputPhone.value.length >= 6 &&
        (!inputEmail.value || inputEmail.value.match(utils.emailRegExp)) &&
        ((contactsNumbers.includes(inputPhone.value) &&
          inputPhone.value === contactId) ||
          (!contactsNumbers.includes(inputPhone.value) &&
            inputPhone.value !== contactId))
      ) {
        inputPhone.classList.remove("invalid-input");
        const siblingElement = [...inputPhone.parentElement.children].find(
          (el) => el.className === "error-hint"
        );
        siblingElement.remove("invalid-input");

        contact.name = inputName.value.toLowerCase();
        contact.surname = inputSurname.value.toLowerCase();
        contact.phone = inputPhone.value;
        contact.email = inputEmail.value.toLowerCase();
        contact.address = inputAddress.value;
        contact.notes = inputNotes.value;
        contact.img = { src: imgSrc, name: imgName };
      } else {
        return;
      }

      closeModal();
      showAllContacts();
    }

    const contactId = e.target.closest(".one-child").id;
    const contact = main.contactsData.find(
      (person) => contactId === person.phone
    );
    const { name, surname, phone, email, address, notes, img } = contact;

    openModal();
    createEditContactModalContent(img.name, img.src);

    const inputName = document.getElementById("name");
    const inputSurname = document.getElementById("surname");
    const inputPhone = document.getElementById("phone");
    const inputEmail = document.getElementById("email");
    const inputAddress = document.getElementById("address");
    const inputNotes = document.getElementById("notes");
    const imgInput = document.querySelector("input[type=file]");
    const imgRemoveBtn = document.querySelector(".avatar-container .fa-times");

    const saveButton = document.querySelector(".save");
    const cancelButton = document.querySelector(".cancel");

    let imgSrc = img.src;
    let imgName = img.name;

    inputName.value = name;
    inputSurname.value = surname;
    inputPhone.value = phone;
    inputEmail.value = email;
    inputAddress.value = address;
    inputNotes.value = notes;

    imgInput.addEventListener("change", handleAddImage);
    imgRemoveBtn.addEventListener("click", handleRemoveImage);
    saveButton.addEventListener("click", saveChanges);
    cancelButton.addEventListener("click", closeModal);
  }
};
