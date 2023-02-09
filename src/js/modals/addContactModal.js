import * as main from "../main.js";
import * as utils from "../utils.js";
import { validation } from "../validation.js";
import * as fetchData from "../fetch/index.js";
import { createAddContactModalContent } from "./constructor.js";

export const addContactModal = () => {
  function closeModal() {
    main.modalBackdrop.classList.remove("open-modal");
    main.modalContactAddEdit.classList.remove("open-modal");

    if (main.contactImage.cloudinaryImageId) {
      fetchData.removeUnsavedImageFromDB();
    }
    fetchData.getAllContacts();
  }

  function handleAddImage() {
    imgInputLabel.classList.add("disable");
    const reader = new FileReader();
    reader.addEventListener("load", () => utils.addImage(reader));
    reader.readAsDataURL(imgInput.files[0]);
  }

  function handleRemoveImage() {
    fetchData.removeContactImage(main.contactImage.cloudinaryImageId);
    utils.removeImage();
    imgInputLabel.classList.remove("disable");
  }

  function addContact() {
    const contactsNumbers = main.data.contacts.map((person) => person.phone);

    validation(inputName, inputSurname, inputPhone, inputEmail);

    if (
      inputName.value &&
      inputSurname.value &&
      !inputName.value.match(utils.textRegExp) &&
      !inputSurname.value.match(utils.textRegExp) &&
      inputPhone.value.match(utils.onlyNumbersRegExp) &&
      !contactsNumbers.includes(inputPhone.value) &&
      inputPhone.value.length >= 6 &&
      (!inputEmail.value || inputEmail.value.match(utils.emailRegExp))
    ) {
      const newContact = new utils.Person(
        inputName.value.toLowerCase(),
        inputSurname.value.toLowerCase(),
        inputPhone.value,
        inputEmail.value.toLowerCase(),
        inputAddress.value,
        inputNotes.value,
        imgSrc,
        imgName,
        imgId
      );

      fetchData.addContactToDB(newContact, closeModal);
    }
  }

  main.modalBackdrop.classList.add("open-modal");
  main.modalContactAddEdit.classList.add("open-modal");

  createAddContactModalContent();

  const inputName = document.getElementById("name");
  const inputSurname = document.getElementById("surname");
  const inputPhone = document.getElementById("phone");
  const inputEmail = document.getElementById("email");
  const inputAddress = document.getElementById("address");
  const inputNotes = document.getElementById("notes");
  const imgInput = document.querySelector("input[type=file]");
  const imgInputLabel = document.querySelector(".avatar-container label");
  const imgRemoveBtn = document.querySelector(".avatar-container .fa-times");
  const addButton = document.querySelector(".accept");
  const cancelButton = document.querySelector(".cancel");

  let imgSrc = main.contactImage.contactImageUrl;
  let imgName = `.../${main.contactImage.contactImageName}`;
  let imgId = main.contactImage.cloudinaryImageId;

  imgInput.addEventListener("change", handleAddImage);
  imgRemoveBtn.addEventListener("click", handleRemoveImage);
  addButton.addEventListener("click", addContact);
  cancelButton.addEventListener("click", closeModal);
};
