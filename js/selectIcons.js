const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export const selectIcons = () => {
  const conImg = $$(".contact-img");
  const selectBtn = $(".menu__btn--select");
  const unselectBtn = $(".menu__btn--unselect");

  /* Add check icon */
  conImg.forEach((img) =>
    img.addEventListener("click", () =>
      img.firstElementChild.classList.toggle("show-checked")
    )
  );

  /* Select All btn  */
  selectBtn.addEventListener("click", () => {
    conImg.forEach((img) =>
      img.firstElementChild.classList.add("show-checked")
    );
  });

  /* Unselect All btn  */
  unselectBtn.addEventListener("click", () => {
    conImg.forEach((img) =>
      img.firstElementChild.classList.remove("show-checked")
    );
  });
};
