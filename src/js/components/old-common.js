import { Modal } from './common/modal';

export class OldCommon {
  constructor() {
    const btnsPartner = document.querySelectorAll('.open-modal-partner');
    const btnsParticipation = document.querySelectorAll('.open-modal-participation');
    const btnsRegistration = document.querySelectorAll('.open-modal-registration');
    const btnAuthElems = document.querySelectorAll('.js-open-auth-modal');

    if (btnsPartner) {
      btnsPartner.forEach(btn => {
        btn.onclick = () => {
          const modal = new Modal('partner');
          modal.isOpen();
        }
      })
    }

    if (btnsParticipation) {
      btnsParticipation.forEach(btn => {
        btn.onclick = () => {
          const modal = new Modal('participation');
          modal.isOpen();
        }
      })
    }

    if (btnsRegistration) {
      btnsRegistration.forEach(btn => {
        btn.onclick = () => {
          const modal = new Modal('registr');
          modal.isOpen();
        }
      })
    }

    if (btnAuthElems) {
      btnAuthElems.forEach(btn => {
        btn.onclick = () => {
          const modal = new Modal(btn.value);
          modal.isOpen();
        }
      })
    }
  }
}
