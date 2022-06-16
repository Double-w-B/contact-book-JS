import { peopleData } from "./main.js";
import { alphabet } from "./data/data.js";

const uniqueFilteredLetters = () => {
  const filteredLetters = peopleData.map((i) => {
    let firstLetter = i.name.slice(0, 1);
    return firstLetter;
  });

  const singleFilteredLetters = [...new Set(filteredLetters)];
  return singleFilteredLetters;
};

const sideLetters = () => {
  const letters = alphabet
    .map((a) => {
      if (uniqueFilteredLetters().includes(a))
        return `<div class="letters__letter no-select"><a href="#${a}">${a}</a></div>`;
      else
        return `<div class="no-name no-select"><a href="#${a}">${a}</a></div>`;
    })
    .join("");

  return `${letters} <div class="free-space"></div>`;
};

export { uniqueFilteredLetters, sideLetters };
