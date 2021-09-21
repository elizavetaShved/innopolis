import { SelectInit } from './common/selectInit';
import phoneMask from '../functions/phoneMask';
import { Datepicker } from './common/datepicker';
import { InputFileInit } from './common/inputFileInit';
import { Form } from './common/form';

export class AccountPage {
  constructor() {
    this.hostElem = document.querySelector('#account-host');
    phoneMask();
    new Form(this.hostElem);
    new SelectInit(this.hostElem);
    new Datepicker(this.hostElem);
    new InputFileInit(this.hostElem);
  }
}
