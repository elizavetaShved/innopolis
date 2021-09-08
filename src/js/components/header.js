export class Header {

  constructor() {
    const hostElem = document.querySelector('#header-host');
    // const btnBurger = hostElem.querySelector('.app-header__burger');
    const mobileBox = document.querySelector('.mobile-box');
    const body = document.querySelector('body');
    const selectWrapperElem = hostElem.querySelector('.header__lang-select-wrapper');
    const selectedItemElem = hostElem.querySelector('.header__lang-selected-item');

    let isOpen = false;

    // btnBurger.onclick = () => {
    //   if (!isOpen) {
    //     mobileBox.classList.add('opened');
    //     body.classList.add('mod-no-scroll');
    //     setTimeout(() => {
    //       isOpen = !isOpen;
    //     })
    //   }
    // }

    hostElem.onclick = () => {
      if (isOpen) {
        mobileBox.classList.remove('opened');
        body.classList.remove('mod-no-scroll');
        setTimeout(() => {
          isOpen = !isOpen;
        })
      }
    }

    selectWrapperElem.onclick = () => {
      if (selectWrapperElem.className.includes('mod-show')) {
        selectWrapperElem.classList.remove('mod-show');
      } else {
        selectWrapperElem.classList.add('mod-show');
      }
    }
  }
}
