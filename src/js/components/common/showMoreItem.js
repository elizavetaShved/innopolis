export class ShowMoreItem {
  btnShowMore;
  linkRollUp;
  itemList;
  stepOpenedSpeakers;
  initiallyOpenCardCount;
  openingCardCount;
  openingAvailableCount;
  isHideLinkRollUp;

  constructor(btnShowMore, linkRollUp, itemList, stepOpenedSpeakers, initiallyOpenCardCount, isHideLinkRollUp) {
    this.btnShowMore = btnShowMore;
    this.linkRollUp = linkRollUp;
    this.itemList = itemList;
    this.stepOpenedSpeakers = stepOpenedSpeakers;
    this.initiallyOpenCardCount = initiallyOpenCardCount;
    this.isHideLinkRollUp = isHideLinkRollUp;

    this.resetToInitial();

    // по клику на кнопку открываем новые карты, меняем текст и количество открых карт
    this.btnShowMore.onclick = () => {
      if (this.openingAvailableCount) {
        if (this.openingCardCount < this.itemList.length) {
          this.itemList.forEach((elem, index) => {
            if (index - (this.openingCardCount - 1) > 0 && index - (this.openingCardCount - 1) <= this.openingAvailableCount) {
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

  setBtnText() {
    const fullRemainsCardsCount = this.itemList.length - this.openingCardCount;
    this.openingAvailableCount = fullRemainsCardsCount >= this.stepOpenedSpeakers ? this.stepOpenedSpeakers : fullRemainsCardsCount;

    if (this.openingAvailableCount) {
      this.btnShowMore.innerHTML = `Показать ещё ${ this.openingAvailableCount }`;
    } else {
      if (this.isHideLinkRollUp) {
        this.btnShowMore.classList.remove('mod-show');
        this.linkRollUp.classList.add('mod-show');
      } else {
        this.btnShowMore.innerHTML = `Показать ещё`;
        this.btnShowMore.setAttribute('disabled', true);
        this.linkRollUp.classList.add('mod-show');
      }
    }
  }

  resetToInitial() {
    if (this.itemList.length > this.initiallyOpenCardCount) {
      this.openingCardCount = this.initiallyOpenCardCount;
      if (this.isHideLinkRollUp) {
        this.btnShowMore.classList.add('mod-show');
        this.linkRollUp.classList.remove('mod-show');
      } else {
        this.btnShowMore.removeAttribute('disabled');
      }

      // открыть 8 карточек
      this.itemList.forEach((elem, i) => {
        if (i <= this.initiallyOpenCardCount - 1) {
          elem.classList.add('mod-show');
        } else {
          elem.classList.remove('mod-show');
        }
      })

      // задали начальный текст кнопке
      this.setBtnText();

    } else {
      this.openingCardCount = this.itemList.length;
      this.itemList.map(elem => elem.classList.add('mod-show'));
      if (this.isHideLinkRollUp) {
        this.btnShowMore.classList.remove('mod-show');
      } else {
        this.btnShowMore.classList.add('mod-hide');
        this.linkRollUp.classList.add('mod-hide');
      }
    }
  }
}
