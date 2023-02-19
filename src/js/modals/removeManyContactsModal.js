import * as main from "../main";
import { deleteManyContactsFromDB } from "../fetch";
import { createRemoveManyContactsModal } from "./constructor";

export const removeManyContactsModal = () => {
  const contactImg = document.querySelectorAll(".contact-img");
  let contactsId = [];

  contactImg.forEach((li) => {
    const parentElId = li.parentElement.id;
    li.firstElementChild.classList.contains("show-checked") &&
      contactsId.push(parentElId);
  });

  if (contactsId.length === 0) return;

  function openModal() {
    main.modalBackdrop.classList.add("open-modal");
    main.modalContactRemove.classList.add("open-modal");
    main.menu.classList.remove("show-menu");
    main.menuAllOptions.forEach((option) => option.classList.remove("active"));
  }

  function closeModal() {
    main.modalBackdrop.classList.remove("open-modal");
    main.modalContactRemove.classList.remove("open-modal");
    contactsId = [];
  }

  function deleteContacts() {
    const methods = { handleIsLoading, closeModal };
    deleteManyContactsFromDB(contactsId, methods);
  }

  function handleIsLoading(boolean) {
    loadingIcon.classList.toggle("show", boolean);
    deleteButton.classList.toggle("disable", boolean);
  }

  openModal();
  createRemoveManyContactsModal(contactsId);

  const deleteButton = document.querySelector(".confirm-delete");
  const cancelButton = document.querySelector(".confirm-cancel");
  const loadingIcon = document.querySelector(".confirm-btns .loadingIcon");

  deleteButton.addEventListener("click", deleteContacts);
  cancelButton.addEventListener("click", closeModal);
};
