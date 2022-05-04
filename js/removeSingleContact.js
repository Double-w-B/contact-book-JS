import { peopleData, modalOverlay, modalDeleteQuestion, conAmount, letters } from "./main.js";
import { checkConLength } from "./checkContainerLength.js";
import { asideLetters } from "./asideLetters.js";


const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export const removeSingleBtn = () => {
  const deleteBtn = $$(".fa-trash-alt");

  /* Remove single item */
  deleteBtn.forEach((deleteIcon) => {
    const parentEl = deleteIcon.parentElement.parentElement;

    deleteIcon.addEventListener("click", (e) => {
      modalOverlay.classList.add("open-modal");
      modalDeleteQuestion.classList.add("open-modal");

      let contactId = e.target.parentElement.parentElement.id;

      const selectedContact = peopleData
        .map((person) => {
          if (person.phone === contactId)
            return `${person.name} ${person.surname}`;
        })
        .join("");

      modalDeleteQuestion.innerHTML = `
                        <div class="confirm-container  no-select">
                        <div class="confirm-question">
                            <p>Are you sure you want to delete the <span class="selected-contact">${selectedContact}</span> contact?</p>
                        </div>
                        <div class="confirm-btns">
                            <button class="confirm-delete">Delete</button>
                            <button class="confirm-cancel">Cancel</button>
                        </div>
                    </div>`;

      const confirmDelBtn = $(".confirm-delete");
      const confirmCanBtn = $(".confirm-cancel");

      confirmDelBtn.addEventListener("click", () => {
        let removeIndex = peopleData.map((con) => con.phone).indexOf(contactId);
        peopleData.splice(removeIndex, 1);
        parentEl.remove();
        checkConLength();
        localStorage.setItem("contacts", JSON.stringify(peopleData));

        modalOverlay.classList.remove("open-modal");
        modalDeleteQuestion.classList.remove("open-modal");

        conAmount.innerHTML = `<p>Contacts: ${peopleData.length}</p>`;

        letters.innerHTML = asideLetters();
      });

      confirmCanBtn.addEventListener("click", () => {
        modalOverlay.classList.remove("open-modal");
        modalDeleteQuestion.classList.remove("open-modal");
      });
    });
  });
};
