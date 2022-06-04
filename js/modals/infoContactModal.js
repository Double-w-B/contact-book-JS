import * as mainModule from "../main.js";

const $ = document.querySelector.bind(document);

export const infoContactModal = () => {
  /* Add modal with contact info */
  $(".list__contacts").addEventListener("click", (e) => {
    if (e.target.closest(".contact p:first-child")) {
      mainModule.modalOverlay.classList.add("open-modal");
      mainModule.modalContainerInfo.classList.add("open-modal");
      const conNumber = e.target.parentElement.parentElement.id;

      mainModule.peopleData.find((i) => {
        const { name, surname, phone, mail, address, notes } = i;
        if (phone === conNumber) {
          mainModule.modalContainerInfo.innerHTML = `
                        <div class="btn-container"><i class="fas fa-times"></i></div>
                        <div class="top-info">
                        <div class="photo no-select">
                        <div class="img">
                        ${name.slice(0, 1)}${surname.slice(0, 1)}</div>
                        </div>
                         <div class="main-info">
                         <p>${name}</p>
                         <p>${surname}</p>
                         <p><i class="fas fa-phone-alt no-select"></i>
                         ${phone.replace(
                           /(?!^)(?=(?:\d{3})+(?:\.|$))/gm,
                           " "
                         )}</p>
                         </div>
                        </div>
                         <div class="bottom-info">
                <p><i class="fas fa-at no-select"></i>
                 ${mail ? mail : "<span>no email address passed</span>"}</p>
                <p><i class="fas fa-map-marker-alt no-select">&nbsp;</i>
                 ${address ? address : "<span>no address passed</span>"}</p>
                <p><i class="far fa-edit no-select"></i>
                 ${notes ? notes : "<span>no notes passed</span>"}</p>
                </div>`;
        }
      });

      mainModule.modalContainerInfo
        .querySelector(".btn-container .fas")
        .addEventListener("click", () => {
          mainModule.modalOverlay.classList.remove("open-modal");
          mainModule.modalContainerInfo.classList.remove("open-modal");
        });
    }
  });
};
