import * as main from "./main.js";
import * as utils from "./utils.js";
import { selectIcons } from "./ui.js";
import * as constructor from "./constructor.js";
import * as modal from "./modals";

export const showAllContacts = () => {
  const contactsLengthElm = document.querySelector(".list__contacts-amount p");
  const list = document.querySelector(".list");
  let textInfo;
  let iconClassName;

  list.scrollTo(0, 0);

  main.navSearchInput.value = "";
  main.data.contacts.sort((a, b) => {
    return a.name > b.name ? 1 : -1;
  });

  utils.removeChildrenElements(main.listOfContacts);

  const availableFirstLetters = utils.filteredFirstLetters();

  for (const letter of availableFirstLetters) {
    const letterSection = constructor.createLetterSection(letter);

    for (const contact of main.data.contacts) {
      if (letter === contact.name.slice(0, 1)) {
        const tempContact = constructor.createContact(contact, "shawAll");
        letterSection.children[1].append(tempContact);
      }
    }
    main.listOfContacts.append(letterSection);
  }

  if (main.data.contacts.length === 0 && main.userAuth.isUserLoggedIn) {
    textInfo = "add your first contact";
    iconClassName = "fas fa-user-plus";
    constructor.createInfoIcon(textInfo, iconClassName);
  }
  if (!main.userAuth.isUserLoggedIn) {
    textInfo = "Log in or Register to manage your contacts";
    iconClassName = "fas fa-arrow-right-to-bracket";
    constructor.createInfoIcon(textInfo, iconClassName);
  }
  if (main.userAuth.isUserLoggedIn) {
    contactsLengthElm.textContent = `Contacts: ${main.data.contacts.length}`;
  } else {
    contactsLengthElm.textContent = "";
  }

  selectIcons();
  modal.authModal();
  modal.infoContactModal();
  modal.editContactModal();
  modal.removeSingleContactModal();
  modal.updateUserDataModal();
};
