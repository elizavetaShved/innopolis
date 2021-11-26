export default function openProgramModalFilter() {
  const hostElem = document.querySelector('#program-page-host');
  const btnOpenFilter = hostElem.querySelector('.js-filter-btn');
  const btnCloseFilter = hostElem.querySelector('.js-modal-filter-close');

  const modalFilter = document.querySelector('.js-modal-filter');
  const rowsContentElems = document.querySelectorAll('.js-row-content');

  const hideModal = () => {
    modalFilter.classList.remove('mod-show');
  }

  const openModal = () => {
    modalFilter.classList.add('mod-show');
  }

  openModal();

  btnOpenFilter.onclick = () => {
    openModal();
  }

  btnCloseFilter.onclick = () => {
    hideModal();
  }

  const onOpen = (btnElem, menuContainerElem, menuElem) => {
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

  rowsContentElems.forEach(rowContent => {
    const contentElem = rowContent.querySelector('.js-content');
    const speakersElem = rowContent.querySelector('.js-speakers');
    const menuContainerElem = rowContent.querySelector('.js-drop-menu-container');

    if (menuContainerElem) {
      menuContainerElem.classList.add('default-reset-style');

      if (speakersElem && (contentElem.offsetHeight < speakersElem.offsetHeight)) {
        const btnElem = rowContent.querySelector('.js-drop-menu-btn');
        const menuElem = rowContent.querySelector('.js-drop-menu');

        onOpen(btnElem, menuContainerElem, menuElem);
      }

      setTimeout(() => {
        menuContainerElem.classList.remove('default-reset-style');
      }, 400)
    }
  })
}
