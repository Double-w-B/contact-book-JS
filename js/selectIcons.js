const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export const selectIcons = () => {
  const contactImg = $$(".contact-img");
  const selectBtn = $(".menu__btn--select");
  const unselectBtn = $(".menu__btn--unselect");

  /* Add check icon */
  contactImg.forEach((img) =>
    img.addEventListener("click", () =>
      img.firstElementChild.classList.toggle("show-checked")
    )
  );

  /* Select all contacts btn  */
  selectBtn.addEventListener("click", () => {
    contactImg.forEach((img) =>
      img.firstElementChild.classList.add("show-checked")
    );
  });

  /* Unselect all contacts btn  */
  unselectBtn.addEventListener("click", () => {
    contactImg.forEach((img) =>
      img.firstElementChild.classList.remove("show-checked")
    );
  });
};
