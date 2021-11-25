import { Form } from './form';
import { checkExistParent } from '../../functions/checkExistParent';

export class Modal {
  hostElem;
  modalContainer;
  isOpenModal = false;
  bodyElem;
  reloadWhenClose;

  constructor(type, isNoForm, reloadWhenClose) {
    this.checkDocumentClick = this.checkDocumentClick.bind(this);
    this.hostElem = document.querySelector(`#modal-${ type }-host`);
    this.bodyElem = document.querySelector('body');
    this.modalContainer = this.hostElem.querySelector('.modal__container');
    const closeBtns = this.hostElem.querySelectorAll('.modal__close-btn');
    this.reloadWhenClose = reloadWhenClose;

    const proposalLinkElems = this.hostElem.querySelectorAll('.modal__proposal-link');
    const recoverPasswordBtn = this.hostElem.querySelector('.gl__input-hint-link');

    if (!isNoForm) {
      new Form(this.hostElem);
    }

    closeBtns.forEach(btn => {
      btn.onclick = () => {
        this.isClose();
      }
    })

    document.addEventListener('click', this.checkDocumentClick);

    if (proposalLinkElems) {
      proposalLinkElems.forEach(proposalLink => {
        proposalLink.onclick = () => {
          this.isClose();
          let modal;
          if (type === 'auth') {
            modal = new Modal('registr');
          } else if (type === 'registr') {
            modal = new Modal('auth');
          }
          modal.isOpen();
        }
      })
    }

    if (recoverPasswordBtn) {
      recoverPasswordBtn.onclick = () => {
        this.isClose();
        const modal = new Modal('password');
        modal.isOpen();
      }
    }
  }

  checkDocumentClick(e) {
    if (this.isOpenModal && !checkExistParent(e.target, this.modalContainer)) {
      this.isClose();
    } else {
      this.isOpenModal = true;
    }
  }

  isOpen() {
    this.hostElem.classList.add('mod-show');
    this.bodyElem.classList.add('mod-no-scroll');
  }

  isClose() {
    this.hostElem.classList.remove('mod-show');
    this.isOpenModal = false;
    this.bodyElem.classList.remove('mod-no-scroll');

    document.removeEventListener('click', this.checkDocumentClick);

    if (this.reloadWhenClose) {
      window.location.reload();
    }
  }
}
