import { peopleData, contacts, letters, contactsAmount,searchInput } from "./main.js";
import { alphabet } from "./data/data.js";
import { asideLetters, uniqueFilteredLetters } from "./asideLetters.js";
import { infoContactModal } from "./modals/infoContactModal.js";
import { editContactModal } from "./modals/editContactModal.js";
import { removeContactModal } from "./modals/removeContactModal.js";
import { selectIcons } from "./selectIcons.js";
import { greetingPicture } from "./greetingPicture.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export const showAllContacts = () => {
  $(".list").scrollTo(0, 0);

  searchInput.value = "";

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
                    <div class="submenu-icon">
                    <img src="../icons/arrowDown.svg" alt="icon" />
                    </div>
                    <div class="submenu">
                    <button class="editCon">Edit</button>
                    <a href = "mailto:${i.mail}">
                    <button class="sendEm">Send email</button></a>
                    <button class="deleteCon">Delete</button>
                    </div>
                    </li>
                    `;
        })
        .join("");

      return `${firstLetters}${liLines}</ul></li>`;
    })
    .join("");

  contacts.innerHTML = lettersInList;

  /* children length checking*/

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
  greetingPicture();
  selectIcons();
  infoContactModal();
  editContactModal();
  removeContactModal();
  contactsAmount.innerHTML = `<p>Contacts: ${peopleData.length}</p>`;
  localStorage.setItem("contacts", JSON.stringify(peopleData));
};
