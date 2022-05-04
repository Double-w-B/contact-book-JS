import { showAllContacts } from "./main.js";

const $$ = document.querySelectorAll.bind(document);

export const checkConLength = () => {
  const letterContainer = $$(".letter-container");
  letterContainer.forEach((element) => {
    const letterConLength = element.children[1].children.length;
    if (letterConLength === 0) element.remove();
    showAllContacts();
  });
};
