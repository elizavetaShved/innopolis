import { Form } from './common/form';
import { Modal } from './common/modal';
import { checkExistParent } from '../functions/checkExistParent';

export class AccountPage {
  accountComponent;
  hostElem;

  constructor() {
    this.hostElem = document.querySelector('#account-host');
    if (!this.hostElem) return;

    const directionSelectWrapper = this.hostElem.querySelector('.profile__direction');
    const directionSelect = directionSelectWrapper.querySelector('.gl__select');

    const universitySelectWrapper = this.hostElem.querySelector('.profile__university-type');
    const universitySelect = universitySelectWrapper.querySelector('.gl__select');

    const menuRadioValue = this.hostElem.querySelectorAll('.account__menu-radio');
    this.accountComponent = Array.from(this.hostElem.querySelectorAll('.account__component'));

    const btnPaymentParticipation = this.hostElem.querySelector('#btn-payment-participation');

    new Form(this.hostElem);

    const calendarOpenSlotsBtns = this.hostElem.querySelectorAll('.js-calendar-open-slots');
    const calendarSlotsElems = Array.from(this.hostElem.querySelectorAll('.js-calendar-slots-container'));

    const calendarTimeInputs = this.hostElem.querySelectorAll('.js-calendar-time-btn');
    const calendarDateInputs = this.hostElem.querySelectorAll('.js-calendar-input-date');

    const calendarSlotTextDateElem = this.hostElem.querySelectorAll('.js-calendar-slots-text-date');
    const calendarSlotTextAuditoriumElem = this.hostElem.querySelectorAll('.js-calendar-slots-text-auditorium');
    const calendarSlotTextTimeElem = this.hostElem.querySelectorAll('.js-calendar-slots-text-time');

    let isOpenCalendarSlotsContainer = false;
    let indexCurrentSlotContainer;

    const openModalBtns = this.hostElem.querySelectorAll('.js-open-modal-to-book');
    const errorTimeElem = this.hostElem.querySelectorAll('.js-error-time');

    directionSelect.onchange = () => {
      if (directionSelect.value === 'Вузы') {
        universitySelectWrapper.classList.add('mod-show');
      } else {
        universitySelectWrapper.classList.remove('mod-show');
        universitySelect.value = null;
      }
    }

    menuRadioValue.forEach((radioElem, index) => {
      this. changeComponent(radioElem, index);

      radioElem.onchange = () => {
       this. changeComponent(radioElem, index);
      }
    })

    btnPaymentParticipation.onclick = () => {
      const modal = new Modal('payment-participation', true);
      modal.isOpen();
    }

    calendarOpenSlotsBtns.forEach((btn, indexBtn) => {
      btn.onclick = () => {
        calendarSlotsElems.forEach((elem, indexElem) => {
          if (indexBtn === indexElem) {
            elem.classList.add('mod-show');
            indexCurrentSlotContainer = indexElem;
            calendarSlotTextDateElem[indexCurrentSlotContainer].innerText = `${ calendarDateInputs[0].value }, `;
            calendarSlotTextAuditoriumElem[indexCurrentSlotContainer].innerText = `Аудитория ${ elem.getAttribute('data-auditorium') }`;
          } else {
            elem.classList.remove('mod-show');
          }
        })
      }
    })

    calendarDateInputs.forEach(input => {
      input.onchange = () => {
        calendarSlotTextDateElem[indexCurrentSlotContainer].innerText = `${ input.value}, `;
      }
    })

    calendarTimeInputs.forEach(input => {
      input.onchange = () => {
        errorTimeElem[indexCurrentSlotContainer].classList.remove('mod-show');
        calendarSlotTextTimeElem[indexCurrentSlotContainer].innerText = `— ${ input.value }`;
      }
    })

    openModalBtns.forEach(btn => {
      btn.onclick = () => {
        if (calendarSlotTextTimeElem[indexCurrentSlotContainer].innerText) {
          const modal = new Modal('to-book', false);
          modal.isOpen();
          const modalSlotTextDateElem = modal.hostElem.querySelector('.js-calendar-slots-text-date');
          const modalSlotTextAuditoriumElem = modal.hostElem.querySelector('.js-calendar-slots-text-auditorium');
          const modalSlotTextTimeElem = modal.hostElem.querySelector('.js-calendar-slots-text-time');

          modalSlotTextDateElem.innerText = calendarSlotTextDateElem[indexCurrentSlotContainer].innerText;
          modalSlotTextAuditoriumElem.innerText = calendarSlotTextAuditoriumElem[indexCurrentSlotContainer].innerText;
          modalSlotTextTimeElem.innerText = calendarSlotTextTimeElem[indexCurrentSlotContainer].innerText;
        } else {
          errorTimeElem[indexCurrentSlotContainer].classList.add('mod-show');
        }
      }
    })

    window.addEventListener('click', (e) => {
      let isClickForSlotContainer = false;
      let isClickForBtnOpen = false;
      calendarSlotsElems.forEach((elem, i) => {
        if (checkExistParent(e.target, elem)) {
          isClickForSlotContainer = true;
        }

        if (checkExistParent(e.target, calendarOpenSlotsBtns[i])) {
          elem.classList.add('mod-show');
          isClickForBtnOpen = true;
        }
      })

      if (isOpenCalendarSlotsContainer && !isClickForSlotContainer && !isClickForBtnOpen) {
        calendarSlotsElems.map(elem => elem.classList.remove('mod-show'));
        isOpenCalendarSlotsContainer = false;
      } else {
        isOpenCalendarSlotsContainer = true;
      }
    })
  }

  changeComponent(radioElem, index) {
    if (radioElem.checked) {
      this.accountComponent.map(elem => elem.classList.remove('mod-show'))
      this.accountComponent[index].classList.add('mod-show');
    }
  }
}
