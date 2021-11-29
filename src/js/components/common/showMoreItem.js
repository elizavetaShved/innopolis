export class ShowMoreItem {
  btnShowMore;
  linkRollUp;
  fullItemList;
  itemList;
  stepOpened;
  initiallyOpenCardCount;
  openingCardCount;
  openingAvailableCount;
  isHideLinkRollUp;
  blockElem;

  constructor(blockElem, btnShowMore, linkRollUp, itemList, stepOpened, initiallyOpenCardCount, isHideLinkRollUp) {
    if (blockElem) {
      this.blockElem = blockElem;
    }
    this.btnShowMore = btnShowMore;
    this.linkRollUp = linkRollUp;
    this.fullItemList = itemList;
    this.itemList = this.fullItemList;
    this.stepOpened = stepOpened;
    this.initiallyOpenCardCount = initiallyOpenCardCount;
    this.isHideLinkRollUp = isHideLinkRollUp;

    const checkboxFilterElems = document.querySelectorAll('.program__filter-checkbox');

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
          this.openingCardCount += this.itemList.length;
          this.setBtnText();
        }
      }
    };

    this.linkRollUp.onclick = () => {
      this.resetToInitial();
    }

    if (this.blockElem && checkboxFilterElems) {
      checkboxFilterElems.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
          setTimeout(() => {
            const contentElems = this.blockElem.querySelectorAll('.program__content-item');
            this.itemList = Array.from(contentElems).filter(item => {
              if (!item.className.includes('mod-hide-by-filter')) {
                return true;
              }
            });

            this.itemList.map(item => item.classList.remove('mod-show'))
            this.resetToInitial();
          })
        })
      })
    }
  }

  setBtnText() {
    const fullRemainsCardsCount = this.itemList.length - this.openingCardCount;
    this.openingAvailableCount = fullRemainsCardsCount >= this.stepOpened ? this.stepOpened : fullRemainsCardsCount;

    if (this.openingAvailableCount > 0) {
      this.btnShowMore.classList.remove('mod-hide');
      this.linkRollUp.classList.remove('mod-hide');
      this.btnShowMore.innerHTML = `Показать ещё ${this.openingAvailableCount}`;
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
      console.log(this.isHideLinkRollUp)
      if (this.isHideLinkRollUp) {
        this.btnShowMore.classList.remove('mod-show');
      } else {
        this.btnShowMore.classList.add('mod-hide');
        this.linkRollUp.classList.add('mod-hide');
      }
    }
  }
}
