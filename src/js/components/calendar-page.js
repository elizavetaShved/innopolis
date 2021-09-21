import PerfectScrollbar from 'perfect-scrollbar';
import { CalendarTableComponent } from './calendar-table-component';
import { SelectInit } from './common/selectInit';


export class CalendarPage {
  hostElem;
  selectElems;

  constructor() {
    this.hostElem = document.querySelector('#calendar-host');
    const calendarContent = this.hostElem.querySelector('.calendar__content');
    const calendarTableElems = this.hostElem.querySelectorAll('.calendar__table');

    const btnOpenFilter = this.hostElem.querySelector('.calendar__filter-btn');
    const btnCloseFilter = this.hostElem.querySelector('.calendar__modal-filter-close');
    const modalFilter = document.querySelector('.calendar__modal-filter');

    new PerfectScrollbar(calendarContent, {
      wheelSpeed: 1,
      wheelPropagation: true,
      minScrollbarLength: 10
    });

    new SelectInit(this.hostElem);

    calendarTableElems.forEach(calendarElem => {
      new CalendarTableComponent(calendarElem, this.selectElems);
    })

    btnOpenFilter.onclick = () => {
      modalFilter.classList.add('mod-show')
    }

    btnCloseFilter.onclick = () => {
      modalFilter.classList.remove('mod-show')
    }
  }
}
