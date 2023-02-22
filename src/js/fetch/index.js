import * as main from "../main.js";
import * as constructor from "../constructor.js";
import * as utils from "../utils.js";
import { showAllContacts } from "../showAllContacts.js";
import { handleModalVisibility } from "../ui.js";

const requestOptions = {};

//! checkCurrentUser
export async function checkCurrentUser() {
  utils.removeChildrenElements(main.listOfContacts);
  const loadingSpinner = constructor.createLoadingSpinner();
  loadingSpinner.classList.add("show");
  main.listOfContacts.append(loadingSpinner);

  const menuAuthBtnIcon = main.menuAuthBtn.querySelector("i");
  main.navHintIcon.classList.add("hide");

  const url = "/api/v1/user/checkUser";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      main.userAuth.isUserLoggedIn = false;
      setTimeout(() => {
        loadingSpinner.classList.remove("show");
        main.navHintIcon.classList.remove("hide");

        showAllContacts();
      }, 1000);
      return;
    }

    main.userAuth.isUserLoggedIn = true;
    main.userAuth.userName = data.user.name;
    main.userAuth.userEmail = data.user.email;

    getAllContacts();

    handleModalVisibility(main.modalAuth, false);
    main.navHintIcon.classList.add("hide");
    main.navInputContainer.classList.remove("disable");
    main.navNewContactBtn.classList.remove("hide");
    main.navAllContactsBtn.classList.remove("hide");
    main.menuAllOptions[0].classList.remove("hide");
    main.menuAllOptions[1].classList.remove("hide");
    main.menuAuthBtn.childNodes[1].textContent = "Log out";
    menuAuthBtnIcon.className = "fa-solid fa-arrow-right-from-bracket flip";
  } catch (error) {
    console.log(error);
  }
}
//! checkCurrentUser

//! registerUser
export async function registerUser(userData, methods, infoMsg) {
  const { handleIsLoading, clearInputs } = methods;

  const url = "/api/v1/auth/register";

  requestOptions.method = "POST";
  requestOptions.headers = { "Content-type": "application/json" };
  requestOptions.body = JSON.stringify(userData);

  handleIsLoading(true);
  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    setTimeout(() => {
      if (!response.ok) {
        handleIsLoading(false);
        utils.showInfoMsg(infoMsg, data.msg);
        utils.hideInfoMsg(infoMsg, 1500, "error");
        return;
      }

      utils.showInfoMsg(infoMsg, "Account created! Log in!", "success");
      clearInputs();
      handleIsLoading(false);
    }, 1000);

    utils.hideInfoMsg(infoMsg, 2500, "success");
  } catch (error) {
    console.log(error);
  }
}
//! registerUser

//! loginUser
export async function loginUser(userData, methods, infoMsg) {
  const { handleIsLoading, clearInputs } = methods;

  const menuAuthBtnIcon = main.menuAuthBtn.querySelector("i");

  const url = "/api/v1/auth/login";
  requestOptions.method = "POST";
  requestOptions.headers = { "Content-type": "application/json" };
  requestOptions.body = JSON.stringify(userData);

  handleIsLoading(true);
  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    setTimeout(() => {
      if (!response.ok) {
        handleIsLoading(false);
        utils.showInfoMsg(infoMsg, data.msg);
        utils.hideInfoMsg(infoMsg, 1500, "error");
        return;
      }

      clearInputs();
      handleIsLoading(false);

      main.userAuth.isUserLoggedIn = true;
      main.userAuth.userName = data.user.name;
      main.userAuth.userEmail = data.user.email;

      handleModalVisibility(main.modalAuth, false);

      main.navInputContainer.classList.remove("disable");
      main.navNewContactBtn.classList.remove("hide");
      main.navAllContactsBtn.classList.remove("hide");
      main.menuAllOptions[0].classList.remove("hide");
      main.menuAllOptions[1].classList.remove("hide");
      main.menuAuthBtn.childNodes[1].textContent = "Log out";
      menuAuthBtnIcon.className = "fa-solid fa-arrow-right-from-bracket flip";
      getAllContacts();
    }, 1000);
  } catch (error) {
    console.log(error);
  }
}
//! loginUser

//! logoutUser
export async function logoutUser() {
  const menuAuthBtnIcon = main.menuAuthBtn.querySelector("i");
  const loadingSpinner = constructor.createLoadingSpinner();

  const url = "/api/v1/auth/logout";

  utils.removeChildrenElements(main.listOfContacts);
  main.listOfContacts.append(loadingSpinner);
  loadingSpinner.classList.add("show");

  try {
    await fetch(url);

    loadingSpinner.classList.remove("show");
    main.userAuth.isUserLoggedIn = false;
    main.data.contacts = [];
    main.navInputContainer.classList.add("disable");
    main.navNewContactBtn.classList.add("hide");
    main.navAllContactsBtn.classList.add("hide");
    main.menuAllOptions[0].classList.add("hide");
    main.menuAllOptions[1].classList.add("hide");
    main.menuAuthBtn.childNodes[1].textContent = "Log in";
    menuAuthBtnIcon.className = "fa-solid fa-arrow-right-to-bracket";
    constructor.createNavigationLetters();

    setTimeout(() => {
      showAllContacts();
      main.navHintIcon.classList.remove("hide");
    }, 500);
  } catch (error) {
    console.log(error);
  }
}
//! logoutUser

