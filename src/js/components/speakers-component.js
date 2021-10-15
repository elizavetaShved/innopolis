export const STEP_OPENED_SPEAKERS = 10;
export const INITIALLY_OPEN_CARD_COUNT = 8;

export class SpeakersComponent {
  btnShowMore;
  linkRollUp;
  speakerItemElems;
  openingCardCount;
  openingAvailableCount;

  constructor() {
    const hostElem = document.getElementById('speakers-host');
    if (!hostElem) return;

    const itemWrapper = hostElem.querySelectorAll('.speakers__message-container');
    const imageElem = hostElem.querySelectorAll('.speakers__item-image-wrapper');
    this.btnShowMore = hostElem.querySelector('.speakers__btn-show-more.speakers__btn-show-more--btn');
    this.linkRollUp = hostElem.querySelector('.speakers__btn-show-more.speakers__btn-show-more--link');
    this.speakerItemElems = hostElem.querySelectorAll('.speakers__item');

    this.resetToInitial();

    if (this.speakerItemElems.length < INITIALLY_OPEN_CARD_COUNT) {
      this.btnShowMore.classList.remove('mod-show');
    } else if (this.speakerItemElems.length < INITIALLY_OPEN_CARD_COUNT + STEP_OPENED_SPEAKERS) {
      this.linkRollUp.classList.remove('mod-show');
    } else {
      // появление облака
      itemWrapper.forEach((elem, i) => {
        elem.onmouseover = () => {
          itemWrapper.forEach(e => e.parentElement.parentElement.classList.remove('mod-hover'));
          elem.parentElement.parentElement.classList.add('mod-hover');
          imageElem[i].classList.add('mod-hover');
        }

        elem.onmouseout = () => {
          imageElem[i].classList.remove('mod-hover');
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
        }
      }

      this.linkRollUp.onclick = () => {
        this.resetToInitial();
      }
    }
  }

  setBtnText() {
    const fullRemainsCardsCount = this.speakerItemElems.length - this.openingCardCount;
    this.openingAvailableCount = fullRemainsCardsCount >= STEP_OPENED_SPEAKERS ? STEP_OPENED_SPEAKERS : fullRemainsCardsCount;
    if (this.openingAvailableCount) {
      this.btnShowMore.innerHTML = `Показать ещё ${ this.openingAvailableCount }`;
    } else {
      this.btnShowMore.classList.remove('mod-show');
      this.linkRollUp.classList.add('mod-show');
      // this.btnShowMore.innerHTML = 'Свернуть';
    }
  }

  resetToInitial() {
    this.openingCardCount = this.speakerItemElems.length > INITIALLY_OPEN_CARD_COUNT ? INITIALLY_OPEN_CARD_COUNT : this.speakerItemElems.length;

    this.btnShowMore.classList.add('mod-show');
    this.btnShowMore.innerHTML = `Показать ещё ${ this.openingAvailableCount }`;
    this.linkRollUp.classList.remove('mod-show');

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
