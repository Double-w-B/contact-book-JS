import * as main from "../main.js";
import * as constructor from "../constructor.js";
import { removeChildrenElements } from "../utils.js";
import { showAllContacts } from "../showAllContacts.js";

const requestOptions = {};

//! checkCurrentUser
export async function checkCurrentUser() {
  removeChildrenElements(main.listOfContacts);
  const loadingSpinner = constructor.createLoadingSpinner();
  loadingSpinner.classList.add("show");
  main.listOfContacts.append(loadingSpinner);

  const hintIcon = document.querySelector(".hintIcon");
  hintIcon.classList.add("hide");

  const url = "/api/v1/user/checkUser";

  try {
    const response = await fetch(url);
    const data = await response.json();

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
    main.userAuth.userName = data.user.name;
    main.userAuth.userEmail = data.user.email;

    getAllContacts();

    hintIcon.classList.add("hide");
    main.modalBackdrop.classList.remove("open-modal");
    main.modalAuth.classList.remove("open-modal");
    main.menuButtons.forEach((button) => button.classList.remove("hide"));
    main.inputContainer.classList.remove("disable");
    main.navNewContactBtn.classList.remove("hide");
    main.navAllContactsBtn.classList.remove("hide");
    main.menuUpdateDataBtn.classList.remove("hide");
    main.menuAuthBtn.textContent = "Log out";
  } catch (error) {
    console.log(error);
  }
}
//! checkCurrentUser

//! registerUser
export async function registerUser(userData, methods) {
  const { handleIsLoading, clearInputs } = methods;
  const errorMsg = document.querySelector(".modal__auth__credentials .infoMsg");

  const url = "/api/v1/auth/register";
  requestOptions.method = "POST";
  requestOptions.headers = { "Content-type": "application/json" };
  requestOptions.body = JSON.stringify(userData);

  handleIsLoading(true);
  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      handleIsLoading(false);
      errorMsg.textContent = data.msg;
      errorMsg.classList.add("show", "error");

      setTimeout(() => {
        errorMsg.classList.remove("show", "error");
      }, 1500);
      return;
    }

    setTimeout(() => {
      errorMsg.textContent = "Account created! Log in!";
      errorMsg.classList.add("show", "success");

      clearInputs();
      handleIsLoading(false);
    }, 1000);

    setTimeout(() => {
      errorMsg.classList.remove("show", "success");
    }, 2500);
  } catch (error) {
    console.log(error);
  }
}
//! registerUser

//! loginUser
export async function loginUser(userData, methods) {
  const { handleIsLoading, clearInputs } = methods;

  const errorMsg = document.querySelector(".modal__auth__credentials .infoMsg");

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
        errorMsg.textContent = data.msg;
        errorMsg.classList.add("show", "error");

        setTimeout(() => {
          errorMsg.classList.remove("show", "error");
        }, 1500);

        return;
      }

      clearInputs();
      handleIsLoading(false);
      main.userAuth.isUserLoggedIn = true;
      main.userAuth.userName = data.user.name;
      main.userAuth.userEmail = data.user.email;
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
export async function addContactToDB(contact, methods) {
  const errorMsg = document.querySelector(".new-con-secondary-info .infoMsg");
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
      errorMsg.classList.add("show");
      errorMsg.textContent = data.msg;

      setTimeout(() => {
        errorMsg.classList.remove("show");
      }, 1500);
      return;
    }

    main.contactImage.cloudinaryImageId = "";
    main.contactImage.contactImageName = "";
    main.contactImage.contactImageUrl = "";
    handleIsLoading(false);

    closeModal();

    console.log(data);
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
    console.log(main.contactImage.cloudinaryImageId);
    handleIsLoading(false);

    console.log(data);
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
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    main.contactImage.cloudinaryImageId = "";
    main.contactImage.contactImageUrl = "";
    main.contactImage.contactImageName = "";
    handleIsLoading(false);

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
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    getAllContacts();
    handleIsLoading(false);

    closeModal();

    console.log(data);
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
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    handleIsLoading(false);

    closeModal();

    console.log(data);
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
export async function updateUserEmail(data, methods) {
  const { newUserEmail, userPassword } = data;
  const { handleIsLoading } = methods;
  const reqData = { email: newUserEmail, password: userPassword };

  const inputsContainer = document.querySelector(".modal__update__credentials");
  const errorMsg = inputsContainer.querySelector(".infoMsg");

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

    if (!response.ok) {
      setTimeout(() => {
        handleIsLoading(false);

        if (data.msg.startsWith("Duplicate")) {
          errorMsg.textContent = "This email already exists";
          newUserEmailInput.value = "";
          userPasswordInput.value = "";
        } else {
          errorMsg.textContent = "Invalid credentials";
        }
        errorMsg.classList.add("show", "error");
      }, 1000);

      setTimeout(() => {
        errorMsg.classList.remove("show", "error");
      }, 2500);

      return;
    }

    setTimeout(() => {
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
export async function updateUserPassword(data, methods) {
  const { oldPassword, newPassword } = data;
  const { handleIsLoading } = methods;

  const inputsContainer = document.querySelector(".modal__update__credentials");
  const errorMsg = inputsContainer.querySelector(".infoMsg");
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
    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      setTimeout(() => {
        handleIsLoading(false);
        errorMsg.textContent = "Invalid credentials";
        errorMsg.classList.add("show", "error");
      }, 1000);

      setTimeout(() => {
        errorMsg.classList.remove("show", "error");
      }, 2500);

      return;
    }

    setTimeout(() => {
      handleIsLoading(false);
      errorMsg.textContent = "Password updated";
      errorMsg.classList.add("show", "success");
      oldPasswordInput.value = "";
      newPasswordInput.value = "";
    }, 1000);

    setTimeout(() => {
      errorMsg.classList.remove("show", "success");
    }, 2500);
  } catch (error) {
    console.log(error);
  }
}
//! updatePassword
/* UPDATE USER DATA */
