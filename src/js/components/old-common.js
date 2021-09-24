import { Modal } from './common/modal';

export class OldCommon {
  constructor() {
    const btnsPartner = document.querySelectorAll('.open-modal-partner');
    const btnsParticipation = document.querySelectorAll('.open-modal-participation');
    const btnsRegistration = document.querySelectorAll('.open-modal-registration');
    const btnAuthElems = document.querySelectorAll('.js-open-auth-modal');

    btnsPartner.forEach(btn => {
      btn.onclick = () => {
        const modal = new Modal('partner');
        modal.isOpen();
      }
    })

    btnsParticipation.forEach(btn => {
      btn.onclick = () => {
        const modal = new Modal('participation');
        modal.isOpen();
      }
    })

    btnsRegistration.forEach(btn => {
      btn.onclick = () => {
        const modal = new Modal('registr');
        modal.isOpen();
      }
    })

    btnAuthElems.forEach(btn => {
      btn.onclick = () => {
        const modal = new Modal(btn.value);
        modal.isOpen();
      }
    })
  }
}
