import { Form } from './common/form';
import { Modal } from './common/modal';
import { checkExistParent } from '../functions/checkExistParent';

export class AccountPage {
  hostElem;
  accountComponent;

  directionSelectWrapper;
  directionSelect;
  markRequiredElem;

  departureDateSelectWrapper;
  departureDateSelect;

  arrivalTransferWrapper;
  arrivalTransferRadios;

  constructor() {
    this.hostElem = document.querySelector('#account-host');
    if (!this.hostElem) return;

    this.directionSelectWrapper = this.hostElem.querySelector('.js-profile-direction');
    this.directionSelect = this.directionSelectWrapper.querySelector('.gl__select');

    this.departureDateSelectWrapper = this.hostElem.querySelector('.js-disappearing-field-date-arrival');
    this.departureDateSelect = this.departureDateSelectWrapper.querySelector('.gl__select');

    this.arrivalTransferWrapper = this.hostElem.querySelector('.js-arrival-transfer');
    this.arrivalTransferRadios = this.arrivalTransferWrapper.querySelectorAll('.gl__radio-checkbox-input');

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
      this.checkArrivalTransfer();
      this.checkDepartureDate(false);
    }, 300)

    this.directionSelect.onchange = () => {
      this.checkDirections(true);
    }

    this.arrivalTransferRadios.forEach(elem => {
      elem.onchange = () => {
        this.checkArrivalTransfer(elem);
      }
    })

    this.departureDateSelect.onchange = () => {
      this.checkDepartureDate(true);
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
        const calendarContentElems = calendarSlotsElems[indexCurrentSlotContainer].querySelectorAll('.js-calendar-list-times');

        calendarContentElems.forEach(elem => {
          if (elem.getAttribute('data-times') === input.getAttribute('data-times')) {
            elem.classList.add('mod-show');
          } else {
            elem.classList.remove('mod-show');
          }
        })
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
        const modalMapImage = modal.hostElem.querySelector('.js-modal-map-image');
        modalLocationTitle.innerText = `${ btn.getAttribute('data-auditorium') }`;
        modalMapImage.setAttribute('src', btn.getAttribute('data-map-image'))
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
    const universitySelectContainerElem = this.hostElem.querySelector('.js-disappearing-field-university');
    if (this.directionSelect.innerText === 'Вузы' || optionValue.innerText === 'Вузы') {
      this.addDisappearingField(universitySelectContainerElem, true);
    } else {
      this.removeDisappearingField(universitySelectContainerElem, isChange);
    }
  }

  checkArrivalTransfer(input) {
    const dateArrivalSelectContainerElem = this.hostElem.querySelector('.js-disappearing-field-date-arrival');
    if (input && input.value === 'need') {
      this.addDisappearingField(dateArrivalSelectContainerElem, true);
      this.checkDepartureDate();
    } else if (input && input.value === 'not-needed') {
      const place1Elem = this.hostElem.querySelector('.js-disappearing-places-1');
      const place2Elem = this.hostElem.querySelector('.js-disappearing-places-2');
      this.removeDisappearingField(dateArrivalSelectContainerElem);
      this.removeDisappearingField(place1Elem, true);
      this.removeDisappearingField(place2Elem, true);
    }
  }

  checkDepartureDate(isChange) {
    const optionValue = this.departureDateSelect.querySelectorAll('option')[0];
    const place1Elem = this.hostElem.querySelector('.js-disappearing-places-1');
    const place2Elem = this.hostElem.querySelector('.js-disappearing-places-2');
    if (this.departureDateSelect.innerText === '2 декабря' || optionValue.innerText === '2 декабря' ||
      this.departureDateSelect.innerText === '3 декабря' || optionValue.innerText === '3 декабря' ||
      this.departureDateSelect.innerText === '4 декабря' || optionValue.innerText === '4 декабря') {
      this.addDisappearingField(place1Elem, true);
    } else {
      this.removeDisappearingField(place1Elem, isChange);
    }

    if (this.departureDateSelect.innerText === '5 декабря' || optionValue.innerText === '5 декабря') {
      this.addDisappearingField(place2Elem, true);
    } else {
      this.removeDisappearingField(place2Elem, isChange);
    }
  }

  addDisappearingField(fieldElem, isRequired) {
    fieldElem.classList.add('mod-show');
    // добавить валидацию для нового селекта
    if (isRequired) {
      const markRequiredElem = document.createElement('div');
      const selectWrapperElem = fieldElem.querySelector('.gl__select-wrapper');
      const selectElem = fieldElem.querySelector('.gl__select');
      markRequiredElem.classList.add('gl__input-mark-required');
      selectWrapperElem.prepend(markRequiredElem);
      selectElem.setAttribute('data-parsley-required', '');
      selectElem.setAttribute('data-parsley-trigger', 'change');
    }
  }

  removeDisappearingField(fieldElem, isChange) {
    fieldElem.classList.remove('mod-show');
    if (isChange) {
      // убрать валидацию с селекта
      const selectElem = fieldElem.querySelector('.gl__select');
      selectElem.removeAttribute('data-parsley-required');
      selectElem.removeAttribute('data-parsley-trigger');
    }
  }
}
