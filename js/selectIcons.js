import { menuSelectAllBtn, menuUnselectAllBtn } from "./main.js";

const $$ = document.querySelectorAll.bind(document);

export const selectIcons = () => {
  const contactImg = $$(".contact-img");

  /* Add check icon */
  contactImg.forEach((img) =>
    img.addEventListener("click", () =>
      img.firstElementChild.classList.toggle("show-checked")
    )
  );

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
