import { Form } from './common/form';
import { Modal } from './common/modal';
import { checkExistParent } from '../functions/checkExistParent';

export class AccountPage {
  hostElem;
  accountComponent;

  directionSelectWrapper;
  directionSelect;
  universitySelectWrapper;
  universitySelect;
  markRequiredElem;
  universityMarkRequiredElem;

  constructor() {
    this.hostElem = document.querySelector('#account-host');
    if (!this.hostElem) return;

    this.directionSelectWrapper = this.hostElem.querySelector('.profile__direction');
    this.directionSelect = this.directionSelectWrapper.querySelector('.gl__select');

    this.universitySelectWrapper = this.hostElem.querySelector('.profile__university-type');
    this.universitySelect = this.universitySelectWrapper.querySelector('.gl__select');
    this.universitySelectWrapperElem = this.universitySelectWrapper.querySelector('.gl__select-wrapper');
    this.universitySelectElem = this.universitySelectWrapper.querySelector('.gl__select');

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

    const btnsLocation = this.hostElem.querySelectorAll('.js-open-modal-location');

    const participationCheckboxes = document.getElementsByName('participation-account');

    setTimeout(() => {
      this.checkDirections(false);
    }, 3000)

    this.directionSelect.onchange = () => {
      this.checkDirections(true);
    }

    menuRadioValue.forEach((radioElem, index) => {
      this.changeComponent(radioElem, index);

      radioElem.onchange = () => {
        this.changeComponent(radioElem, index);
      }
    })

    btnPaymentParticipation.onclick = () => {
      const modal = new Modal('payment-participation', false);
      modal.isOpen();

      // распределение по кнопкам модалки
      const modalMoinContentElem = modal.hostElem.querySelector('.js-main-content');
      const modalNaturalContentElem = modal.hostElem.querySelector('.js-natural-person-content');
      const modalLegalContentElem = modal.hostElem.querySelector('.js-legal-person-content');
      const btnNaturalPerson = modal.hostElem.querySelector('.js-natural-person');
      const btnLegalPerson = modal.hostElem.querySelector('.js-legal-person');

      if (btnNaturalPerson) {
        btnNaturalPerson.onclick = () => {
          modalMoinContentElem.classList.add('mod-hide');
          modalNaturalContentElem.classList.remove('mod-hide');
        }
      }

      if (btnLegalPerson) {
        btnLegalPerson.onclick = () => {
          modalMoinContentElem.classList.add('mod-hide');
          modalLegalContentElem.classList.remove('mod-hide');
        }
      }
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
        calendarSlotTextDateElem[indexCurrentSlotContainer].innerText = `${ input.value }, `;
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

    btnsLocation.forEach(btn => {
      btn.onclick = () => {
        const modal = new Modal('location', true);
        modal.isOpen();
        const modalLocationTitle = modal.hostElem.querySelector('.js-modal-location-title');
        modalLocationTitle.innerText = `${ btn.getAttribute('data-auditorium') }`;
      }
    })

    participationCheckboxes.forEach(checkbox => {
      checkbox.onchange = () => {
        if (checkbox.value === '4') {
          btnPaymentParticipation.removeAttribute('disabled');
        } else {
          btnPaymentParticipation.setAttribute('disabled', true);
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

  checkDirections(isChange) {
    // todo косытль, потому что value - id, которое мб разным
    const optionValue = this.directionSelect.querySelectorAll('option')[0];
    if (this.directionSelect.innerText === 'Вузы' || optionValue.innerText === 'Вузы') {
      this.universitySelectWrapper.classList.add('mod-show');
      // добавить валидацию для нового селекта
      this.universityMarkRequiredElem = document.createElement('div');
      this.universityMarkRequiredElem.classList.add('gl__input-mark-required');
      this.universitySelectWrapperElem.prepend(this.universityMarkRequiredElem);
      this.universitySelectElem.setAttribute('data-parsley-required', '');
      this.universitySelectElem.setAttribute('data-parsley-trigger', 'change');
    } else {
      this.universitySelectWrapper.classList.remove('mod-show');
      // this.universitySelect.value = null;
      if (isChange) {
        // убрать валидацию с селекта
        // this.universityMarkRequiredElem.remove();
        this.universitySelectElem.removeAttribute('data-parsley-required');
        this.universitySelectElem.removeAttribute('data-parsley-trigger');
      }
    }
  }
}
