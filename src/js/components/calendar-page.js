import PerfectScrollbar from 'perfect-scrollbar';
import Choices from 'choices.js';
import getDateByDateAttribute from '../functions/getDateByDateAttribute';

const MS_PER_HOUR = 3600000;

export class CalendarPage {
  calendarRowElems;

  constructor() {
    const hostElem = document.querySelector('#calendar-host');
    const calendarContent = hostElem.querySelector('.calendar__content');
    const selectElems = hostElem.querySelectorAll('.gl__select');
    const btnShowAll = hostElem.querySelector('.calendar__btn-show-all');
    this.calendarRowElems = hostElem.querySelectorAll('.calendar__row-wrapper');

    new PerfectScrollbar(calendarContent, {
      wheelSpeed: 1,
      wheelPropagation: true,
      minScrollbarLength: 10
    });

    selectElems.forEach(select => {
      new Choices(select, {
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false,
      })
    })

    this.hideOldRowByTime();

    if (btnShowAll) {
      btnShowAll.onclick = () => {
        this.calendarRowElems.forEach(calendarRow => {
          calendarRow.classList.add('mod-show');
          btnShowAll.classList.add('mod-hide');
          btnShowAll.parentElement.classList.add('mod-hide');
          setTimeout(() => {
            btnShowAll.parentElement.parentElement.remove();
          }, 300)
        })
      }
    }
  }

  hideOldRowByTime() {
    const currentTimeMs = new Date().getTime();

    this.calendarRowElems.forEach(calendarRow => {
      if (calendarRow.getAttribute('data-time')) {
        const rowTimeMs = getDateByDateAttribute(calendarRow, 'data-time').getTime();

        if (rowTimeMs + MS_PER_HOUR >= currentTimeMs) {
          calendarRow.classList.add('mod-show');
        }
      } else {
        calendarRow.classList.add('mod-show');
      }
    })
  }
}