//! getAllContacts
export async function getAllContacts() {
  utils.removeChildrenElements(main.listOfContacts);
  const loadingSpinner = constructor.createLoadingSpinner();
  loadingSpinner.classList.add("show");
  main.listOfContacts.append(loadingSpinner);

  const url = "/api/v1/contacts";
  try {
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
export async function addContactToDB(contact, methods, infoMsg) {
  const { handleIsLoading, closeModal } = methods;
  handleIsLoading(true);

  const url = "/api/v1/contacts";
  requestOptions.method = "POST";
  requestOptions.headers = { "Content-type": "application/json" };
  requestOptions.body = JSON.stringify(contact);

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      handleIsLoading(false);
      utils.showInfoMsg(infoMsg, data.msg);
      utils.hideInfoMsg(infoMsg, 1500);
      return;
    }

    main.contactImage.cloudinaryImageId = "";
    main.contactImage.contactImageName = "";
    main.contactImage.contactImageUrl = "";
    handleIsLoading(false);

    closeModal();
  } catch (error) {
    console.log(error);
  }
}
//! addContactToDB

//! uploadContactImage
export async function uploadContactImage(contactImage, handleIsLoading) {
  const url = "/api/v1/contacts/uploadImage";
  requestOptions.method = "POST";
  requestOptions.body = contactImage;
  if ("headers" in requestOptions) delete requestOptions["headers"];

  handleIsLoading(true);

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    main.contactImage.cloudinaryImageId = data.contactImageId;
    main.contactImage.contactImageUrl = data.contactImageUrl;
    main.contactImage.contactImageName = data.contactImageName;
    handleIsLoading(false);
  } catch (error) {
    console.log(error);
  }
}
//! uploadContactImage

//! removeContactImage
export async function removeContactImage(contactData, handleIsLoading) {
  const { cloudinaryImageId, contactId } = contactData;

  const data = { cloudinaryImageId };

  if (contactId) {
    data.contactId = contactId;
  }

  const url = "/api/v1/contacts/removeImage";
  requestOptions.method = "POST";
  requestOptions.headers = { "Content-type": "application/json" };
  requestOptions.body = JSON.stringify(data);

  handleIsLoading(true);
  try {
    await fetch(url, requestOptions);

    main.contactImage.cloudinaryImageId = "";
    main.contactImage.contactImageUrl = "";
    main.contactImage.contactImageName = "";
    handleIsLoading(false);
  } catch (error) {
    console.log(error);
  }
}
//! removeContactImage

//! removeUnsavedImageFromDB
export async function removeUnsavedImageFromDB() {
  const url = "/api/v1/contacts/removeUnsavedImage";

  try {
    await fetch(url);
  } catch (error) {
    console.log(error);
  }
}
//! removeUnsavedImageFromDB

//! deleteSingleContactFromDB
export async function deleteSingleContactFromDB(contactId, methods) {
  const { handleIsLoading, closeModal } = methods;

  const url = `/api/v1/contacts/${contactId}`;
  requestOptions.method = "DELETE";
  if ("body" in requestOptions) delete requestOptions["body"];
  if ("headers" in requestOptions) delete requestOptions["headers"];

  handleIsLoading(true);

  try {
    await fetch(url, requestOptions);

    getAllContacts();
    handleIsLoading(false);

    closeModal();
  } catch (error) {
    console.log(error);
  }
}
//! deleteSingleContactFromDB

//! deleteManyContactsFromDB
export async function deleteManyContactsFromDB(contactsId, methods) {
  const { handleIsLoading, closeModal } = methods;

  const url = "/api/v1/contacts";
  requestOptions.method = "DELETE";
  requestOptions.headers = { "Content-type": "application/json" };
  requestOptions.body = JSON.stringify({ contactsId });

  try {
    handleIsLoading(true);
    await fetch(url, requestOptions);

    getAllContacts();
    handleIsLoading(false);

    closeModal();
  } catch (error) {
    console.log(error);
  }
}
//! deleteManyContactsFromDB

//! updateContact
export async function updateContact(contactData, methods) {
  const { newContact: contact, contactId } = contactData;
  const { handleIsLoading, closeModal } = methods;

  const url = `/api/v1/contacts/${contactId}`;
  requestOptions.method = "PATCH";
  requestOptions.headers = { "Content-type": "application/json" };
  requestOptions.body = JSON.stringify(contact);

  handleIsLoading(true);
  try {
    await fetch(url, requestOptions);

    handleIsLoading(false);
    closeModal();
  } catch (error) {
    console.log(error);
  }
}
//! updateContact

