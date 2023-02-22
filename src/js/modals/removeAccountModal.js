import * as main from "../main";
import { createUserRemoveModal } from "./constructor";
import { removeUserAccount } from "../fetch";
import * as ui from "../ui";
import * as utils from "../utils";

export const removeAccountModal = () => {
  function closeModal() {
    ui.handleModalVisibility(main.modalAccountRemove, false);
    passwordInput.value = "";
  }

  function handleIsLoading(boolean) {
    loadingIcon.classList.toggle("show", boolean);
    confirmButton.classList.toggle("disable", boolean);
  }

  function confirmRemove() {
    const methods = { handleIsLoading, closeModal };

    if (infoMsg.classList.contains("show")) return;

    if (!passwordInput.value) {
      utils.showInfoMsg(infoMsg, "Please provide value");
      utils.hideInfoMsg(infoMsg, 1000);
      return;
    }

    removeUserAccount(passwordInput.value, methods, infoMsg);
  }

  createUserRemoveModal();
  const buttonsContainer = document.querySelector(".modal__account__buttons");
  const confirmButton = document.querySelector(
    ".modal__account__buttons-confirm"
  );
  const closeButton = document.querySelector(".modal__account__buttons-close");
  const loadingIcon = buttonsContainer.querySelector(".loadingIcon");
  const passwordInput = document.querySelector(".modal__account-delete input");
  const infoMsg = document.querySelector(".modal__account-delete .infoMsg");

  confirmButton.addEventListener("click", confirmRemove);
  closeButton.addEventListener("click", closeModal);
};
