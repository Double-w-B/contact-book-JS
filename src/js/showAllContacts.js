import * as main from "./main.js";
import * as utils from "./utils.js";
import { selectIcons } from "./ui.js";
import * as constructor from "./constructor.js";
import { infoContactModal } from "./modals/infoContactModal.js";
import { editContactModal } from "./modals/editContactModal.js";
import { removeContactModal } from "./modals/removeContactModal.js";

export const showAllContacts = () => {
  const contactsLengthElm = document.querySelector(".list__contacts-amount p");
  const list = document.querySelector(".list");
  list.scrollTo(0, 0);

  main.searchInput.value = "";
  main.contactsData.sort((a, b) => {
    return a.name > b.name ? 1 : -1;
  });

  utils.removeChildrenElements(main.listOfContacts);

  const availableFirstLetters = utils.filteredFirstLetters();

  for (const letter of availableFirstLetters) {
    const letterSection = constructor.createLetterSection(letter);

    for (const contact of main.contactsData) {
      if (letter === contact.name.slice(0, 1)) {
        const tempContact = constructor.createContact(contact, "shawAll");
        letterSection.children[1].append(tempContact);
      }
    }
    main.listOfContacts.append(letterSection);
  }

  main.contactsData.length === 0 && constructor.createInfoIcon();
  selectIcons();
  infoContactModal();
  editContactModal();
  removeContactModal();
  contactsLengthElm.textContent = `Contacts: ${main.contactsData.length}`;
  localStorage.setItem("contacts", JSON.stringify(main.contactsData));
};