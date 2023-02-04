import * as main from "../main";
import * as utils from "../utils";
import * as fetch from "../fetch";
import { createUpdateDataModal, createInputContent } from "./constructor";

export const updateContactModal = () => {
  function closeModal() {
    main.modalBackdrop.classList.remove("open-modal");
    main.modalUpdateData.classList.remove("open-modal");

    removeActive();
    changeButtons[0].classList.add("active");
    utils.removeChildrenElements(inputsContainer);
    createNameInputs();
    createErrorElm();
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

  function createErrorElm() {
    const pElm = document.createElement("p");
    pElm.className = "infoMsg";
    inputsContainer.append(pElm);
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
    createErrorElm();
  }

  function showErrorMsg(msg, errorMsgElm) {
    errorMsgElm.textContent = msg;
    errorMsgElm.classList.add("show", "error");
  }

  function hideErrorMsg(errorMsgElm) {
    setTimeout(() => {
      errorMsgElm.classList.remove("show", "error");
    }, 1500);
  }

  function showLoadingIcon() {
    changeButtons.forEach((btn) => btn.classList.add("hide"));
    loadingIcon.classList.add("show");
    updateButton.classList.add("disable");
  }

  function hideLoadingIcon() {
    changeButtons.forEach((btn) => btn.classList.remove("hide"));
    loadingIcon.classList.remove("show");
    updateButton.classList.remove("disable");
  }

  function updateUserData() {
    const allInputs = inputsContainer.querySelectorAll("input");
    const errorMsg = inputsContainer.querySelector(".infoMsg");
    const activeSection = Array.from(changeButtons).find((btn) =>
      btn.classList.contains("active")
    ).innerText;
    const methods = { showLoadingIcon, hideLoadingIcon };

    if (activeSection === "Name") {
      const newUserName = Array.from(allInputs)[1].value;

      if (!newUserName) {
        showErrorMsg("Please provide value", errorMsg);
        hideErrorMsg(errorMsg);
        return;
      }
      fetch.updateUserName(newUserName, methods);
    }

    if (activeSection === "Email") {
      const newUserEmail = Array.from(allInputs)[1].value;
      const userPassword = Array.from(allInputs)[2].value;
      const data = { newUserEmail, userPassword };

      if (!newUserEmail || !userPassword) {
        showErrorMsg("Please provide all values", errorMsg);
        hideErrorMsg(errorMsg);
        return;
      }
      if (userPassword.length < 6) {
        showErrorMsg("Password length min. 6 characters", errorMsg);
        hideErrorMsg(errorMsg);
        return;
      }

      if (!newUserEmail.match(utils.emailRegExp)) {
        showErrorMsg("Provide valid email", errorMsg);
        hideErrorMsg(errorMsg);
        return;
      }

      fetch.updateUserEmail(data, methods);
    }

    if (activeSection === "Password") {
      const oldPassword = Array.from(allInputs)[0].value;
      const newPassword = Array.from(allInputs)[1].value;
      const data = { oldPassword, newPassword };

      if (!oldPassword || !newPassword) {
        showErrorMsg("Please provide all values", errorMsg);
        hideErrorMsg(errorMsg);
        return;
      }

      if (oldPassword.length < 6 || newPassword.length < 6) {
        showErrorMsg("Password length min. 6 characters", errorMsg);
        hideErrorMsg(errorMsg);
        return;
      }

      fetch.updateUserPassword(data, methods);
    }
  }

  createUpdateDataModal();

  const inputsContainer = document.querySelector(".modal__update__credentials");
  const changeButtonsContainer = document.querySelector(
    ".modal__update__change"
  );
  const changeButtons = changeButtonsContainer.querySelectorAll("button");
  const loadingIcon = changeButtonsContainer.querySelector(".loadingIcon");
  const updateButton = document.querySelector(".modal__update__buttons-update");
  const closeButton = document.querySelector(".modal__update__buttons-close");

  updateButton.addEventListener("click", updateUserData);
  changeButtonsContainer.addEventListener("click", handleChangeButtons);
  closeButton.addEventListener("click", closeModal);
};
