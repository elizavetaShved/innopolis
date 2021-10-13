import validation from '../../functions/validation';
import { checkExistParent } from '../../functions/checkExistParent';

export class Form {
  hostElem;
  errorBlock;
  radioContainer;
  inputPasswordWrapperElems;
  form;
  mainContentElem;
  successTextElem;
  errorContent;

  constructor(hostElem) {
    this.hostElem = hostElem;
    validation();
    this.errorBlock = this.hostElem.querySelector('.js-error-block');
    this.form = this.hostElem.querySelector('form');
    this.mainContentElem = this.hostElem.querySelector('.modal__content');
    this.successTextElem = this.hostElem.querySelector('.modal__success-text-wrapper');
    const btnSubmit = this.form.querySelector('.js-btn-submit');
    this.errorContent = this.form.querySelector('.gl__error-content');

    this.radioContainer = this.hostElem.querySelector('.gl__radio-input-container');
    if (this.radioContainer) {
      this.listeningRadio();
    }

    this.inputPasswordWrapperElems = this.hostElem.querySelectorAll('.gl__input-wrapper.mod-password');
    if (this.inputPasswordWrapperElems) {
      this.inputPasswordWrapperElems.forEach(inputPasswordWrapper => {
        this.listeningPassword(inputPasswordWrapper);
      })
    }

    if (btnSubmit) {
      btnSubmit.onclick = () => {
        this.onSubmit();
      }
    }

    document.addEventListener('keydown', event => {
      if (event.code === 'NumpadEnter' || event.code === 'Enter') {
        this.onSubmit();
      }
    })

    this.form.onsubmit = (e) => {
      e.preventDefault();
      this.onSubmit();
    }
  }

  listeningRadio() {
    const inputRadio = this.radioContainer.querySelector('.gl__radio-input');
    const captionLinkRadio = this.radioContainer.querySelectorAll('.gl__radio-input-caption-link');

    let checkedRadio = false;

    this.radioContainer.onclick = (e) => {
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

  listeningPassword(inputPasswordWrapper) {
    const inputPasswordElem = inputPasswordWrapper.querySelector('.gl__input');
    const bntShowPasswordElem = inputPasswordWrapper.querySelector('.gl__input-password-btn');

    bntShowPasswordElem.onclick = () => {
      inputPasswordElem.removeAttribute('type');

      if (bntShowPasswordElem.className.includes('mod-show-password')) {
        bntShowPasswordElem.classList.remove('mod-show-password');
        inputPasswordElem.setAttribute('type', 'password');
      } else {
        bntShowPasswordElem.classList.add('mod-show-password');
        inputPasswordElem.setAttribute('type', 'text');
      }
    }
  }

  addError() {
    setTimeout(() => {
      const errorWrapperElems = this.form.querySelectorAll('.parsley-errors-list');
      const messagesArr = [];

      if (errorWrapperElems.length) {
        errorWrapperElems.forEach(errorWrapperElem => {
          if (errorWrapperElem.childNodes.length) {
            errorWrapperElem.childNodes.forEach(child => {
              messagesArr.push(child.innerText)
            })
          }
        })
        if (this.errorContent) {
          this.errorContent.innerText = messagesArr[0];
        }
      }
    });
    if (this.errorBlock) {
      this.errorBlock.classList.add('mod-show');
    }
  }

  onSubmit() {
    if ($(this.form).parsley().isValid()) {
      this.mainContentElem.classList.add('mod-hide');
      this.successTextElem.classList.add('mod-show');
      const enteredEmailElem = this.hostElem.querySelector('.modal__entered-email');
      if (enteredEmailElem) {
        const contactInputElem = this.hostElem.querySelector('.gl__input-wrapper.mod-contact').querySelector('.gl__input');
        enteredEmailElem.innerText = contactInputElem.value;
      }
    } else {
      this.addError();
    }
  }
}
