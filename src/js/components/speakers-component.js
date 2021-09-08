export const STEP_OPENED_SPEAKERS = 10;

export class SpeakersComponent {
  btnShowMore;
  speakerItemElems;
  openingCardCount = 0;
  openingAvailableCount;

  constructor() {
    const hostElem = document.getElementById('speakers-host');
    if (!hostElem) return;

    const itemWrapper = hostElem.querySelectorAll('.speakers__message-container');
    this.btnShowMore = hostElem.querySelector('.speakers__btn-show-more');
    this.speakerItemElems = hostElem.querySelectorAll('.speakers__item');

    this.speakerItemElems.forEach(elem => {
      if (!elem.className.includes('mod-hide')) {
        this.openingCardCount ++;
      }
    })

    this.setBtnText();

    itemWrapper.forEach(elem => {
      elem.onmouseover = () => {
        itemWrapper.forEach(e => e.parentElement.parentElement.classList.remove('mod-hover'));
        elem.parentElement.parentElement.classList.add('mod-hover');
      }
    });

    this.btnShowMore.onclick = () => {
      console.log('открыто', this.openingCardCount)
      console.log('всего', this.speakerItemElems.length)
      if (this.openingCardCount < this.speakerItemElems.length) {
        this.speakerItemElems.forEach((elem, index) => {
          if (index - this.openingCardCount > 0 && index - this.openingCardCount <= this.openingAvailableCount) {
            elem.classList.remove('mod-hide');
          }
        })
        this.setBtnText();

        this.openingCardCount += this.openingAvailableCount;
      }
    }
  }

  setBtnText() {
    const fullRemainsCardsCount = this.speakerItemElems.length - this.openingCardCount;
    this.openingAvailableCount = fullRemainsCardsCount >= STEP_OPENED_SPEAKERS ? STEP_OPENED_SPEAKERS : fullRemainsCardsCount;
    this.btnShowMore.innerHTML = `Показать ещё ${ this.openingAvailableCount }`;
  }
}
