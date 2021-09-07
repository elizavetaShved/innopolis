import validation from '../../validation';
import { checkExistParent } from '../../checkExistParent';

export class Form {

  constructor(hostElem) {
    validation();
    const form = hostElem.querySelector('form');
    const errorBlock = hostElem.querySelector('.gl__error-block');
    const radioContainer = hostElem.querySelector('.gl__radio-input-container');
    const inputRadio = radioContainer.querySelector('.gl__radio-input');
    const captionLinkRadio = radioContainer.querySelectorAll('.gl__radio-input-caption-link');
    const btnSubmit = form.querySelector('.gl__btn-submit');

    let checkedRadio = false;

    btnSubmit.onclick = () => {
      if (!$(form).parsley().isValid()) {
        errorBlock.classList.add('mod-show');
      }
    }

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
    }
  }
}
