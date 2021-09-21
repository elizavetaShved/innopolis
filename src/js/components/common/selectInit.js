import Choices from 'choices.js';

export class SelectInit {
  constructor(hostElem) {
    const selectElems = hostElem.querySelectorAll('.gl__select');

    selectElems.forEach(select => {
      new Choices(select, {
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false,
      })
    })
  }

  addErrorClass() {

  }
}
