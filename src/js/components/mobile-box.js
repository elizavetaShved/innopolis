export class MobileBox {
  hostElem;
  btnBurger;

  constructor(isOpen, btnBurger) {
    this.hostElem = document.querySelector('#mobile-box-host');
    this.btnBurger = btnBurger;
    const navigationLinkElems = this.hostElem.querySelectorAll('.navigation-link');

    navigationLinkElems.forEach(link => {
      link.onclick = () => {
        this.isCloseMobileBox();
        isOpen = !isOpen;
      }
    })
  }

  isOpenMobileBox() {
    this.hostElem.classList.add('opened');
  }

  isCloseMobileBox() {
    this.hostElem.classList.remove('opened');
    this.btnBurger.classList.remove('mod-open');
  }
}
