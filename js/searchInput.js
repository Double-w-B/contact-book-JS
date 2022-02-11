import { peopleData, searchInput, conAmount, contacts } from "../main.js";
import { showIcons } from "./showIcons.js";
import { infoModal } from "./infoModal.js";
import { removeSingleBtn } from "./removeSingleContact.js";
import { editContact } from "./editContact.js";
import { showAllContacts } from "./showAllContacts.js";

const findMatches = (wordToMatch, peopleData) => {
  return peopleData.filter((person) => {
    const regex = new RegExp(wordToMatch, "gi");
    return (
      person.name.match(regex) ||
      person.surname.match(regex) ||
      person.phone.match(regex)
    );
  });
};

export const displayMatches = () => {
  const matchArray = findMatches(searchInput.value, peopleData);
  const sortedMatchArray = matchArray.sort((a, b) =>
    a.name > b.name ? 1 : -1
  );
  const matchPeople = sortedMatchArray
    .map((person) => {
      const { name, surname, phone, mail } = person;

      return `
                    <li>
                    <ul class="contact-list">
                    <li id="${phone}" class="one-child" >
                    <div class='contact-img no-select'>
                    <i class='fas fa-check'></i>${name.slice(
                      0,
                      1
                    )}${surname.slice(0, 1)}
                    </div>
                    <div class='contact'>
                    <p>${name} ${surname}</p>
                    <p><i class="fas fa-phone-alt"></i>${phone.replace(
                      /(?!^)(?=(?:\d{3})+(?:\.|$))/gm,
                      " "
                    )}
                    </p>
                    </div>
                    <div class="user-icons">
                    <a href = "mailto:${mail}"><i class="fas fa-at"></i></a>
                    <i class="fas fa-info-circle"></i>
                    <i class="fas fa-user-edit"></i>
                    <i class="far fa-trash-alt"></i>
                    </div>
                    </li>
                    </ul></li>`;
    })
    .join("");

  conAmount.innerHTML = `<p>Contacts: ${matchArray.length}</p>`;

  if (!searchInput.value) {
    showAllContacts();
    showIcons();
  }else {
    matchArray.length > 0 && (contacts.innerHTML = matchPeople);
  }

  if (matchArray.length === 0 && peopleData.length > 0) {
    contacts.innerHTML = `<div class="add-contact-info">
            <div class="info-img no-select"><i class="fas fa-search"></i></div>
            <div class="info-text no-select">It looks like there aren't any matches for your search</div>
            </div>`;
    conAmount.innerHTML = `<p>Contacts: ${matchArray.length}</p>`;
  }

  showIcons();
  infoModal();
  removeSingleBtn();
  editContact();
};