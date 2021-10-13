export class ProgramPage {
  hostElem;
  selectElems;

  constructor() {
    this.hostElem = document.querySelector('#program-page-host');
    if (!this.hostElem) return;

    const btnOpenFilter = this.hostElem.querySelector('.filters__filter-btn');
    const btnCloseFilter = this.hostElem.querySelector('.js-modal-filter-close');
    const modalFilter = document.querySelector('.js-modal-filter');

    btnOpenFilter.onclick = () => {
      modalFilter.classList.add('mod-show')
    }

    btnCloseFilter.onclick = () => {
      modalFilter.classList.remove('mod-show')
    }
  }
}