/* UPDATE USER DATA */
//! updateName
export async function updateUserName(name, methods) {
  const { handleIsLoading } = methods;
  const inputsContainer = document.querySelector(".modal__update__credentials");
  const userNameInput = inputsContainer.querySelector(".userName-input input");
  const newUserNameInput = inputsContainer.querySelector(
    ".newUserName-input input"
  );

  const url = `/api/v1/user/updateName`;
  requestOptions.method = "PATCH";
  requestOptions.headers = { "Content-type": "application/json" };
  requestOptions.body = JSON.stringify({ name });

  handleIsLoading(true);
  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    setTimeout(() => {
      handleIsLoading(false);
      main.userAuth.userName = data.user.name;
      newUserNameInput.value = "";
      userNameInput.value = data.user.name;
      main.userAuth.userName = data.user.name;
    }, 1000);
  } catch (error) {
    console.log(error);
  }
}
//! updateName

//! updateEmail
export async function updateUserEmail(data, methods, infoMsg) {
  const { newUserEmail, userPassword } = data;
  const { handleIsLoading } = methods;
  const reqData = { email: newUserEmail, password: userPassword };

  const inputsContainer = document.querySelector(".modal__update__credentials");
  const userEmailInput = inputsContainer.querySelector(
    ".userEmail-input input"
  );
  const newUserEmailInput = inputsContainer.querySelector(
    ".newUserEmail-input input"
  );
  const userPasswordInput = inputsContainer.querySelector(
    ".password-input input"
  );

  const url = `/api/v1/user/updateEmail`;
  requestOptions.method = "PATCH";
  requestOptions.headers = { "Content-type": "application/json" };
  requestOptions.body = JSON.stringify(reqData);

  handleIsLoading(true);

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    setTimeout(() => {
      if (!response.ok) {
        handleIsLoading(false);

        if (data.msg.startsWith("Duplicate")) {
          utils.showInfoMsg(infoMsg, "This email already exists");
          newUserEmailInput.value = "";
          userPasswordInput.value = "";
        } else {
          utils.showInfoMsg(infoMsg, "Invalid credentials");
        }

        utils.hideInfoMsg(infoMsg, 2500, "error");
        return;
      }

      handleIsLoading(false);
      main.userAuth.userEmail = data.user.email;
      userEmailInput.value = data.user.email;
      newUserEmailInput.value = "";
      userPasswordInput.value = "";
    }, 1000);
  } catch (error) {
    console.log(error);
  }
}
//! updateEmail

//! updatePassword
export async function updateUserPassword(data, methods, infoMsg) {
  const { oldPassword, newPassword } = data;
  const { handleIsLoading } = methods;

  const inputsContainer = document.querySelector(".modal__update__credentials");
  const oldPasswordInput = inputsContainer.querySelector(
    ".password-input input"
  );
  const newPasswordInput = inputsContainer.querySelector(
    ".newPassword-input input"
  );

  const url = `/api/v1/user/updatePassword`;
  requestOptions.method = "PATCH";
  requestOptions.headers = { "Content-type": "application/json" };
  requestOptions.body = JSON.stringify({ oldPassword, newPassword });

  handleIsLoading(true);
  try {
    const response = await fetch(url, requestOptions);

    setTimeout(() => {
      if (!response.ok) {
        handleIsLoading(false);
        utils.showInfoMsg(infoMsg, "Invalid credentials", "error");
        utils.hideInfoMsg(infoMsg, 2500, "error");
        return;
      }

      handleIsLoading(false);
      utils.showInfoMsg(infoMsg, "Password updated", "success");
      oldPasswordInput.value = "";
      newPasswordInput.value = "";
    }, 1000);

    utils.hideInfoMsg(infoMsg, 2500, "success");
  } catch (error) {
    console.log(error);
  }
}
//! updatePassword
/* UPDATE USER DATA */

// ! removeAccount
export const removeUserAccount = async (password, methods, infoMsg) => {
  const { handleIsLoading, closeModal } = methods;

  const url = `/api/v1/user/deleteUser`;
  requestOptions.method = "DELETE";
  requestOptions.headers = { "Content-type": "application/json" };
  requestOptions.body = JSON.stringify({ password });

  handleIsLoading(true);

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    setTimeout(() => {
      if (!response.ok) {
        handleIsLoading(false);
        utils.showInfoMsg(infoMsg, data.msg);
        utils.hideInfoMsg(infoMsg, 2500);
        return;
      }

      logoutUser();

      setTimeout(() => {
        handleIsLoading(false);
        closeModal();
      }, 500);
    }, 1000);
  } catch (error) {
    console.log(error);
  }
};
// ! removeAccount
