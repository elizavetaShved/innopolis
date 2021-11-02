import { Form } from './common/form';

export class AuthComponent {
  hostElem;

  constructor() {
    this.hostElem = document.querySelector('#auth-host');
    if (!this.hostElem) return;

    const containerElems = Array.from(this.hostElem.querySelectorAll('.js-auth-content'));
    const openRegistrBtn = this.hostElem.querySelectorAll('.js-toggle-registr');
    const openAuthBtn = this.hostElem.querySelectorAll('.js-toggle-auth');
    const forgoPasswordBtn = this.hostElem.querySelectorAll('.js-forgo-password');

    new Form(this.hostElem);

    openRegistrBtn.forEach(btn => {
      btn.onclick = () => {
        containerElems.map(elem => elem.classList.remove('mod-show'));
        containerElems[1].classList.add('mod-show');
      }
    })

    openAuthBtn.forEach(btn => {
      btn.onclick = () => {
        containerElems.map(elem => elem.classList.remove('mod-show'));
        containerElems[0].classList.add('mod-show');
      }
    })

    forgoPasswordBtn.forEach(btn => {
      btn.onclick = () => {
        containerElems.map(elem => elem.classList.remove('mod-show'));
        containerElems[2].classList.add('mod-show');
      }
    })
  }
}
