import * as main from "../main";
import { deleteManyContactsFromDB } from "../fetch";
import { createRemoveManyContactsModal } from "./constructor";
import * as ui from "../ui";

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
    ui.handleModalVisibility(main.modalContactRemove, true);

    main.menu.classList.remove("show-menu");
    main.menuAllOptions.forEach((option) => option.classList.remove("active"));
  }

  function closeModal() {
    ui.handleModalVisibility(main.modalContactRemove, false);
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
