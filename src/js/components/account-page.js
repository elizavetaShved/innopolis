import { SelectInit } from './common/selectInit';
import phoneMask from '../functions/phoneMask';
import { Datepicker } from './common/datepicker';
import { InputFileInit } from './common/inputFileInit';
import { Form } from './common/form';

export class AccountPage {
  constructor() {
    this.hostElem = document.querySelector('#account-host');

    const directionSelectWrapper = this.hostElem.querySelector('.account__direction');
    const directionSelect = directionSelectWrapper.querySelector('.gl__select');

    const universitySelectWrapper = this.hostElem.querySelector('.account__university-type');
    const universitySelect = universitySelectWrapper.querySelector('.gl__select');

    phoneMask();
    new Form(this.hostElem);
    new SelectInit(this.hostElem);
    new Datepicker(this.hostElem);
    new InputFileInit(this.hostElem);



    directionSelect.onchange = () => {
      if (directionSelect.value === 'Вузы') {
        universitySelectWrapper.classList.add('mod-show');
      } else {
        universitySelectWrapper.classList.remove('mod-show');
        universitySelect.value = null;
      }
    }
  }
}
