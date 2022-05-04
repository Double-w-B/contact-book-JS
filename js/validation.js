const invalidItem = (elm) => {
  if (elm.id === "email") {
    elm.classList.add("invalid-input");
  } else {
    elm.classList.add("invalid-input");
    elm.nextElementSibling.classList.add("invalid-input");
  }

  setTimeout(() => {
    elm.classList.remove("invalid-input");
    elm.nextElementSibling.classList.remove("invalid-input");
  }, 1500);
};

const unavailableNumber = (elm) => {
  elm.classList.add("invalid-input");
  elm.nextElementSibling.nextElementSibling.nextElementSibling.classList.add(
    "invalid-input"
  );

  setTimeout(() => {
    elm.classList.remove("invalid-input");
    elm.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
      "invalid-input"
    );
  }, 1500);
};

const requiredInput = (elm) => {
  elm.classList.add("invalid-input");
  elm.nextElementSibling.nextElementSibling.classList.add("invalid-input");

  setTimeout(() => {
    elm.classList.remove("invalid-input");
    elm.nextElementSibling.nextElementSibling.classList.remove("invalid-input");
  }, 1500);
};

export { invalidItem, unavailableNumber, requiredInput };
