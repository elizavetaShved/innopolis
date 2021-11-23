import { Modal } from './common/modal';
import { checkExistParent } from '../functions/checkExistParent';

export class AccountCalendar {
  constructor() {
    this.hostElem = document.querySelector('#account-host');

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
        const inputValue = input.getAttribute('data-value');

        const timeTextElem = calendarSlotTextTimeElem[indexCurrentSlotContainer];
        if (input.checked) {
          errorTimeElem[indexCurrentSlotContainer].classList.remove('mod-show');

          if (timeTextElem.innerText) {
            timeTextElem.innerText += `; ${ inputValue }`;
          } else {
            timeTextElem.innerText = `— ${ inputValue }`;
            timeTextElem.setAttribute('data-times', `${ inputValue }; `);
          }
        } else {
          if (!calendarSlotTextTimeElem[indexCurrentSlotContainer].innerText) {
            errorTimeElem[indexCurrentSlotContainer].classList.add('mod-show');
          }

          const newStrTime = timeTextElem.innerText
            .split(`— ${ inputValue }; `).join('')
            .split(`— ${ inputValue }`).join('')
            .split(`; ${ inputValue }`).join('');
          timeTextElem.innerText = `${ newStrTime }`;
        }

        let attributeStr = timeTextElem.innerText.split(`;`).join(',');
        if (attributeStr.includes('— ')) {
          attributeStr = attributeStr.split('— ')[1]
        }

        timeTextElem.setAttribute('data-times', attributeStr);
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
          const inputValuesTimeElem = modal.hostElem.querySelector('.js-calendar-value-dates');

          modalSlotTextDateElem.innerText = calendarSlotTextDateElem[indexCurrentSlotContainer].innerText;
          modalSlotTextAuditoriumElem.innerText = calendarSlotTextAuditoriumElem[indexCurrentSlotContainer].innerText;
          modalSlotTextTimeElem.innerText = calendarSlotTextTimeElem[indexCurrentSlotContainer].innerText;
          inputValuesTimeElem.value = calendarSlotTextTimeElem[indexCurrentSlotContainer].getAttribute('data-times');
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
}
