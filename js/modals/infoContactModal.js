import * as mainModule from "../main.js";

const $ = document.querySelector.bind(document);

export const infoContactModal = () => {
  /* Add modal with contact info */
  $(".list__contacts").addEventListener("click", (e) => {
    if (e.target.closest(".contact p:first-child")) {
      mainModule.modalOverlay.classList.add("open-modal");
      mainModule.modalContainerInfo.classList.add("open-modal");
      const conNumber = e.target.closest("li").id;

      mainModule.peopleData.find((i) => {
        const {
          name,
          surname,
          phone,
          mail,
          address,
          notes,
          img: { src },
        } = i;
        if (phone === conNumber) {
          mainModule.modalContainerInfo.innerHTML = `
                     <div class="top_info">
                      <div class="top_info-avatar">
                      ${
                        src
                          ? "<img src=" +
                            src +
                            " alt='contact img' class='no-select' draggable='false'/>"
                          : "<p class='no-select'>" +
                            name.slice(0, 1) +
                            surname.slice(0, 1) +
                            "</p>"
                      }
                      </div>
                        </div>
                         <div class="bottom_info">
                         <div class="bottom_info-name">
                              <p>${name} ${surname}</p>
                              <div class="bottom_info-name-underline"></div>
                         
                         </div>
                         <div class="bottom_info-details"> 
                         <p>
                         <i class="fas fa-phone-alt no-select"></i>
                         ${phone.replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, " ")}
                         </p>
                          <p>
                          <i class="fas fa-at no-select"></i>
                          ${
                            mail
                              ? `${mail}<i class='fas fa-copy no-select' title='copy'></i>
                              <span class='copied'>Copied!</span>`
                              : "<span>no email address passed</span>"
                          }
                          </p>
                          <p>
                          <i class="fas fa-map-marker-alt no-select">&nbsp;</i>
                          ${
                            address
                              ? `${address}<a href="http://maps.google.com/?q=${address}" target="_blank"><i class='fas fa-location-arrow'></i></a>`
                              : "<span>no address passed</span>"
                          }
                          </p>
                          <p>
                          <i class="far fa-edit no-select"></i>
                          ${notes ? notes : "<span>no notes passed</span>"}
                          </p>
                          <button class="bottom_info-close-btn">Close</button>
                         </div>
                </div>`;
        }
      });
    }

    const closeModal = () => {
      mainModule.modalOverlay.classList.remove("open-modal");
      mainModule.modalContainerInfo.classList.remove("open-modal");
    };

    const copyEmail = (e) => {
      const copiedBtn = $(".copied");
      navigator.clipboard.writeText(
        e.target.previousSibling.textContent.trim()
      );
      copiedBtn.classList.add("show");

      setTimeout(() => {
        copiedBtn.classList.remove("show");
      }, 700);
    };

    $(".bottom_info-close-btn")?.addEventListener("click", closeModal);
    $(".fa-copy")?.addEventListener("click", (e) => copyEmail(e));
  });
};
