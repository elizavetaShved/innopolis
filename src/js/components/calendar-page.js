import PerfectScrollbar from 'perfect-scrollbar';
import { CalendarTableComponent } from './calendar-table-component';

export class CalendarPage {
  hostElem;
  selectElems;

  constructor() {
    this.hostElem = document.querySelector('#calendar-host');
    if (!this.hostElem) return;

    const calendarContent = this.hostElem.querySelector('.js-content');
    const calendarTableElems = this.hostElem.querySelectorAll('.js-table');

    const btnOpenFilter = this.hostElem.querySelector('.js-filter-btn');
    const btnCloseFilter = this.hostElem.querySelector('.js-modal-filter-close');
    const modalFilter = document.querySelector('.js-modal-filter');

    new PerfectScrollbar(calendarContent, {
      wheelSpeed: 1,
      wheelPropagation: true,
      minScrollbarLength: 10
    });

    calendarTableElems.forEach(calendarElem => {
      new CalendarTableComponent(calendarElem, this.selectElems);
    })

    btnOpenFilter.onclick = () => {
      modalFilter.classList.add('mod-show');
    }

    btnCloseFilter.onclick = () => {
      modalFilter.classList.remove('mod-show');
    }
  }
}
