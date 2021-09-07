export class Faq {
  constructor() {
    const hostElem = document.querySelector('#faq-block-host');
    const faqItems = Array.from(hostElem.querySelectorAll('.faq-block__item'));



    faqItems.forEach((elem, i) => {
      elem.onclick = () => {
        if (elem.className.includes('mod-open')) {
          elem.classList.remove('mod-open');
        } else {
          faqItems.map(faqBody => faqBody.classList.remove('mod-open'));
          elem.classList.add('mod-open');
        }
      }
    })
  }
}
