import { modalOverlay, modalContainerInfo, peopleData } from "../main.js";

const $$ = document.querySelectorAll.bind(document);

export const infoModal = () => {
  const infoIcon = $$(".fa-info-circle");

  /* Add modal with contact info */
  infoIcon.forEach((icon) => {
    icon.addEventListener("click", () => {
      modalOverlay.classList.add("open-modal");
      modalContainerInfo.classList.add("open-modal");
      const conNumber = icon.parentElement.parentElement.id;

      peopleData.find((i) => {
        if (i.phone === conNumber)
          modalContainerInfo.innerHTML = `
                        <div class="btn-container"><i class="fas fa-times"></i></div>
                        <div class="top-info">
                        <div class="photo no-select">
                        <div class="img">${i.name.slice(0, 1)}${i.surname.slice(
            0,
            1
          )}</div>
                        </div>
                         <div class="main-info">
                         <p>${i.name}</p>
                         <p>${i.surname}</p>
                         <p><i class="fas fa-phone-alt no-select"></i> ${i.phone.replace(
                           /(?!^)(?=(?:\d{3})+(?:\.|$))/gm,
                           " "
                         )}</p>
                         </div>
                        </div>
                         <div class="bottom-info">
                <p><i class="fas fa-at no-select">:</i> ${
                  i.mail !== "" ? i.mail : "lack of information"
                }</p>
                <p><i class="fas fa-map-marker-alt no-select"> :</i> ${
                  i.address !== "" ? i.address : "lack of information"
                }</p>
                <p><i class="far fa-edit no-select">:</i> ${
                  i.notes !== "" ? i.notes : "lack of information"
                }</p>
                </div>`;
      });

      modalContainerInfo
        .querySelector(".btn-container .fas")
        .addEventListener("click", () => {
          modalOverlay.classList.remove("open-modal");
          modalContainerInfo.classList.remove("open-modal");
        });
    });
  });
};
