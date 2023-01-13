import * as main from "./main.js";
import * as utils from "./utils.js";
import { selectIcons } from "./ui.js";
import * as constructor from "./constructor.js";
import { infoContactModal } from "./modals/infoContactModal.js";
import { editContactModal } from "./modals/editContactModal.js";
import { removeContactModal } from "./modals/removeContactModal.js";

export const showAllContacts = () => {
  const contactsLengthElm = main.contactsAmount.children[0];
  const list = document.querySelector(".list");
  list.scrollTo(0, 0);

  main.searchInput.value = "";
  main.peopleData.sort((a, b) => {
    return a.name > b.name ? 1 : -1;
  });

  utils.removeChildrenElements(main.contacts);

  const availableFirstLetters = utils.filteredFirstLetters();

  for (const letter of availableFirstLetters) {
    const letterSection = constructor.createLetterSection(letter);

    for (const contact of main.peopleData) {
      if (letter === contact.name.slice(0, 1)) {
        const tempContact = constructor.createContact(contact, "shawAll");
        letterSection.children[1].append(tempContact);
      }
    }
    main.contacts.append(letterSection);
  }

  main.peopleData.length === 0 && constructor.createInfoIcon();
  constructor.createNavigationLetters();
  selectIcons();
  infoContactModal();
  editContactModal();
  removeContactModal();
  contactsLengthElm.textContent = `Contacts: ${main.peopleData.length}`;
  localStorage.setItem("contacts", JSON.stringify(main.peopleData));
};
