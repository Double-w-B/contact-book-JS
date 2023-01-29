import * as main from "../main.js";
import * as constructor from "../constructor.js";
import { removeChildrenElements } from "../utils.js";
import { showAllContacts } from "../showAllContacts.js";
import { userImage } from "../modals/addContactModal.js";

//! checkCurrentUser
export async function checkCurrentUser() {
  removeChildrenElements(main.listOfContacts);
  const loadingSpinner = constructor.createLoadingSpinner();
  loadingSpinner.classList.add("show");
  main.listOfContacts.append(loadingSpinner);

  const hintIcon = document.querySelector(".hintIcon");
  hintIcon.classList.add("hide");

  try {
    const url = "/api/v1/user/checkUser";
    const response = await fetch(url);

    if (!response.ok) {
      main.userAuth.isUserLoggedIn = false;
      setTimeout(() => {
        loadingSpinner.classList.remove("show");
        hintIcon.classList.remove("hide");

        showAllContacts();
      }, 1000);
      return;
    }

    main.userAuth.isUserLoggedIn = true;

    getAllContacts();

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
}
//! checkCurrentUser

//! registerUser
export async function registerUser(userData, methods) {
  const errorMsg = document.querySelector(
    ".modal__auth__change__credentials .infoMsg"
  );
  const url = "/api/v1/auth/register";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userData),
  };

  try {
    methods.showLoadingIcon();

    const response = await fetch(url, requestOptions);
    const data = await response.json();

    setTimeout(() => {
      if (!response.ok) {
        errorMsg.textContent = data.msg;
        errorMsg.classList.add("show", "error");
        methods.hideLoadingIcon();
        setTimeout(() => {
          errorMsg.classList.remove("show", "error");
        }, 1500);
        return;
      }
      errorMsg.textContent = "Account created! Log in!";
      errorMsg.classList.add("show", "success");

      methods.clearInputs();
      methods.hideLoadingIcon();
    }, 1000);
  } catch (error) {
    console.log(error);
  }
}
//! registerUser

//! loginUser
export async function loginUser(userData, methods) {
  const errorMsg = document.querySelector(
    ".modal__auth__change__credentials .infoMsg"
  );
  const url = "/api/v1/auth/login";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userData),
  };

  try {
    methods.showLoadingIcon();

    const response = await fetch(url, requestOptions);
    const data = await response.json();

    setTimeout(() => {
      if (!response.ok) {
        errorMsg.textContent = data.msg;
        errorMsg.classList.add("show error");
        methods.hideLoadingIcon();

        setTimeout(() => {
          errorMsg.classList.remove("show error");
        }, 1500);
        return;
      }

      methods.clearInputs();
      methods.hideLoadingIcon();
      main.userAuth.isUserLoggedIn = true;
      main.modalBackdrop.classList.remove("open-modal");
      main.modalAuth.classList.remove("open-modal");
      main.menuButtons.forEach((button) => button.classList.remove("hide"));
      main.inputContainer.classList.remove("disable");
      main.navNewContactBtn.classList.remove("hide");
      main.navAllContactsBtn.classList.remove("hide");
      main.menuAuthBtn.textContent = "Log out";
      getAllContacts();
    }, 1000);
  } catch (error) {
    console.log(error);
  }
}
//! loginUser

//! logoutUser
export async function logoutUser() {
  const hintIcon = document.querySelector(".hintIcon");
  const url = "/api/v1/auth/logout";

  try {
    await fetch(url);
    main.userAuth.isUserLoggedIn = false;
    main.data.contacts = [];
    main.menuButtons.forEach((button) => button.classList.add("hide"));
    main.inputContainer.classList.add("disable");
    main.navNewContactBtn.classList.add("hide");
    main.navAllContactsBtn.classList.add("hide");
    main.menuAuthBtn.textContent = "Log in";
    constructor.createNavigationLetters();

    setTimeout(() => {
      showAllContacts();
      hintIcon.classList.remove("hide");
    }, 500);
  } catch (error) {
    console.log(error);
  }
}
//! logoutUser

//! getAllContacts
export async function getAllContacts() {
  removeChildrenElements(main.listOfContacts);
  const loadingSpinner = constructor.createLoadingSpinner();
  loadingSpinner.classList.add("show");
  main.listOfContacts.append(loadingSpinner);

  try {
    const url = "/api/v1/contacts";
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      loadingSpinner.classList.remove("show");
      const textInfo = "Oops! Something went wrong.";
      const iconClassName = "fas fa-exclamation-triangle";
      constructor.createInfoIcon(textInfo, iconClassName);
      return;
    }

    setTimeout(() => {
      main.data.contacts = data.contacts;
      constructor.createNavigationLetters();
      loadingSpinner.classList.remove("show");
      showAllContacts();
    }, 1000);
  } catch (error) {
    console.log(error);
  }
}
//! getAllContacts

//! addContactToDB
export async function addContactToDB(contact, closeModal) {
  const errorMsg = document.querySelector(".new-con-secondary-info .infoMsg");
  try {
    const url = "/api/v1/contacts";

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(contact),
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      errorMsg.classList.add("show");
      errorMsg.textContent = data.msg;

      setTimeout(() => {
        errorMsg.classList.remove("show");
      }, 1500);
      return;
    }

    getAllContacts();
    closeModal();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
//! addContactToDB

//! uploadContactImage
export async function uploadContactImage(contactImage) {
  const url = "/api/v1/contacts/uploadImage";
  const requestOptions = {
    method: "POST",
    body: contactImage,
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    userImage.cloudinaryImgId = data.msg;

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
//! uploadContactImage

//! removeContactImage
export async function removeContactImage(cloudinaryImgId, contactId) {
  const url = "/api/v1/contacts/removeImage";

  const data = { cloudinaryImgId };

  if (contactId) {
    data.contactId = contactId;
  }

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
//! removeContactImage

//! removeUnsavedImageFromDB
export async function removeUnsavedImageFromDB() {
  const url = "/api/v1/contacts/removeUnsavedImage";

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

//! removeUnsavedImageFromDB

//! deleteSingleContactFromDB
export async function deleteSingleContactFromDB(contactId, closeModal) {
  const url = `/api/v1/contacts/${contactId}`;
  const requestOptions = {
    method: "DELETE",
  };

  try {
    await fetch(url, requestOptions);

    getAllContacts();
    closeModal();
  } catch (error) {
    console.log(error);
  }
}
//! deleteSingleContactFromDB

//! deleteManyContactsFromDB
export async function deleteManyContactsFromDB(contactsId, closeModal) {
  try {
    const url = "/api/v1/contacts";
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ contactsId }),
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();

    getAllContacts();
    closeModal();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
//! deleteManyContactsFromDB

//! updateContact
export async function updateContact(contact, contactId, closeModal) {
  try {
    const url = `/api/v1/contacts/${contactId}`;
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(contact),
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();

    getAllContacts();
    closeModal();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
//! updateContact
