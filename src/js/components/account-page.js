import { Form } from './common/form';
import { AccountProfile } from './account-profile';
import { AccountCalendar } from './account-calendar';

export class AccountPage {
  hostElem;
  accountComponent;

  constructor() {
    this.hostElem = document.querySelector('#account-host');
    if (!this.hostElem) return;
    new AccountProfile();
    new AccountCalendar();

    const menuRadioValue = this.hostElem.querySelectorAll('.account__menu-radio');
    this.accountComponent = Array.from(this.hostElem.querySelectorAll('.account__component'));

    new Form(this.hostElem);

    menuRadioValue.forEach((radioElem, index) => {
      this.changeComponent(radioElem, index);

      radioElem.onchange = () => {
        this.changeComponent(radioElem, index);
      }
    })
  }

  changeComponent(radioElem, index) {
    if (radioElem.checked) {
      this.accountComponent.map(elem => elem.classList.remove('mod-show'))
      this.accountComponent[index].classList.add('mod-show');
    }
  }
}
