import { Form } from './common/form';

export class ChangePasswordComponent {
  hostElem;

  constructor() {
    this.hostElem = document.querySelector('#сhange-password-host');
    if (!this.hostElem) return;

    new Form(this.hostElem);
  }
}
