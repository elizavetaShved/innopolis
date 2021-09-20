import { SelectInit } from './common/selectInit';
import phoneMask from '../functions/phoneMask';
import { Datepicker } from './common/datepicker';

export class AccountPage {
  constructor() {
    this.hostElem = document.querySelector('#account-host');
    phoneMask();
    new SelectInit(this.hostElem);
    new Datepicker(this.hostElem);
  }
}
