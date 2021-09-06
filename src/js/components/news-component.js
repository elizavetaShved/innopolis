export class newsComponent {
  hostElem;
  btnPrev;
  btnNext;
  cardElems;

  currentSlide = 0;
  windowIsLarge;

  constructor() {
    this.hostElem = document.querySelector('#news-block-host');
    if (!this.hostElem) return;

    this.btnPrev = this.hostElem.querySelector('.news__navigate-navigate-btn-wrapper.mod-prev');
    this.btnNext = this.hostElem.querySelector('.news__navigate-navigate-btn-wrapper.mod-next');
    this.cardElems = this.hostElem.querySelectorAll('.news__card');
    this.windowIsLarge = window.innerWidth > 567;

    this.updateCardsList();

    this.btnPrev.onclick = () => {
      if (this.currentSlide > 0) {
        this.currentSlide--;
        this.setActiveCard();
      }
    }

    this.btnNext.onclick = () => {
      if (this.windowIsLarge) {
        if (this.currentSlide < (this.cardElems.length / 2) - 1) {
          this.currentSlide++;
          this.setActiveCard();
        }
      } else {
        if (this.currentSlide < this.cardElems.length - 1) {
          this.currentSlide++;
          this.setActiveCard();
        }
      }
    }

    window.addEventListener('resize', () => {
      this.updateCardsList();
    });
  }

  updateCardsList() {
    this.windowIsLarge = window.innerWidth > 567;
    this.setActiveCard();
  }

  setActiveCard() {
    if (this.windowIsLarge) {
      this.cardElems.forEach((card, i) => {
        if (i === this.currentSlide * 2 || i === this.currentSlide * 2 + 1) {
          card.classList.add('mod-show');
        } else {
          card.classList.remove('mod-show');
        }
      })
    } else {
      this.cardElems.forEach((card, i) => {
        if (i === this.currentSlide) {
          card.classList.add('mod-show');
        } else {
          card.classList.remove('mod-show');
        }
      })
    }

    this.checkDisabledBtns();
  }

  checkDisabledBtns() {
    if (this.currentSlide === 0) {
      this.btnPrev.setAttribute('disabled', true);
    } else {
      this.btnPrev.removeAttribute('disabled');
    }

    if (this.windowIsLarge) {
      if (this.currentSlide >= (this.cardElems.length / 2) - 1) {
        this.btnNext.setAttribute('disabled', true);
      } else {
        this.btnNext.removeAttribute('disabled');
      }
    } else {
      if (this.currentSlide === this.cardElems.length - 1) {
        this.btnNext.setAttribute('disabled', true);
      } else {
        this.btnNext.removeAttribute('disabled');
      }
    }
  }
}
