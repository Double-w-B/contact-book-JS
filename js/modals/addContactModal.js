import * as main from "../main.js";
import * as utils from "../utils.js";
import { validation } from "../validation.js";
import { showAllContacts } from "../showAllContacts.js";
import { createAddContactModalContent } from "./constructor.js";

export const addContactModal = () => {
  function closeModal() {
    main.modalBackdrop.classList.remove("open-modal");
    main.modalContactAddEdit.classList.remove("open-modal");
  }

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

  function addContact() {
    const contactsNumbers = main.contactsData.map((person) => person.phone);

    validation(inputName, inputSurname, inputPhone, inputEmail);

    if (
      inputName.value &&
      inputSurname.value &&
      !inputName.value.match(main.textRegExp) &&
      !inputSurname.value.match(main.textRegExp) &&
      inputPhone.value.match(main.onlyNumbers) &&
      !contactsNumbers.includes(inputPhone.value) &&
      inputPhone.value.length >= 6 &&
      (!inputEmail.value || inputEmail.value.match(main.emailRegExp))
    ) {
      const newContact = new main.Person(
        inputName.value,
        inputSurname.value,
        inputPhone.value,
        inputEmail.value,
        inputAddress.value,
        inputNotes.value,
        imgSrc,
        imgName
      );

      main.contactsData.push(newContact);
      closeModal();
      showAllContacts();
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
  const imgRemoveBtn = document.querySelector(".avatar-container .fa-times");

  const addButton = document.querySelector(".accept");
  const cancelButton = document.querySelector(".cancel");

  let imgSrc = "";
  let imgName = "";

  imgInput.addEventListener("change", handleAddImage);
  imgRemoveBtn.addEventListener("click", handleRemoveImage);
  addButton.addEventListener("click", addContact);
  cancelButton.addEventListener("click", closeModal);
};
