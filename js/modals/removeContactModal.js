import * as mainModule from "../main.js";
import { checkConLength } from "../checkContainerLength.js";
import { sideLetters } from "../sideLetters.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export const removeContactModal = () => {
  const deleteBtns = $$(".deleteCon");

  /* Remove single item */
  deleteBtns.forEach((deleteIcon) => {
    const parentEl = deleteIcon.parentElement.parentElement;

    deleteIcon.addEventListener("click", (e) => {
      mainModule.modalOverlay.classList.add("open-modal");
      mainModule.modalContainerRemoveSelected.classList.add("open-modal");

      let contactId = e.target.parentElement.parentElement.id;

      const selectedContact = mainModule.peopleData
        .map((person) => {
          if (person.phone === contactId)
            return `${person.name} ${person.surname}`;
        })
        .join("");

      mainModule.modalContainerRemoveSelected.innerHTML = `
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
        let removeIndex = mainModule.peopleData
          .map((con) => con.phone)
          .indexOf(contactId);
        mainModule.peopleData.splice(removeIndex, 1);
        parentEl.remove();
        checkConLength();
        localStorage.setItem("contacts", JSON.stringify(mainModule.peopleData));

        mainModule.modalOverlay.classList.remove("open-modal");
        mainModule.modalContainerRemoveSelected.classList.remove("open-modal");

        mainModule.contactsAmount.innerHTML = `<p>Contacts: ${mainModule.peopleData.length}</p>`;

        mainModule.sideLettersContainer.innerHTML = sideLetters();
      });

      confirmCanBtn.addEventListener("click", () => {
        mainModule.modalOverlay.classList.remove("open-modal");
        mainModule.modalContainerRemoveSelected.classList.remove("open-modal");
      });
    });
  });
};
