import { searchInput } from "./main.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const hideActiveSubmenu = () => {
  $$(".submenu-icon img").forEach((btn) => {
    btn.classList.remove("active");
  });
  $$(".contact-list li").forEach((contact) => {
    contact.classList.remove("showSubmenu");
    contact.lastElementChild.classList.remove("show");
  });
  $$(".submenu-icon").forEach((icon) => {
    icon.classList.remove("show-icons");
  });
};

export const contactSubmenu = () => {
  /* Show/hide submenu icon */

  $(".list__contacts").addEventListener("mouseover", (e) => {
    searchInput.blur();
    const element = e.target.lastElementChild;

    if (element?.classList?.contains("submenu")) {
      element.previousElementSibling.classList.add("show-icons");
    } else if (e.target.classList.contains("submenu-icon")) {
      e.target.classList.add("show-icons");
    } else if (e.target.closest(".submenu-icon")) {
      e.target.parentElement.classList.add("show-icons");
    } else {
      $$(".submenu-icon").forEach((icon) => {
        if (!icon.firstElementChild.classList.contains("active"))
          icon.classList.remove("show-icons");
      });
    }
  });

  /* Show/hide submenu */

  $(".list__contacts").addEventListener("click", (e) => {
    $(".menu").classList.contains("show-menu") &&
      $(".menu").classList.remove("show-menu");

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
      $$(".submenu-icon img").forEach((btn) => {
        btn.classList.remove("active");
      });

      $$(".contact-list li").forEach((contact) => {
        contact.classList.remove("showSubmenu");
        contact.lastElementChild.classList.remove("show");
      });

      liElmImg?.classList.add("active");

      $$(".submenu-icon").forEach((icon) => {
        if (!icon.firstElementChild.classList.contains("active")) {
          icon.classList.remove("show-icons");
        }
      });

      liElm?.classList.add("showSubmenu");
      liElm?.lastElementChild.classList.add("show");
      return;
    }

    /* Hide submenu icon & submenu on a side click */
    (targetClass.contains("first-letter") ||
      targetClass.contains("list__contacts")) &&
      hideActiveSubmenu();
  });

  /* Hide submenu icon & submenu on a side click */
  $(".list").addEventListener("click", hideActiveSubmenu);
  $(".letters__container").addEventListener("click", hideActiveSubmenu);
};
