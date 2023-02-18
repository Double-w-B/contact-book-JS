import * as main from "./main.js";

export const contactsSubmenu = () => {
  function hideActiveSubmenu() {
    const submenuButtons = document.querySelectorAll(".submenu-icon");
    const submenuIcons = document.querySelectorAll(".submenu-icon img");
    const allContacts = document.querySelectorAll(".contact-list li");

    submenuIcons.forEach((btn) => {
      btn.classList.remove("active");
    });
    allContacts.forEach((contact) => {
      contact.classList.remove("showSubmenu");
      contact.lastElementChild.classList.remove("show");
    });
    submenuButtons.forEach((icon) => {
      icon.classList.remove("show-icons");
    });
  }

  function handleSubmenuIcons(e) {
    const submenuButtons = document.querySelectorAll(".submenu-icon");

    main.navSearchInput.blur();
    const element = e.target.lastElementChild;

    if (element?.classList?.contains("submenu")) {
      element.previousElementSibling.classList.add("show-icons");
    } else if (e.target.classList.contains("submenu-icon")) {
      e.target.classList.add("show-icons");
    } else if (e.target.closest(".submenu-icon")) {
      e.target.parentElement.classList.add("show-icons");
    } else {
      submenuButtons.forEach((icon) => {
        if (!icon.firstElementChild.classList.contains("active"))
          icon.classList.remove("show-icons");
      });
    }
  }

  function handleSubmenu(e) {
    const submenuButtons = document.querySelectorAll(".submenu-icon");
    const submenuIcons = document.querySelectorAll(".submenu-icon img");
    const allContacts = document.querySelectorAll(".contact-list li");
    const hintIcon = document.querySelector(".hintIcon");

    if (main.menu.classList.contains("show-menu")) {
      main.menu.classList.remove("show-menu");
      hintIcon.classList.toggle("opacity");
    }

    e.stopPropagation();
    const targetClass = e.target.classList;
    const liElm = e.target.closest(".contact-list li");
    const liElmImg = e.target.closest(".contact-list li img");

    if (
      liElm?.classList?.contains("showSubmenu") &&
      e.target.tagName === "IMG" &&
      !e.target.parentElement.classList.contains("contact") &&
      !e.target.parentElement.classList.contains("contact-img")
    ) {
      liElm?.classList?.remove("showSubmenu");
      liElm?.lastElementChild.classList?.remove("show");
      liElmImg?.classList?.remove("active");
      return;
    }

    if (
      !liElm?.classList?.contains("showSubmenu") &&
      e.target.tagName === "IMG" &&
      !e.target.parentElement.classList.contains("contact") &&
      !e.target.parentElement.classList.contains("contact-img")
    ) {
      submenuIcons.forEach((btn) => {
        btn.classList.remove("active");
      });

      allContacts.forEach((contact) => {
        contact.classList.remove("showSubmenu");
        contact.lastElementChild.classList.remove("show");
      });

      liElmImg?.classList.add("active");

      submenuButtons.forEach((icon) => {
        if (!icon.firstElementChild.classList.contains("active")) {
          icon.classList.remove("show-icons");
        }
      });

      liElm?.classList.add("showSubmenu");
      liElm?.lastElementChild.classList.add("show");
      return;
    }

    /* Hide submenu icon & submenu on a side click */
    if (
      targetClass.contains("alphabet-sequence") ||
      targetClass.contains("list__contacts")
    ) {
      hideActiveSubmenu();
    }
  }

  /* Handle submenu */
  main.listOfContacts.addEventListener("click", handleSubmenu);
  /* Handle submenu icon */
  main.listOfContacts.addEventListener("mouseover", handleSubmenuIcons);
  /* Hide submenu icon & submenu on a side click */
  main.list.addEventListener("click", hideActiveSubmenu);
  main.navigationLetters.addEventListener("click", hideActiveSubmenu);
};
