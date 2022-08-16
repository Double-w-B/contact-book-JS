import * as mainModule from "./main.js";
import { alphabet } from "./data/data.js";
import { sideLetters, uniqueFilteredLetters } from "./sideLetters.js";
import { infoContactModal } from "./modals/infoContactModal.js";
import { editContactModal } from "./modals/editContactModal.js";
import { removeContactModal } from "./modals/removeContactModal.js";
import { selectIcons } from "./selectIcons.js";
import { greetingPicture } from "./greetingPicture.js";

const $ = document.querySelector.bind(document);

export const showAllContacts = () => {
  $(".list").scrollTo(0, 0);

  mainModule.searchInput.value = "";
  mainModule.peopleData.sort((a, b) => {
    return a.name > b.name ? 1 : -1;
  });

  const contactsList = uniqueFilteredLetters()
    .map((letter) => {
      if (alphabet.includes(letter)) {
        return `<li id="${letter}" class="letter-container">
                    <div class="first-letter no-select"><p>${letter}</p></div>
                    <ul class="contact-list">

                    ${mainModule.peopleData
                      .map((person) => {
                        const {
                          name,
                          phone,
                          surname,
                          mail,
                          img: { src },
                        } = person;

                        if (letter === name.slice(0, 1)) {
                          return `<li id="${phone}">
                    <div class='contact-img no-select'>
                    <i class='fas fa-check'></i>
                    <i class='fas fa-check hover hide'></i>
                   ${
                     src
                       ? "<img src=" + src + " alt=''/>"
                       : "<p>" + name.slice(0, 1) + surname.slice(0, 1) + "</p>"
                   }
                    </div>

                    <div class='contact'>
                    <p>${name} ${surname}</p>
                    <p><i class="fas fa-phone-alt"></i>
                    ${phone.replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, " ")}</p>
                    </div>

                    <div class="submenu-icon">
                    <img src="../icons/arrowDown.svg" alt="icon" />
                    </div>
                    <div class="submenu">
                    <button class="editCon">Edit</button>
                    <a href = "mailto:${mail}">
                    <button class="sendEm">Send email</button></a>
                    <button class="deleteCon">Delete</button>
                    </div>
                    </li>
                    `;
                        }
                      })
                      .join("")}

                    </ul></li>
                    `;
      }
    })
    .join("");

  mainModule.contacts.innerHTML = contactsList;

  mainModule.sideLettersContainer.innerHTML = sideLetters();
  greetingPicture();
  selectIcons();
  infoContactModal();
  editContactModal();
  removeContactModal();
  mainModule.contactsAmount.innerHTML = `<p>Contacts: ${mainModule.peopleData.length}</p>`;
  localStorage.setItem("contacts", JSON.stringify(mainModule.peopleData));
};
