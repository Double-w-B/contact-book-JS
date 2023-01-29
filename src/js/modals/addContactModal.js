import * as main from "../main.js";
import * as utils from "../utils.js";
import { validation } from "../validation.js";
import * as fetchData from "../fetch/index.js";
import { createAddContactModalContent } from "./constructor.js";

export const userImage = {
  cloudinaryImgId: "",
};

export const addContactModal = () => {
  function closeModal() {
    main.modalBackdrop.classList.remove("open-modal");
    main.modalContactAddEdit.classList.remove("open-modal");
    fetchData.removeUnsavedImageFromDB();
  }

  function handleAddImage() {
    function loadLogic() {
      const inputImage = document.querySelector("input[type=file]").files[0];
      utils.addImage(reader);
      imgSrc = reader.result;
      imgName = `../${inputImage.name}`;

      const contactImage = new FormData();
      contactImage.append("image", inputImage);
      fetchData.uploadContactImage(contactImage);
    }

    imgInputLabel.classList.add("disable");
    const reader = new FileReader();
    reader.addEventListener("load", loadLogic);
    reader.readAsDataURL(imgInput.files[0]);
  }

  function handleRemoveImage() {
    fetchData.removeContactImage(userImage.cloudinaryImgId);
    utils.removeImage();
    imgInputLabel.classList.remove("disable");

    imgSrc = "";
    imgName = "";
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
        imgName
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

  let imgSrc = "";
  let imgName = "";

  imgInput.addEventListener("change", handleAddImage);
  imgRemoveBtn.addEventListener("click", handleRemoveImage);
  addButton.addEventListener("click", addContact);
  cancelButton.addEventListener("click", closeModal);
};
