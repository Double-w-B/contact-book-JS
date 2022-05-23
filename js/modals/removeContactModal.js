import {
  peopleData,
  modalOverlay,
  modalContainerRemoveSelected,
  contactsAmount,
  letters,
} from "../main.js";
import { checkConLength } from "../checkContainerLength.js";
import { asideLetters } from "../asideLetters.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export const removeContactModal = () => {
  const deleteBtns = $$(".deleteCon");

  /* Remove single item */
  deleteBtns.forEach((deleteIcon) => {
    const parentEl = deleteIcon.parentElement.parentElement;

    deleteIcon.addEventListener("click", (e) => {
      modalOverlay.classList.add("open-modal");
      modalContainerRemoveSelected.classList.add("open-modal");

      let contactId = e.target.parentElement.parentElement.id;

      const selectedContact = peopleData
        .map((person) => {
          if (person.phone === contactId)
            return `${person.name} ${person.surname}`;
        })
        .join("");

      modalContainerRemoveSelected.innerHTML = `
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
        modalContainerRemoveSelected.classList.remove("open-modal");

        contactsAmount.innerHTML = `<p>Contacts: ${peopleData.length}</p>`;

        letters.innerHTML = asideLetters();
      });

      confirmCanBtn.addEventListener("click", () => {
        modalOverlay.classList.remove("open-modal");
        modalContainerRemoveSelected.classList.remove("open-modal");
      });
    });
  });
};
