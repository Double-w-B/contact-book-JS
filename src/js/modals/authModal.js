import * as main from "../main.js";
// import * as utils from "../utils.js";
import { createAuthModal } from "./constructor.js";
import { createInputContent } from "./constructor.js";
import { requiredInput } from "../validation.js";
import { showAllContacts } from "../showAllContacts.js";

export const authModal = () => {
  createAuthModal();
  //   main.modalBackdrop.classList.add("open-modal");
  //   main.modalAuth.classList.add("open-modal");
  const changeButton = document.querySelector(".modal__auth__change__button");
  const authButton = document.querySelector(".modal__auth__buttons-auth");
  const closeButton = document.querySelector(".modal__auth__buttons-close");
  const authCredentials = document.querySelector(".modal__auth__credentials");
  const emailInputContainer = document.querySelector(".userEmail-input");
  const nameInputContainer = createInputContent("user-name", "userName-input");

  // nameInputContainer.setAttribute("autofocus", "true");
  const allInputs = authCredentials.getElementsByTagName("input");
  const loadingIcon = document.querySelector(".loadingIcon");
  const hintIcon = document.querySelector(".hintIcon");
  let isInputError = false;

  const url = "/api/v1/auth";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  };

  function clearInputs() {
    Array.from(allInputs).forEach((input) => (input.value = ""));
  }

  function closeModal() {
    main.modalBackdrop.classList.remove("open-modal");
    main.modalAuth.classList.remove("open-modal");
    hintIcon.classList.remove("hide");

    if (authCredentials.children.length === 3) {
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
    }
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

    if (authButton.textContent === "register" && !isInputError) {
      register();
    }
    if (authButton.textContent === "login" && !isInputError) {
      login();
    }
  }
  function showLoadingIcon() {
    changeButton.classList.add("hide");
    loadingIcon.classList.add("show");
    authButton.classList.add("disable");
  }
  function hideLoadingIcon() {
    loadingIcon.classList.remove("show");
    changeButton.classList.remove("hide");
    authButton.classList.remove("disable");
  }

  async function register() {
    const userData = {
      name: Array.from(allInputs)[0].value,
      email: Array.from(allInputs)[1].value,
      password: Array.from(allInputs)[2].value,
    };
    requestOptions.body = JSON.stringify(userData);

    try {
      showLoadingIcon();

      const response = await fetch(url + "/register", requestOptions);
      const data = await response.json();

      setTimeout(() => {
        if (!response.ok) {
          hideLoadingIcon();
          return;
        }

        clearInputs();
        hideLoadingIcon();
      }, 1000);

    } catch (error) {
      console.log(error);
    }
  }

  async function login() {
    const userData = {
      email: Array.from(allInputs)[0].value,
      password: Array.from(allInputs)[1].value,
    };

    requestOptions.body = JSON.stringify(userData);
    try {
      showLoadingIcon();

      const response = await fetch(url + "/login", requestOptions);
      // const data = await response.json();

      setTimeout(() => {
        if (!response.ok) {
          hideLoadingIcon();
          return;
        }

        clearInputs();
        hideLoadingIcon();
        main.userAuth.isUserLoggedIn = true;
        main.modalBackdrop.classList.remove("open-modal");
        main.modalAuth.classList.remove("open-modal");
        main.menuButtons.forEach((button) => button.classList.remove("hide"));
        main.inputContainer.classList.remove("disable");
        main.navNewContactBtn.classList.remove("hide");
        main.navAllContactsBtn.classList.remove("hide");
        main.menuAuthBtn.textContent = "Log out";
        showAllContacts();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  changeButton.addEventListener("click", handleChangeButton);
  closeButton.addEventListener("click", closeModal);
  authButton.addEventListener("click", handleAuthButton);
};
