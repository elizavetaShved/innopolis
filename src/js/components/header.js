export class Header {

  constructor() {
    const hostElem = document.querySelector('#header-host');
    const btnBurger = hostElem.querySelector('.app-header__burger');
    const mobileBox = document.querySelector('.mobile-box');
    const body = document.querySelector('body');

    let isOpen = false;

    btnBurger.onclick = () => {
      if (!isOpen) {
        mobileBox.classList.add('opened');
        body.classList.add('mod-no-scroll');
        setTimeout(() => {
          isOpen = !isOpen;
        })
      }
    }

    hostElem.onclick = () => {
      if (isOpen) {
        mobileBox.classList.remove('opened');
        body.classList.remove('mod-no-scroll');
        setTimeout(() => {
          isOpen = !isOpen;
        })
      }
    }
  }
}
