import * as main from "../main";
import { createUpdateDataModal } from "./constructor";
import { removeChildrenElements } from "../utils";
import { createInputContent } from "./constructor";

export const updateContactModal = () => {
  function closeModal() {
    main.modalBackdrop.classList.remove("open-modal");
    main.modalUpdateData.classList.remove("open-modal");

    removeActive();
    changeButtons[0].classList.add("active");
    removeChildrenElements(inputsContainer);
    createNameInputs();
    createErrorElm();
  }

  function removeActive() {
    changeButtons.forEach((btn) => btn.classList.remove("active"));
  }

//   function clearInputs() {
//     const inputs = inputsContainer.querySelectorAll("input");
//     inputs.forEach((input) => (input.value = ""));
//   }

  function createNameInputs() {
    const nameInput = createInputContent("user-name", "userName-input");
    const newNameInput = createInputContent(
      "user-new-name",
      "newUserName-input"
    );
    inputsContainer.append(nameInput, newNameInput);
  }

  function createEmailInputs() {
    const emailInput = createInputContent("user-email", "userEmail-input");
    const newEmailInput = createInputContent(
      "user-new-email",
      "userEmail-input"
    );
    const passwordInput = createInputContent("password", "password-input");
    inputsContainer.append(emailInput, newEmailInput, passwordInput);
  }

  function createPasswordInputs() {
    const oldPasswordInput = createInputContent(
      "user-password",
      "password-input"
    );
    const newPasswordInput = createInputContent(
      "user-new-password",
      "password-input"
    );
    inputsContainer.append(oldPasswordInput, newPasswordInput);
  }

  function createErrorElm() {
    const pElm = document.createElement("p");
    pElm.className = "infoMsg";
    inputsContainer.append(pElm);
  }

  function handleChangeButtons(e) {
    if (e.target.tagName !== "BUTTON") return;
    if (e.target.className.includes("active")) return;

    removeActive();
    removeChildrenElements(inputsContainer);

    if (e.target.innerText === "Name") {
      e.target.classList.add("active");
      createNameInputs();
    }
    if (e.target.innerText === "Email") {
      e.target.classList.add("active");
      createEmailInputs();
    }
    if (e.target.innerText === "Password") {
      e.target.classList.add("active");
      createPasswordInputs();
    }
    createErrorElm();
  }

  createUpdateDataModal();

  const inputsContainer = document.querySelector(".modal__update__credentials");
  const changeButtonsContainer = document.querySelector(
    ".modal__update__change"
  );
  const changeButtons = changeButtonsContainer.querySelectorAll("button");
  const updateButton = document.querySelector(".modal__update__buttons-update");
  const closeButton = document.querySelector(".modal__update__buttons-close");

  changeButtonsContainer.addEventListener("click", handleChangeButtons);
  closeButton.addEventListener("click", closeModal);
};
