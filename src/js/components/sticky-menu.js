export class StickyMenu {

  constructor() {
    const hostElem = document.querySelector('.sticky-menu');
    const header = document.querySelector('.header');

    let headerHeight = header.offsetHeight;

    window.addEventListener('scroll', () => {
      if (window.innerHeight >= 1024 && window.pageYOffset >= headerHeight) {
        hostElem.classList.add('mod-scroll');
      } else {
        hostElem.classList.remove('mod-scroll');
      }
    })

    window.addEventListener('resize', () => headerHeight = header.offsetHeight);
  }
}
