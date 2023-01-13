import * as main from "./main.js";
import { selectIcons } from "./ui.js";
import * as constructor from "./constructor.js";
import { removeChildrenElements } from "./utils.js";
import { showAllContacts } from "./showAllContacts.js";
import { infoContactModal } from "./modals/infoContactModal.js";
import { removeContactModal } from "./modals/removeContactModal.js";
import { editContactModal } from "./modals/editContactModal.js";

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
  const matchArray = findMatches(main.searchInput.value, main.peopleData);
  const contactsLengthElm = main.contactsAmount.children[0];

  const sortedMatchArray = matchArray.sort((a, b) =>
    a.name > b.name ? 1 : -1
  );

  if (!main.searchInput.value) {
    showAllContacts();
    selectIcons();
  } else {
    if (matchArray.length > 0) {
      removeChildrenElements(main.contacts);
      for (const contact of sortedMatchArray) {
        main.contacts.append(constructor.createContact(contact, "match"));
      }
      contactsLengthElm.textContent = `Contacts: ${matchArray.length}`;
    }
  }

  if (matchArray.length === 0 && main.peopleData.length > 0) {
    removeChildrenElements(main.contacts);
    constructor.createInfoIcon();
    contactsLengthElm.textContent = `Contacts: ${matchArray.length}`;
  }

  selectIcons();
  editContactModal();
  infoContactModal();
  removeContactModal();
};
