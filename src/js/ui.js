import * as main from "./main.js";
import * as utils from "./utils.js";
import * as constructor from "./constructor.js";
import { showAllContacts } from "./showAllContacts.js";
// import { showAllContacts } from "./showAllContacts.js";

/* Dark/Light mode */
export const themeMode = () => {
  if (document.body.classList.contains("dark-mode")) {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    localStorage.theme = document.body.className;

    setTimeout(() => {
      main.menuChangeModeBtn.textContent = "Dark mode";
    }, 300);
  } else {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
    localStorage.theme = document.body.className;

    setTimeout(() => {
      main.menuChangeModeBtn.textContent = "Light mode";
    }, 300);
  }
};

/* Scroll To */
export const scrollTo = (e) => {
  e.preventDefault();

  if (e.target.hasAttribute("href")) {
    const id = e.target.getAttribute("href").slice(1);

    if (document.getElementById(id) === null) return;

    const element = document.getElementById(id);
    let position = element.offsetTop - 15;

    main.list.scrollTo({
      left: 0,
      top: position,
    });
  }
};

/* Hide scrollbar */
export const hideScrollbarThumb = () => {
  main.list.classList.add("move");
  setTimeout(() => {
    main.list.classList.remove("move");
  }, 700);
};

/* Hide menu */
export const hideMenu = (e) => {
  const hintIcon = document.querySelector(".hintIcon");
  if (
    main.menu.classList.contains("show-menu") &&
    e.target !== main.menuSelectAllBtn &&
    e.target !== main.menuUnselectAllBtn &&
    e.target !== main.menuRemoveSelectedBtn &&
    e.target !== main.navMenuBtn
  ) {
    main.menu.classList.remove("show-menu");
    hintIcon.classList.remove("opacity");
  }
};

/* Select icons */
export const selectIcons = () => {
  const contactImg = document.querySelectorAll(".contact-img");

  /* Add check icon */
  contactImg.forEach((img) =>
    img.addEventListener("click", () => {
      img.firstElementChild.classList.toggle("show-checked");
      if (img.firstElementChild.classList.contains("show-checked")) {
        img.children[1].classList.add("hide");
      } else {
        utils.deviceType() === "desktop" &&
          img.children[1].classList.remove("hide");
      }
    })
  );

  /* Show icon on hover if user not using mobile device  */
  if (utils.deviceType() === "desktop") {
    main.listOfContacts.addEventListener("mouseover", (e) => {
      if (
        e.target.classList.contains("hover") &&
        !e.target.previousElementSibling.classList.contains("show-checked")
      )
        e.target.classList.remove("hide");
    });

    /* Hide icon on mouseleave */
    contactImg.forEach((img) => {
      img.addEventListener("mouseleave", () => {
        img.children[1].classList.add("hide");
      });
    });
  }
};

/* Select all and Unselect All buttons */
export const handleSelection = (type) => {
  const contactImg = document.querySelectorAll(".contact-img");
  if (type === "selectAll") {
    contactImg.forEach((img) =>
      img.firstElementChild.classList.add("show-checked")
    );
  } else {
    contactImg.forEach((img) =>
      img.firstElementChild.classList.remove("show-checked")
    );
  }
};

/* Remove selected button */
export const handleRemoveSelected = () => {
  const contactImg = document.querySelectorAll(".contact-img");
  let itemsToRemove = [];

  contactImg.forEach((li) => {
    const parentElId = li.parentElement.id;
    li.firstElementChild.classList.contains("show-checked") &&
      itemsToRemove.push(parentElId);
  });

  if (itemsToRemove.length === 0) return;

  function openModal() {
    main.menu.classList.remove("show-menu");
    main.modalBackdrop.classList.add("open-modal");
    main.modalContactRemove.classList.add("open-modal");
  }
  function closeModal() {
    main.modalBackdrop.classList.remove("open-modal");
    main.modalContactRemove.classList.remove("open-modal");
    itemsToRemove = [];
  }

  function deleteContacts() {
    for (const number of itemsToRemove) {
      for (const contact of main.contactsData) {
        if (contact.phone === number) {
          main.contactsData.splice(main.contactsData.indexOf(contact), 1);
        }
      }
    }

    contactImg.forEach((li) => {
      if (li.firstElementChild.classList.contains("show-checked")) {
        li.parentElement.remove();
      }
    });

    utils.checkLetterSection();
    constructor.createNavigationLetters();
    closeModal();
  }

  utils.removeChildrenElements(main.modalContactRemove);
  constructor.createRemoveModalContent(itemsToRemove);
  openModal();

  const deleteButton = document.querySelector(".confirm-delete");
  const cancelButton = document.querySelector(".confirm-cancel");

  deleteButton.addEventListener("click", deleteContacts);
  cancelButton.addEventListener("click", closeModal);
};

/* Open Auth modal */
export const openAuthModal = async () => {
  const authButton = document.querySelector(".menu__btn--auth");
  const hintIcon = document.querySelector(".hintIcon");
  hintIcon.classList.add("hide");

  if (authButton.textContent === "Log in") {
    main.modalBackdrop.classList.add("open-modal");
    main.modalAuth.classList.add("open-modal");
  } else {
    const url = "/api/v1/auth/logout";
    try {
      await fetch(url);
      main.menuButtons.forEach((button) => button.classList.add("hide"));
      main.inputContainer.classList.add("disable");
      main.navNewContactBtn.classList.add("hide");
      main.navAllContactsBtn.classList.add("hide");
      main.menuAuthBtn.textContent = "Log in";
      main.userAuth.isUserLoggedIn = false;
      
      setTimeout(() => {
        showAllContacts()
        hintIcon.classList.remove("hide");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }
};
