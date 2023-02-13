import * as main from "../main.js";
import * as fetchData from "../fetch/index.js";
import * as constructor from "./constructor.js";
import { requiredInput } from "../validation.js";

export const authModal = () => {
  constructor.createAuthModal();

  const changeButton = document.querySelector(".modal__auth__change__button");
  const authButton = document.querySelector(".modal__auth__buttons-auth");
  const closeButton = document.querySelector(".modal__auth__buttons-close");
  const authCredentials = document.querySelector(".modal__auth__credentials");
  const emailInputContainer = document.querySelector(".userEmail-input");
  const nameInputContainer = constructor.createInputContent(
    "user-name",
    "userName-input"
  );
  const errorMsg = document.querySelector(".modal__auth__credentials .infoMsg");

  const allInputs = authCredentials.getElementsByTagName("input");
  const loadingIcon = document.querySelector(".loadingIcon");
  const hintIcon = document.querySelector(".hintIcon");
  let isInputError = false;

  function closeModal() {
    main.modalBackdrop.classList.remove("open-modal");
    main.modalAuth.classList.remove("open-modal");
    hintIcon.classList.remove("hide");

    if (authCredentials.children.length === 4) {
      authCredentials.removeChild(nameInputContainer);
    }
    changeButton.textContent = "register";
    authButton.textContent = "login";
    Array.from(allInputs).forEach((input) => (input.value = ""));
  }

  function handleChangeButton() {
    clearInputs();

    if (changeButton.textContent === "register") {
      authCredentials.insertBefore(nameInputContainer, emailInputContainer);
      changeButton.textContent = "login";
      authButton.textContent = "register";
    } else {
      authCredentials.removeChild(nameInputContainer);
      changeButton.textContent = "register";
      authButton.textContent = "login";
      errorMsg.classList.remove("show", "success");
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
      fetchData.registerUser(userData, methods);
    }

    if (authButton.textContent === "login" && !isInputError) {
      const userData = {
        email: Array.from(allInputs)[0].value.toLowerCase(),
        password: Array.from(allInputs)[1].value,
      };
      fetchData.loginUser(userData, methods);
    }
  }

  changeButton.addEventListener("click", handleChangeButton);
  closeButton.addEventListener("click", closeModal);
  authButton.addEventListener("click", handleAuthButton);
};
