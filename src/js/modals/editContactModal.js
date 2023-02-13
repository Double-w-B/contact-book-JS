import * as main from "../main.js";
import * as utils from "../utils.js";
import { validation } from "../validation.js";
import * as fetchData from "../fetch/index.js";
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

    if (main.contactImage.cloudinaryImageId) {
      fetchData.removeUnsavedImageFromDB();
    }
    main.contactImage.cloudinaryImageId = "";
    main.contactImage.contactImageName = "";
    main.contactImage.contactImageUrl = "";
    fetchData.getAllContacts();
  }

  function handleListClick(e) {
    if (!e.target.className || e.target.className !== "editCon") return;

    function handleAddImage() {
      function loadLogic() {
        const inputImage = document.querySelector("input[type=file]").files[0];

        utils.addImage(reader);
        const contactImage = new FormData();
        contactImage.append("image", inputImage);
        fetchData.uploadContactImage(contactImage, handleIsLoading);
      }
      imgInputLabel.classList.add("disable");
      const reader = new FileReader();
      reader.addEventListener("load", loadLogic);
      reader.readAsDataURL(imgInput.files[0]);
    }

    function handleRemoveImage() {
      const imageId = img.id || main.contactImage.cloudinaryImageId;
      const data = { cloudinaryImageId: imageId, contactId };
      fetchData.removeContactImage(data, handleIsLoading);
      imgInputLabel.classList.remove("disable");
      utils.removeImage();
    }

    function handleIsLoading(boolean) {
      loadingIcon.classList.toggle("show", boolean);
      saveButton.classList.toggle("disable", boolean);
    }

    function saveChanges() {
      const contactsNumbers = main.data.contacts.map((person) => person.phone);
      const inputs = { inputName, inputSurname, inputPhone, inputEmail };

      validation(inputs, contact.phone);

      if (!inputName.value || !inputSurname.value) return;
      if (inputName.value.match(utils.textRegExp)) return;
      if (inputSurname.value.match(utils.textRegExp)) return;
      if (!inputPhone.value.match(utils.onlyNumbersRegExp)) return;
      if (inputPhone.value.length < 6) return;
      if (
        contactsNumbers.includes(inputPhone.value) &&
        inputPhone.value !== contact.phone
      )
        return;
      if (inputEmail.value && !inputEmail.value.match(utils.emailRegExp))
        return;

      const newContact = new utils.Person(
        inputName.value.toLowerCase(),
        inputSurname.value.toLowerCase(),
        inputPhone.value,
        inputEmail.value.toLowerCase(),
        inputAddress.value,
        inputNotes.value,
        main.contactImage.contactImageUrl,
        main.contactImage.contactImageName,
        main.contactImage.cloudinaryImageId
      );

      const data = { newContact, contactId };
      const methods = { handleIsLoading, closeModal };

      fetchData.updateContact(data, methods);
    }

    const contactId = e.target.closest(".one-child").id;
    const contact = main.data.contacts.find(
      (person) => person._id === contactId
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
    const imgInputLabel = document.querySelector(".avatar-container label");
    const imgRemoveBtn = document.querySelector(".avatar-container .fa-times");
    const loadingIcon = document.querySelector(".new-con-btns .loadingIcon");

    const saveButton = document.querySelector(".save");
    const cancelButton = document.querySelector(".cancel");

    main.contactImage.contactImageUrl = img.src;
    main.contactImage.contactImageName = img.name;
    main.contactImage.cloudinaryImageId = img.id;

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
