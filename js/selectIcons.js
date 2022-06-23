import { menuSelectAllBtn, menuUnselectAllBtn, contacts } from "./main.js";

const $$ = document.querySelectorAll.bind(document);

export const selectIcons = () => {
  const contactImg = $$(".contact-img");

  /* Add check icon */
  contactImg.forEach((img) =>
    img.addEventListener("click", () => {
      img.firstElementChild.classList.toggle("show-checked");
      if (img.firstElementChild.classList.contains("show-checked")) {
        img.children[1].classList.add("hide");
      } else {
        img.children[1].classList.remove("hide");
      }
    })
  );

  /* Show icon on hover */
  contacts.addEventListener("mouseover", (e) => {
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

  /* Select all contacts btn  */
  menuSelectAllBtn.addEventListener("click", () => {
    contactImg.forEach((img) =>
      img.firstElementChild.classList.add("show-checked")
    );
  });

  /* Unselect all contacts btn  */
  menuUnselectAllBtn.addEventListener("click", () => {
    contactImg.forEach((img) =>
      img.firstElementChild.classList.remove("show-checked")
    );
  });
};
