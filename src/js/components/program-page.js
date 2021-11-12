export class ProgramPage {
  hostElem;
  selectElems;

  constructor() {
    this.hostElem = document.querySelector('#program-page-host');
    if (!this.hostElem) return;

    const btnOpenFilter = this.hostElem.querySelector('.filters__filter-btn');
    const btnCloseFilter = this.hostElem.querySelector('.js-modal-filter-close');
    const modalFilter = document.querySelector('.js-modal-filter');

    const rowsContentElems = document.querySelectorAll('.js-row-content');

    btnOpenFilter.onclick = () => {
      modalFilter.classList.add('mod-show')
    }

    btnCloseFilter.onclick = () => {
      modalFilter.classList.remove('mod-show')
    }

    rowsContentElems.forEach((rowContent, i) => {
      const contentElem = rowContent.querySelector('.js-content');
      const speakersElem = rowContent.querySelector('.js-speakers');
      const menuContainerElem = rowContent.querySelector('.js-drop-menu-container');

      menuContainerElem.classList.add('default-reset-style');

      if (i === 1) {
        console.log(contentElem.offsetHeight)
        console.log(contentElem)
        console.log(speakersElem.offsetHeight)
      }
      if (speakersElem && (contentElem.offsetHeight < speakersElem.offsetHeight)) {
        const btnElem = rowContent.querySelector('.js-drop-menu-btn');
        const menuElem = rowContent.querySelector('.js-drop-menu');

        this.onOpen(btnElem, menuContainerElem, menuElem);
      }

      setTimeout(() => {
        menuContainerElem.classList.remove('default-reset-style');
      }, 400)
    })
  }

  onOpen(btnElem, menuContainerElem, menuElem) {
    btnElem.classList.add('mod-hide');

    const btnContent = btnElem.querySelectorAll('.js-drop-menu-btn-content');
    if (btnContent.length) {
      btnContent[0].classList.remove('mod-show');
      btnContent[1].classList.add('mod-show');
    }
    menuContainerElem.classList.add('mod-open');
    const heightContent = menuElem.clientHeight;
    menuContainerElem.style.maxHeight = `${ heightContent }px`;
  }
}
