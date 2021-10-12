import { Form } from './common/form';

export class ContactPage {
  hostElem;
  constructor() {
    this.hostElem = document.querySelector('#contacts-host');
    if (!this.hostElem) return;
    new Form(this.hostElem);
  }
}
