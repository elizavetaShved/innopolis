import validation from '../../functions/validation';
import { checkExistParent } from '../../functions/checkExistParent';

export class Form {
  errorBlock;

  constructor(hostElem) {
    validation();

    this.errorBlock = hostElem.querySelector('.gl__error-block');
    const radioContainer = hostElem.querySelector('.gl__radio-input-container');
    const form = hostElem.querySelector('form');
    const btnSubmit = form.querySelector('.gl__btn-submit');
    const mainContentElem = hostElem.querySelector('.modal__content');
    const successTextElem = hostElem.querySelector('.modal__success-text-wrapper');

    form.onsubmit = (e) => {
      e.preventDefault();
      if ($(form).parsley().isValid()) {
        mainContentElem.classList.add('mod-hide');
        successTextElem.classList.add('mod-show');
      } else {
        this.addError();
      }
    }

    let inputRadio;
    let captionLinkRadio;

    if (radioContainer) {
      inputRadio = radioContainer.querySelector('.gl__radio-input');
      captionLinkRadio = radioContainer.querySelectorAll('.gl__radio-input-caption-link');
    }

    if (radioContainer) {
      let checkedRadio = false;

      radioContainer.onclick = (e) => {
        let isRadioClick = false;

        captionLinkRadio.forEach(link => {
          if (checkExistParent(e.target, link)) {
            isRadioClick = true;
          }
        })

        if (!isRadioClick) {
          if (checkedRadio) {
            inputRadio.removeAttribute('checked');
          } else {
            inputRadio.setAttribute('checked', true);
          }

          checkedRadio = !checkedRadio;
        }
      };
    }
  }

  addError() {
    this.errorBlock.classList.add('mod-show');
  }
}
