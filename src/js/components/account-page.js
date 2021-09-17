import { SelectInit } from './common/selectInit';
import phoneMask from '../functions/phoneMask';

export class AccountPage {
  constructor() {
    this.hostElem = document.querySelector('#account-host');
    phoneMask();
    new SelectInit(this.hostElem);
  }
}
