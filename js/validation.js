import { peopleData } from "./main.js";

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
const requiredInput = (elm) => {
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

function validationFunction(inputName, inputSurname, inputPhone, inputEmail) {
  const textRegExp = /[ĄĆĘÓŚŻŹŁŃŚąćęóśżźłńś^0-9^а-я]/;
  const emailRegExp = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  const checkNumber = peopleData.map((person) => person.phone);

  /* Required data validation */
  !inputName.value && requiredInput(inputName);
  !inputSurname.value && requiredInput(inputSurname);
  !inputPhone.value && requiredInput(inputPhone);

  /* Short length of number validation */
  inputPhone.value &&
    inputPhone.value.match(/^[0-9]+$/) &&
    inputPhone.value.length < 6 &&
    shortLength(inputPhone);

  /* Invalid data validation */
  inputName.value.match(textRegExp) && invalidItem(inputName);
  inputSurname.value.match(textRegExp) && invalidItem(inputSurname);

  inputPhone.value &&
    !inputPhone.value.match(/^[0-9]+$/) &&
    invalidItem(inputPhone);

  inputEmail.value &&
    !inputEmail.value.match(emailRegExp) &&
    invalidItem(inputEmail);

  /* Same number validation */
  inputName.value &&
    inputSurname.value &&
    !inputName.value.match(textRegExp) &&
    !inputSurname.value.match(textRegExp) &&
    (!inputEmail.value || inputEmail.value.match(emailRegExp)) &&
    checkNumber.includes(inputPhone.value) &&
    unavailableNumber(inputPhone);
}

export { validationFunction };
