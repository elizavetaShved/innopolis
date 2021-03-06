import { Modal } from './common/modal';
import Choices from 'choices.js';

export class AccountProfile {
  hostElem;

  directionSelectWrapper;
  directionSelect;

  departureDateSelectWrapper;
  departureDateSelect;

  arrivalTransferWrapper;
  arrivalTransferRadios;

  selectPlaces;
  placesChoicesOptions;

  datesArr;
  placesArr;

  choicesSelectPlace;

  placeCurrentOptionType;

  constructor() {
    this.hostElem = document.querySelector('.profile');

    if(!this.hostElem) return;

    this.directionSelectWrapper = this.hostElem.querySelector('.js-profile-direction');
    if (this.directionSelectWrapper) {
      this.directionSelect = this.directionSelectWrapper.querySelector('.gl__select');
    }

    this.departureDateSelectWrapper = this.hostElem.querySelector('.js-disappearing-field-date-arrival');
    if (this.departureDateSelectWrapper) {
      this.departureDateSelect = this.departureDateSelectWrapper.querySelector('.gl__select');
    }

    this.arrivalTransferWrapper = this.hostElem.querySelector('.js-arrival-transfer');
    if (this.arrivalTransferWrapper) {
      this.arrivalTransferRadios = this.arrivalTransferWrapper.querySelectorAll('.gl__radio-checkbox-input');
    }

    const btnPaymentParticipation = this.hostElem.querySelector('#btn-payment-participation');

    const participationCheckboxes = document.getElementsByName('participation-account');

    this.selectPlaces = this.hostElem.querySelector('#place-submission-account');

    this.datesArr = [];
    this.placesArr = [];

    const selectDates = this.hostElem.querySelector('#departure-date-account');
    if (selectDates) {
      const optionsList = selectDates.querySelectorAll('.gl__select-option');
      optionsList.forEach(option => {
        this.datesArr.push({
          type: option.getAttribute('data-date'),
          text: option.innerText
        });
      })

      const selectElems = selectDates.querySelector('.js-multi-select');

      this.choicesInit(false, selectElems)
    }

    if (this.selectPlaces) {
      const optionsList = this.selectPlaces.querySelectorAll('.gl__select-option');
      optionsList.forEach(option => {
        this.placesArr.push({
          type: option.getAttribute('data-date'),
          text: option.innerText
        })
      })

      const selectElems = this.selectPlaces.querySelector('.js-multi-select');

      this.choicesInit(true, selectElems)
    }


    if (this.selectPlaces) {
      this.placesChoicesOptions = Array.from(this.selectPlaces.querySelectorAll('.choices__item'));
    }

    setTimeout(() => {
      this.checkDirections(false);
      this.checkArrivalTransfer();
      this.checkDepartureDate(false);
    }, 300)

    if (this.directionSelect) {
      this.directionSelect.onchange = () => {
        this.checkDirections(true);
      }
    }

    if (this.arrivalTransferRadios) {
      this.arrivalTransferRadios.forEach(elem => {
        elem.onchange = () => {
          this.checkArrivalTransfer(elem);
        }
      })
    }

    if (this.departureDateSelect) {
      this.departureDateSelect.onchange = () => {
        this.checkDepartureDate(true);
      }
    }

    if (btnPaymentParticipation) {
      btnPaymentParticipation.onclick = () => {
        const modal = new Modal('payment-participation', false);
        modal.isOpen();

        // ?????????????????????????? ???? ?????????????? ??????????????
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
      };

      participationCheckboxes.forEach(checkbox => {
        checkbox.onchange = () => {
          if (checkbox.value === '4') {
            btnPaymentParticipation.removeAttribute('disabled');
          } else {
            btnPaymentParticipation.setAttribute('disabled', true);
          }
        }
      })
    }
  }

  choicesInit(isChoicesSelectPlace, selectElem) {
    if (isChoicesSelectPlace) {
      this.choicesSelectPlace = new Choices(selectElem, {
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false,
      })

      const onChoiceSelected = () => {
        $(this.choicesSelectPlace.passedElement.element).parsley().validate();
      }

      this.choicesSelectPlace.passedElement.element.addEventListener('addItem', onChoiceSelected, false);
    } else {
      const choicesInstance = new Choices(selectElem, {
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false,
      });

      const onChoiceSelected = () => {
        $(choicesInstance.passedElement.element).parsley().validate();
      }

      choicesInstance.passedElement.element.addEventListener('addItem', onChoiceSelected, false);
    }
  }

  checkDirections(isChange) {
    // todo ??????????????, ???????????? ?????? value - id, ?????????????? ???? ????????????
    if (this.directionSelect) {
      const optionValue = this.directionSelect.querySelectorAll('option')[0];
      const universitySelectContainerElem = this.hostElem.querySelector('.js-disappearing-field-university');
      if (this.directionSelect.innerText === '????????' || optionValue.innerText === '????????' ||
        this.directionSelect.innerText === 'Universities' || optionValue.innerText === 'Universities') {
        this.addDisappearingField(universitySelectContainerElem, true);
      } else {
        this.removeDisappearingField(universitySelectContainerElem, isChange);
      }
    }
  }

  checkArrivalTransfer(input) {
    const dateArrivalSelectContainerElem = this.hostElem.querySelector('.js-disappearing-field-date-arrival');
    if (input && input.getAttribute('data-value') === 'need') {
      this.addDisappearingField(dateArrivalSelectContainerElem, true);
      this.checkDepartureDate();
    } else if (input && input.getAttribute('data-value') === 'not-needed') {
      const placeElem = this.hostElem.querySelector('.js-disappearing-places');
      this.removeDisappearingField(dateArrivalSelectContainerElem);
      this.removeDisappearingField(placeElem, true);
    }
  }

  checkDepartureDate(isChange) {
    if (this.departureDateSelect) {
      const optionValue = this.departureDateSelect.querySelectorAll('option')[0];

      const placeElem = this.hostElem.querySelector('.js-disappearing-places');

      this.datesArr.forEach(date => {
        if (this.departureDateSelect.innerText === date.text || optionValue.innerText === date.text) {
          if (this.placeCurrentOptionType && this.placeCurrentOptionType !== date.type) {
            this.choicesSelectPlace.setValue(['']);
          }
          this.placeCurrentOptionType = date.type;
        }
      })

      if (this.placeCurrentOptionType) {
        this.addDisappearingField(placeElem, true);
        this.placesArr.forEach((elem, index) => {
          if (elem.type && elem.type === this.placeCurrentOptionType) {
            this.placesChoicesOptions[index + 1].classList.remove('mod-hide');
          } else {
            this.placesChoicesOptions[index + 1].classList.add('mod-hide');
          }
        })
      } else {
        this.removeDisappearingField(placeElem, isChange);
      }
    }
  }

  addDisappearingField(fieldElem, isRequired) {
    fieldElem.classList.add('mod-show');
    // ???????????????? ?????????????????? ?????? ???????????? ??????????????
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
      // ???????????? ?????????????????? ?? ??????????????
      const selectElem = fieldElem.querySelector('.gl__select');
      selectElem.removeAttribute('data-parsley-required');
      selectElem.removeAttribute('data-parsley-trigger');
    }
  }
}
