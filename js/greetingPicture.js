import { peopleData, contacts } from "./main.js";

export const greetingPicture = () => {
  if (peopleData.length === 0)
    contacts.innerHTML = `<div class="add-contact-info">
                            <div class="info-img no-select"><i class="fas fa-user-plus"></i></div>
                            <div class="info-text no-select">add your first contact</div>
                        </div>`;
};
