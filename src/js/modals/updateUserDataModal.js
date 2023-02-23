import * as main from "../main";
import * as utils from "../utils";
import * as fetch from "../fetch";
import * as ui from "../ui";
import { createUpdateDataModal, createInputContent } from "./constructor";
import { createNewElement } from "../constructor";

export const updateUserDataModal = () => {
  function closeModal() {
    ui.handleModalVisibility(main.modalUpdateData, false);

    removeActive();
    changeButtons[0].classList.add("active");
    utils.removeChildrenElements(inputsContainer);
    createNameInputs();
    createInfoElm();
  }

  function removeActive() {
    changeButtons.forEach((btn) => btn.classList.remove("active"));
  }

  function createNameInputs() {
    const nameInput = createInputContent("user-name", "userName-input");
    const newNameInput = createInputContent("new-name", "newUserName-input");
    inputsContainer.append(nameInput, newNameInput);

    const userNameInput = inputsContainer.querySelector(
      ".userName-input input"
    );
    userNameInput.value = main.userAuth.userName;
  }

  function createEmailInputs() {
    const emailInput = createInputContent("user-email", "userEmail-input");
    const newEmailInput = createInputContent("new-email", "newUserEmail-input");
    const passwordInput = createInputContent("password", "password-input");
    inputsContainer.append(emailInput, newEmailInput, passwordInput);

    const userEmailInput = inputsContainer.querySelector(
      ".userEmail-input input"
    );
    userEmailInput.value = main.userAuth.userEmail;
  }

  function createPasswordInputs() {
    const oldPasswordInput = createInputContent("password", "password-input");
    const newPasswordInput = createInputContent(
      "new-password",
      "newPassword-input"
    );

    inputsContainer.append(oldPasswordInput, newPasswordInput);
  }

  function createInfoElm() {
    const pElm = createNewElement("p", "infoMsg");
    inputsContainer.append(pElm);
  }

  function handleInputsClick(e) {
    if (e.target.tagName === "I") utils.handlePasswordIcon(e);

    if (
      e.target.tagName === "INPUT" &&
      (e.target.parentElement.className.includes("password") ||
        e.target.parentElement.className.includes("Password"))
    ) {
      e.target.addEventListener("keydown", utils.handlePasswordInputChange);
      e.target.addEventListener("keyup", utils.handlePasswordInputChange);
    }
  }

  function handleChangeButtons(e) {
    if (e.target.tagName !== "BUTTON") return;
    if (e.target.className.includes("active")) return;

    removeActive();
    utils.removeChildrenElements(inputsContainer);

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
    createInfoElm();
  }

  function handleButtonsClick(e) {
    if (e.target === updateButton) updateUserData();
    if (e.target === closeButton) closeModal();
  }

  function handleIsLoading(boolean) {
    changeButtons.forEach((btn) => btn.classList.toggle("hide", boolean));
    loadingIcon.classList.toggle("show", boolean);
    updateButton.classList.toggle("disable", boolean);
  }

  function updateUserData() {
    const allInputs = inputsContainer.querySelectorAll("input");
    const infoMsg = inputsContainer.querySelector(".infoMsg");
    const activeSection = Array.from(changeButtons).find((btn) =>
      btn.classList.contains("active")
    ).innerText;
    const methods = { handleIsLoading };

    if (infoMsg.classList.contains("show")) return;

    if (activeSection === "Name") {
      const newUserName = Array.from(allInputs)[1].value;

      if (!newUserName) {
        utils.showInfoMsg(infoMsg, "Please provide value");
        utils.hideInfoMsg(infoMsg, 1500, "error");
        return;
      }

      fetch.updateUserName(newUserName, methods);
    }

    if (activeSection === "Email") {
      const newUserEmail = Array.from(allInputs)[1].value;
      const userPassword = Array.from(allInputs)[2].value;
      const data = { newUserEmail, userPassword };

      if (!newUserEmail || !userPassword) {
        utils.showInfoMsg(infoMsg, "Please provide all values");
        utils.hideInfoMsg(infoMsg, 1500, "error");
        return;
      }

      if (userPassword.length < 6) {
        utils.showInfoMsg(infoMsg, "Password length min. 6 characters");
        utils.hideInfoMsg(infoMsg, 1500, "error");
        return;
      }

      if (!newUserEmail.match(utils.emailRegExp)) {
        utils.showInfoMsg(infoMsg, "Provide valid email");
        utils.hideInfoMsg(infoMsg, 1500, "error");
        return;
      }

      fetch.updateUserEmail(data, methods, infoMsg);
    }

    if (activeSection === "Password") {
      const oldPassword = Array.from(allInputs)[0].value;
      const newPassword = Array.from(allInputs)[1].value;
      const data = { oldPassword, newPassword };

      if (!oldPassword || !newPassword) {
        utils.showInfoMsg(infoMsg, "Please provide all values");
        utils.hideInfoMsg(infoMsg, 1500, "error");
        return;
      }

      if (oldPassword.length < 6 || newPassword.length < 6) {
        utils.showInfoMsg(infoMsg, "Password length min. 6 characters");
        utils.hideInfoMsg(infoMsg, 1500, "error");
        return;
      }

      fetch.updateUserPassword(data, methods, infoMsg);
    }
  }

  createUpdateDataModal();

  const inputsContainer = document.querySelector(".modal__update__credentials");
  const changeButtonsContainer = document.querySelector(
    ".modal__update__change"
  );
  const changeButtons = changeButtonsContainer.querySelectorAll("button");
  const loadingIcon = changeButtonsContainer.querySelector(".loadingIcon");
  const buttonsContainer = document.querySelector(".modal__update__buttons");
  const updateButton = document.querySelector(".modal__update__buttons-update");
  const closeButton = document.querySelector(".modal__update__buttons-close");

  buttonsContainer.addEventListener("click", handleButtonsClick);
  changeButtonsContainer.addEventListener("click", handleChangeButtons);
  inputsContainer.addEventListener("click", handleInputsClick);
};
