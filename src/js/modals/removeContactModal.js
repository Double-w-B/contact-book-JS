import * as main from "../main.js";
import { deleteSingleContactFromDB } from "../fetch/index.js";
import { createRemoveSingleContactModal } from "./constructor.js";

export const removeContactModal = () => {
  main.listOfContacts.addEventListener("click", handleListClick);

  function openModal() {
    main.modalBackdrop.classList.add("open-modal");
    main.modalContactRemove.classList.add("open-modal");
  }
  function closeModal() {
    main.modalBackdrop.classList.remove("open-modal");
    main.modalContactRemove.classList.remove("open-modal");
  }

  function handleListClick(e) {
    if (!e.target.className || e.target.className !== "deleteCon") return;

    const contactId = e.target.closest(".one-child").id;
    const contact = main.data.contacts.find(
      (person) => person._id === contactId
    );
    const { name, surname } = contact;
    const contactFullName = name + " " + surname;

    function deleteContact() {
      deleteSingleContactFromDB(contactId, closeModal);
    }

    openModal();
    createRemoveSingleContactModal(contactFullName);

    const deleteButton = document.querySelector(".confirm-delete");
    const cancelButton = document.querySelector(".confirm-cancel");

    deleteButton.addEventListener("click", deleteContact);
    cancelButton.addEventListener("click", closeModal);
  }
};
