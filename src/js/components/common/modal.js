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
    const form = this.hostElem.querySelector('form');
    const btnSubmit = form.querySelector('.gl__btn-submit');
    const mainContentElem = this.hostElem.querySelector('.modal__content');
    const successTextElem = this.hostElem.querySelector('.modal__success-text-wrapper');
    const closeBtns = this.hostElem.querySelectorAll('.modal__close-btn');

    phoneMask();

    new Form(this.hostElem);

    btnSubmit.onclick = () => {
      if ($(form).parsley().isValid()) {
        mainContentElem.classList.add('mod-hide');
        successTextElem.classList.add('mod-show');
      }
    }

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
