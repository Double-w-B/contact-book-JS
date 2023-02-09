import * as main from "./main.js";
import { selectIcons } from "./ui.js";
import * as modal from "./modals/index.js";
import * as constructor from "./constructor.js";
import { removeChildrenElements } from "./utils.js";
import { showAllContacts } from "./showAllContacts.js";


const findMatches = (wordToMatch, contactsData) => {
  return contactsData.filter((person) => {
    const regex = new RegExp(wordToMatch, "gi");
    return (
      person.name.match(regex) ||
      person.surname.match(regex) ||
      person.phone.match(regex)
    );
  });
};

export const searchDebounce = () => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      displayMatches();
    }, 250);
  };
};

export const displayMatches = () => {
  const matchArray = findMatches(main.searchInput.value, main.data.contacts);

  const contactsLengthElm = main.contactsAmount.children[0];

  const sortedMatchArray = matchArray.sort((a, b) =>
    a.name > b.name ? 1 : -1
  );

  if (!main.searchInput.value) {
    showAllContacts();
    selectIcons();
  } else {
    if (matchArray.length > 0) {
      removeChildrenElements(main.listOfContacts);
      for (const contact of sortedMatchArray) {
        main.listOfContacts.append(constructor.createContact(contact, "match"));
      }
      contactsLengthElm.textContent = `Contacts: ${matchArray.length}`;
    }
  }

  if (matchArray.length === 0 && main.data.contacts.length > 0) {
    const textInfo = "It looks like there aren't any matches for your search";
    const iconClassName = "fas fa-search";

    removeChildrenElements(main.listOfContacts);
    constructor.createInfoIcon(textInfo, iconClassName);
    contactsLengthElm.textContent = `Contacts: ${matchArray.length}`;
  }

  selectIcons();
  modal.editContactModal();
  modal.infoContactModal();
  modal.removeSingleContactModal();
};
