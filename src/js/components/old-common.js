import { Modal } from './common/modal';

export class OldCommon {
  constructor() {
    const btnsPartner = document.querySelectorAll('.open-modal-partner');
    const btnsParticipation = document.querySelectorAll('.open-modal-participation');

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
  }
}
