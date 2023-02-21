import * as main from "../main";
import { createUserRemoveModal } from "./constructor";
import { removeUserAccount } from "../fetch";

export const removeAccountModal = () => {
  function closeModal() {
    main.modalBackdrop.classList.remove("open-modal");
    main.modalAccountRemove.classList.remove("open-modal");
    passwordInput.value = "";
  }

  function handleIsLoading(boolean) {
    loadingIcon.classList.toggle("show", boolean);
    confirmButton.classList.toggle("disable", boolean);
  }

  function handleErrorMsg(boolean, txt) {
    errorMsg.classList.toggle("show", boolean);
    errorMsg.textContent = txt;
  }

  function confirmRemove() {
    const methods = { handleIsLoading, handleErrorMsg, closeModal };

    if (!passwordInput.value) {
      handleErrorMsg(true, "Please provide value");

      setTimeout(() => {
        handleErrorMsg(false, "");
      }, 1000);
      return;
    }

    removeUserAccount(passwordInput.value, methods);
  }

  createUserRemoveModal();
  const buttonsContainer = document.querySelector(".modal__account__buttons");
  const confirmButton = document.querySelector(
    ".modal__account__buttons-confirm"
  );
  const closeButton = document.querySelector(".modal__account__buttons-close");
  const loadingIcon = buttonsContainer.querySelector(".loadingIcon");
  const passwordInput = document.querySelector(".modal__account-delete input");
  const errorMsg = document.querySelector(".modal__account-delete .infoMsg");

  confirmButton.addEventListener("click", confirmRemove);
  closeButton.addEventListener("click", closeModal);
};
