import * as main from "../main.js";
import * as utils from "../utils.js";
import * as fetchData from "../fetch/index.js";
import * as constructor from "./constructor.js";
import { handleModalVisibility } from "../ui.js";

export const authModal = () => {
  constructor.createAuthModal();

  const modal = document.querySelector(".modal__auth");
  const changeButton = document.querySelector(".modal__auth__change__button");
  const authButton = document.querySelector(".modal__auth__buttons-auth");
  const closeButton = document.querySelector(".modal__auth__buttons-close");
  const authCredentials = document.querySelector(".modal__auth__credentials");
  const emailInputContainer = document.querySelector(".userEmail-input");
  const passwordInput = document.querySelector(".password-input input");
  const passwordIcon = document.querySelector(".password-input i");
  const nameInputContainer = constructor.createInputContent(
    "user-name",
    "userName-input"
  );
  const infoMsg = document.querySelector(".modal__auth__credentials .infoMsg");
  const allInputs = authCredentials.getElementsByTagName("input");
  const loadingIcon = document.querySelector(".loadingIcon");
  const passwordIconContainer = modal.querySelector(".icon");
  let isInputError = false;

  function closeModal() {
    handleModalVisibility(main.modalAuth, false);
    main.navHintIcon.classList.remove("hide");

    if (authCredentials.children.length === 4) {
      authCredentials.removeChild(nameInputContainer);
    }
    changeButton.textContent = "register";
    authButton.textContent = "login";
    Array.from(allInputs).forEach((input) => (input.value = ""));
    passwordIconContainer.classList.remove("show");
    passwordInput.type = "password";
  }

  function handleChangeButton() {
    passwordIconContainer.classList.remove("show");
    passwordInput.type = "password";
    clearInputs();

    Array.from(allInputs).forEach((input) => {
      const inputInfoMsg = input.parentElement.lastElementChild;
      inputInfoMsg.classList.remove("show");
      if (input.name === "password") {
        const inputIcon = input.previousElementSibling.firstElementChild;
        inputIcon.classList.remove("active");
      }
    });

    const highestTimeoutId = window.setTimeout(() => {
      for (let i = highestTimeoutId; i >= 0; i--) {
        window.clearTimeout(i);
      }
    }, 0);

    if (changeButton.textContent === "register") {
      authCredentials.insertBefore(nameInputContainer, emailInputContainer);
      changeButton.textContent = "login";
      authButton.textContent = "register";
    } else {
      authCredentials.removeChild(nameInputContainer);
      changeButton.textContent = "register";
      authButton.textContent = "login";
      infoMsg.classList.remove("show", "success");
    }
  }

  function clearInputs() {
    Array.from(allInputs).forEach((input) => (input.value = ""));
  }

  function handleIsLoading(boolean) {
    changeButton.classList.toggle("hide", boolean);
    loadingIcon.classList.toggle("show", boolean);
    authButton.classList.toggle("disable", boolean);
  }

  function handleInputError() {
    isInputError = true;
    setTimeout(() => {
      isInputError = false;
    }, 1500);
  }

  function handleAuthButton() {
    Array.from(allInputs).forEach((input) => {
      const inputInfoMsg = input.parentElement.lastElementChild;

      if (!input.value) {
        handleInputError();
        utils.showInfoMsg(inputInfoMsg, "Please provide value", "error");
        utils.hideInfoMsg(inputInfoMsg, 1500, "error");
        return;
      }

      if (
        input.name === "user-email" &&
        input.value &&
        !input.value.match(utils.emailRegExp)
      ) {
        handleInputError();
        utils.showInfoMsg(inputInfoMsg, "Please provide valid email", "error");
        utils.hideInfoMsg(inputInfoMsg, 1500, "error");
        return;
      }
    });

    const methods = { handleIsLoading, clearInputs };

    if (authButton.textContent === "register" && !isInputError) {
      const userData = {
        name: Array.from(allInputs)[0].value,
        email: Array.from(allInputs)[1].value.toLowerCase(),
        password: Array.from(allInputs)[2].value,
      };

      fetchData.registerUser(userData, methods, infoMsg);
    }

    if (authButton.textContent === "login" && !isInputError) {
      const userData = {
        email: Array.from(allInputs)[0].value.toLowerCase(),
        password: Array.from(allInputs)[1].value,
      };
      fetchData.loginUser(userData, methods, infoMsg);
    }
  }

  function handleModalClick(e) {
    if (e.target === changeButton) handleChangeButton();
    if (e.target === closeButton) closeModal();
    if (e.target === authButton) handleAuthButton();
  }

  passwordIcon.addEventListener("click", utils.handlePasswordIcon);
  passwordInput.addEventListener("keydown", utils.handlePasswordInputChange);
  passwordInput.addEventListener("keyup", utils.handlePasswordInputChange);
  modal.addEventListener("click", handleModalClick);
};
