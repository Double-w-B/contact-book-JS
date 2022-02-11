const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export const showIcons = () => {
  const contactListLi = $$(".contact-list li");
  const conImg = $$(".contact-img");
  const selectBtn = $(".btn-select");
  const unselectBtn = $(".btn-unselect");

  /* Add check icon */
  conImg.forEach((img) =>
    img.addEventListener("click", () =>
      img.firstElementChild.classList.toggle("show-checked")
    )
  );

  /* Show icons */
  contactListLi.forEach((li) => {
    li.addEventListener("mouseover", () =>
      li.lastElementChild.classList.add("show-icons")
    );
    li.addEventListener("mouseout", () =>
      li.lastElementChild.classList.remove("show-icons")
    );
  });

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
