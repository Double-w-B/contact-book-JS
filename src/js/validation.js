import * as main from "./main.js";
import * as utils from "./utils.js";

/* Invalid data validation */
const invalidItem = (elm) => {
  const siblingElement = [...elm.parentElement.children].find(
    (el) => el.className === "error-hint"
  );

  elm.classList.add("invalid-input");
  siblingElement.classList.add("invalid-input");

  setTimeout(() => {
    elm.classList.remove("invalid-input");
    siblingElement.classList.remove("invalid-input");
  }, 1500);
};

/* Short length of numbers */
const shortLength = (elm) => {
  const siblingElement = [...elm.parentElement.children].find(
    (el) => el.className === "error-hint-length"
  );

  elm.classList.add("invalid-input");
  siblingElement.classList.add("invalid-input");

  setTimeout(() => {
    elm.classList.remove("invalid-input");
    siblingElement.classList.remove("invalid-input");
  }, 1500);
};

/* Required data validation */
export const requiredInput = (elm) => {
  const siblingElement = [...elm.parentElement.children].find(
    (el) => el.className === "error-hint-required"
  );

  elm.classList.add("invalid-input");
  siblingElement.classList.add("invalid-input");

  setTimeout(() => {
    elm.classList.remove("invalid-input");
    siblingElement.classList.remove("invalid-input");
  }, 1500);
};

/* Same number validation */
const unavailableNumber = (elm) => {
  const siblingElement = [...elm.parentElement.children].find(
    (el) => el.className === "error-hint-number"
  );
  elm.classList.add("invalid-input");
  siblingElement.classList.add("invalid-input");

  setTimeout(() => {
    elm.classList.remove("invalid-input");
    siblingElement.classList.remove("invalid-input");
  }, 1500);
};

function validation(inputs, contactPhone) {
  const { inputName, inputSurname, inputPhone, inputEmail } = inputs;
  const contactsNumbers = main.data.contacts.map((person) => person.phone);

  /* Required data */
  if (!inputName.value) requiredInput(inputName);
  if (!inputSurname.value) requiredInput(inputSurname);
  if (!inputPhone.value) requiredInput(inputPhone);

  /* Invalid data validation */
  if (inputName.value.match(utils.textRegExp)) invalidItem(inputName);
  if (inputSurname.value.match(utils.textRegExp)) invalidItem(inputSurname);
  if (inputPhone.value && !inputPhone.value.match(utils.onlyNumbersRegExp))
    invalidItem(inputPhone);
  if (inputEmail.value && !inputEmail.value.match(utils.emailRegExp)) {
    invalidItem(inputEmail);
  }

  /* Short length of number */
  if (
    inputPhone.value &&
    inputPhone.value.match(utils.onlyNumbersRegExp) &&
    inputPhone.value.length < 6
  ) {
    shortLength(inputPhone);
  }

  /* Number already exists validation */
  if (!contactPhone && contactsNumbers.includes(inputPhone.value)) {
    unavailableNumber(inputPhone);
  }

  if (
    contactPhone &&
    contactsNumbers.includes(inputPhone.value) &&
    inputPhone.value !== contactPhone
  ) {
    unavailableNumber(inputPhone);
  }
}

export { validation };
