import { Form } from './common/form';

export class AccountPage {
  accountComponent;
  hostElem;

  constructor() {
    this.hostElem = document.querySelector('#account-host');
    if (!this.hostElem) return;

    const directionSelectWrapper = this.hostElem.querySelector('.profile__direction');
    const directionSelect = directionSelectWrapper.querySelector('.gl__select');

    const universitySelectWrapper = this.hostElem.querySelector('.profile__university-type');
    const universitySelect = universitySelectWrapper.querySelector('.gl__select');

    const menuRadioValue = this.hostElem.querySelectorAll('.account__menu-radio');
    this.accountComponent = Array.from(this.hostElem.querySelectorAll('.account__component'));

    new Form(this.hostElem);

    directionSelect.onchange = () => {
      if (directionSelect.value === 'Вузы') {
        universitySelectWrapper.classList.add('mod-show');
      } else {
        universitySelectWrapper.classList.remove('mod-show');
        universitySelect.value = null;
      }
    }

    menuRadioValue.forEach((radioElem, index) => {
      this. changeComponent(radioElem, index);

      radioElem.onchange = () => {
       this. changeComponent(radioElem, index);
      }
    })
  }

  changeComponent(radioElem, index) {
    if (radioElem.checked) {
      this.accountComponent.map(elem => elem.classList.remove('mod-show'))
      this.accountComponent[index].classList.add('mod-show');

      // if (radioElem.value === 'media') {
      //
      // }
    }
  }
}
