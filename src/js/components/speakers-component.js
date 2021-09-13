export const STEP_OPENED_SPEAKERS = 10;
export const INITIALLY_OPEN_CARD_COUNT = 8;

export class SpeakersComponent {
  btnShowMore;
  speakerItemElems;
  openingCardCount;
  openingAvailableCount;

  constructor() {
    const hostElem = document.getElementById('speakers-host');
    if (!hostElem) return;

    const itemWrapper = hostElem.querySelectorAll('.speakers__message-container');
    this.btnShowMore = hostElem.querySelector('.speakers__btn-show-more');
    this.speakerItemElems = hostElem.querySelectorAll('.speakers__item');

    this.resetToInitial();

    // пояение облака
    itemWrapper.forEach(elem => {
      elem.onmouseover = () => {
        itemWrapper.forEach(e => e.parentElement.parentElement.classList.remove('mod-hover'));
        elem.parentElement.parentElement.classList.add('mod-hover');
      }
    });

    // по клику на кнопку открываем новые карты, меняем текст и количество открых карт
    this.btnShowMore.onclick = () => {
      if (this.openingAvailableCount) {
        if (this.openingCardCount < this.speakerItemElems.length) {
          this.speakerItemElems.forEach((elem, index) => {
            if (index - this.openingCardCount > 0 && index - this.openingCardCount <= this.openingAvailableCount) {
              elem.classList.add('mod-show');
            }
          })

          this.openingCardCount += this.openingAvailableCount;
          this.setBtnText();
        }
      } else {
        this.resetToInitial();
        // document.location.href = '/#speakers-host';
        // todo для GH-page
        document.location.href = 'innopolis/build/#speakers-host';
      }
    }
  }

  setBtnText() {
    const fullRemainsCardsCount = this.speakerItemElems.length - this.openingCardCount;
    this.openingAvailableCount = fullRemainsCardsCount >= STEP_OPENED_SPEAKERS ? STEP_OPENED_SPEAKERS : fullRemainsCardsCount;
    if (this.openingAvailableCount) {
      this.btnShowMore.innerHTML = `Показать ещё ${ this.openingAvailableCount }`;
    } else {
      this.btnShowMore.innerHTML = 'Свернуть';
    }
  }

  resetToInitial() {
    this.openingCardCount = INITIALLY_OPEN_CARD_COUNT;
    // открыть 8 карточек
    this.speakerItemElems.forEach((elem, i) => {
      if (i <= INITIALLY_OPEN_CARD_COUNT) {
        elem.classList.add('mod-show');
      } else {
        elem.classList.remove('mod-show');
      }
    })

    // задали начальный текст кнопке
    this.setBtnText();
  }
}
