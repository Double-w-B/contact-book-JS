import * as main from "../main.js";
import * as utils from "../utils.js";
import * as fetchData from "../fetch/index.js";
import * as constructor from "./constructor.js";
import { requiredInput } from "../validation.js";
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

  function handleAuthButton() {
    Array.from(allInputs).forEach((input) => {
      if (!input.value) {
        requiredInput(input);
        isInputError = true;

        setTimeout(() => {
          isInputError = false;
        });
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
