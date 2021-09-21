import { SelectInit } from './common/selectInit';
import phoneMask from '../functions/phoneMask';
import { Datepicker } from './common/datepicker';
import { InputFileInit } from './common/inputFileInit';
import { Form } from './common/form';

export class AccountPage {
  constructor() {
    this.hostElem = document.querySelector('#account-host');

    const universityInputTextWrapper = this.hostElem.querySelector('.account__university');
    const universityInputText = universityInputTextWrapper.querySelector('.gl__input');

    const universitySelectWrapper = this.hostElem.querySelector('.account__university-type');
    const universitySelect = universitySelectWrapper.querySelector('.gl__select');

    phoneMask();
    new Form(this.hostElem);
    new SelectInit(this.hostElem);
    new Datepicker(this.hostElem);
    new InputFileInit(this.hostElem);

    universityInputText.onchange = () => {
      if (universityInputText.value) {
        universitySelectWrapper.classList.add('mod-show');
      } else {
        universitySelectWrapper.classList.remove('mod-show');
        universitySelect.value = null;
      }
    }
  }
}
