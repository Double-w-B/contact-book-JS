import * as main from "../main";
import * as ui from "../ui";
import * as utils from "../utils";
import { removeUserAccount } from "../fetch";
import { createUserRemoveModal } from "./constructor";

export const removeAccountModal = () => {
  function closeModal() {
    ui.handleModalVisibility(main.modalAccountRemove, false);
    passwordInput.value = "";
    passwordIcon.classList.remove("active");
    passwordInput.type = "password";
    passwordInput.previousSibling.classList.remove("show");
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

  function handleButtonsClick(e) {
    if (e.target === confirmButton) confirmRemove();
    if (e.target === closeButton) closeModal();
  }

  createUserRemoveModal();
  const modal = document.querySelector(".modal__account-delete");
  const buttonsContainer = document.querySelector(".modal__account__buttons");
  const confirmButton = document.querySelector(
    ".modal__account__buttons-confirm"
  );
  const closeButton = document.querySelector(".modal__account__buttons-close");
  const loadingIcon = buttonsContainer.querySelector(".loadingIcon");
  const infoMsg = modal.querySelector(".modal__account-delete .infoMsg");
  const passwordInput = modal.querySelector(".modal__account-delete input");
  const passwordIcon = modal.querySelector(".password-input i");

  passwordIcon.addEventListener("click", utils.handlePasswordIcon);
  passwordInput.addEventListener("keydown", utils.handlePasswordInputChange);
  passwordInput.addEventListener("keyup", utils.handlePasswordInputChange);
  buttonsContainer.addEventListener("click", handleButtonsClick);
};
