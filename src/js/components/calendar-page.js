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

    new PerfectScrollbar(calendarContent, {
      wheelSpeed: 1,
      wheelPropagation: true,
      minScrollbarLength: 10
    });

    new SelectInit(this.hostElem);

    calendarTableElems.forEach(calendarElem => {
      new CalendarTableComponent(calendarElem, this.selectElems);
    })
  }
}
