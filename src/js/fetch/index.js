import * as main from "../main.js";
import { showAllContacts } from "../showAllContacts.js";

export const checkCurrentUser = async () => {
  const url = "/api/v1/user/checkUser";
  const hintIcon = document.querySelector(".hintIcon");

  try {
    const response = await fetch(url);
    // const data = await response.json();

    if (!response.ok) {
      main.userAuth.isUserLoggedIn = false;
      showAllContacts();
      return;
    }

    main.userAuth.isUserLoggedIn = true;
    showAllContacts();
    hintIcon.classList.add("hide");
    main.modalBackdrop.classList.remove("open-modal");
    main.modalAuth.classList.remove("open-modal");
    main.menuButtons.forEach((button) => button.classList.remove("hide"));
    main.inputContainer.classList.remove("disable");
    main.navNewContactBtn.classList.remove("hide");
    main.navAllContactsBtn.classList.remove("hide");
    main.menuAuthBtn.textContent = "Log out";
  } catch (error) {
    console.log(error);
  }
};
