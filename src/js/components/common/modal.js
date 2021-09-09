import { Form } from './form';
import phoneMask from '../../functions/phoneMask';
import { checkExistParent } from '../../functions/checkExistParent';

export class Modal {
  hostElem;
  isOpenModal = false;
  bodyElem;

  constructor(type) {
    this.hostElem = document.querySelector(`#modal-${ type }-host`);
    this.bodyElem = document.querySelector('body');
    const modalContainer = this.hostElem.querySelector('.modal__container');
    const closeBtns = this.hostElem.querySelectorAll('.modal__close-btn');

    phoneMask();

    new Form(this.hostElem);

    closeBtns.forEach(btn => {
      btn.onclick = () => {
        this.isClose();
      }
    })

    document.addEventListener('click', e => {
      if (this.isOpenModal && !checkExistParent(e.target, modalContainer)) {
        this.isClose();
      } else {
        this.isOpenModal = true;
      }
    })
  }

  isOpen() {
    this.hostElem.classList.add('mod-show');
    this.bodyElem.classList.add('mod-no-scroll');
  }

  isClose() {
    this.hostElem.classList.remove('mod-show');
    this.isOpenModal = false;
    this.bodyElem.classList.remove('mod-no-scroll');
  }
}
