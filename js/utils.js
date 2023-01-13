import { showAllContacts } from "./showAllContacts.js";
import { peopleData } from "./main.js";

/* Remove children elements */
export const removeChildrenElements = (parentElm) => {
  while (parentElm.firstChild) {
    parentElm.removeChild(parentElm.firstChild);
  }
};

/* Check letter section */
export const checkLetterSection = () => {
  const letterSection = document.querySelectorAll(".letter-section");
  letterSection.forEach((element) => {
    const letterSectionLength = element.children[1].children.length;
    if (letterSectionLength === 0) element.remove();
    showAllContacts();
  });
};

/* Detect user device */
export const deviceType = () => {
  const userAgent = navigator.userAgent;
  const mobileRegExp =
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/;
  const tabletRegExp = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i;

  if (tabletRegExp.test(userAgent)) {
    return "tablet";
  } else if (mobileRegExp.test(userAgent)) {
    return "mobile";
  }
  return "desktop";
};

/* Filter contacts names first letter */
export const filteredFirstLetters = () => {
  const namesFirstLetter = peopleData.map((i) => i.name.slice(0, 1));
  const filteredLetters = [...new Set(namesFirstLetter)];
  return filteredLetters;
};
