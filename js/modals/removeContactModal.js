import * as main from "../main.js";
import { checkLetterSection } from "../utils.js";
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
    const contact = main.contactsData.find(
      (person) => person.phone === contactId
    );
    const { name, surname } = contact;
    const contactFullName = name + " " + surname;

    function deleteContact() {
      for (const contact of main.contactsData) {
        if (contact.phone === contactId) {
          const contactEl = e.target.closest(".one-child");
          main.contactsData.splice(main.contactsData.indexOf(contact), 1);
          contactEl.remove();
        }
      }

      closeModal();
      checkLetterSection();
    }

    openModal();
    createRemoveSingleContactModal(contactFullName);

    const deleteButton = document.querySelector(".confirm-delete");
    const cancelButton = document.querySelector(".confirm-cancel");

    deleteButton.addEventListener("click", deleteContact);
    cancelButton.addEventListener("click", closeModal);
  }
};
