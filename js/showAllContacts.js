import { peopleData, contacts, letters, conAmount } from "../main.js";
import { alphabet } from "./alphabet.js";
import { asideLetters, uniqueFilteredLetters } from "./asideLetters.js";
import { infoModal } from "./infoModal.js";
import { removeSingleBtn } from "./removeSingleContact.js";
import { showIcons } from "./showIcons.js";
import { greetingPicture } from "./greetingPicture.js";
import { editContact } from "./editContact.js";

const $$ = document.querySelectorAll.bind(document);

export const showAllContacts = () => {
  const lettersInList = alphabet
    .map((alphabetLetter) => {
      
      const firstLetters = uniqueFilteredLetters()
        .map((i) => {
          if (alphabetLetter === i)
            return `<li id="${alphabetLetter}" class="letter-container">
                    <div class="first-letter no-select"><p>${alphabetLetter}</p></div>
                    <ul class="contact-list">`;
        })
        .join("");

      const liLines = peopleData
        .map((i) => {
          if (alphabetLetter === i.name.slice(0, 1))
            return `<li id="${i.phone}">
                    <div class='contact-img no-select'>
                    <i class='fas fa-check'></i>
                    ${i.name.slice(0, 1)}${i.surname.slice(0, 1)}
                    </div>
                    <div class='contact'>
                    <p>${i.name} ${i.surname}</p>
                    <p><i class="fas fa-phone-alt"></i>
                    ${i.phone.replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, " ")}</p>
                    </div>
                    <div class="user-icons">
                    <a href = "mailto:${i.mail}"><i class="fas fa-at"></i></a>
                    <i class="fas fa-info-circle"></i>
                    <i class="fas fa-user-edit"></i>
                    <i class="far fa-trash-alt"></i></div></li>`;
        })
        .join("");
      return `${firstLetters}${liLines}</ul></li>`;
    })
    .join("");

  contacts.innerHTML = lettersInList;

  /* check length children */

  const contactList = $$(".letter-container .contact-list");

  contactList.forEach((list) => {
    list.children.length === 1
      ? Object.values(list.children).map((child) =>
          child.classList.add("one-child")
        )
      : Object.values(list.children).map((child) =>
          child.classList.remove("one-child")
        );
  });

  letters.innerHTML = asideLetters();
  infoModal();
  removeSingleBtn();
  showIcons();
  greetingPicture();
  editContact();
  conAmount.innerHTML = `<p>Contacts: ${peopleData.length}</p>`;
  localStorage.setItem("contacts", JSON.stringify(peopleData));
};
