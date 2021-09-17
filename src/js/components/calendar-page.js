import PerfectScrollbar from 'perfect-scrollbar';
import Choices from 'choices.js';
import { CalendarTableComponent } from './calendar-table-component';


export class CalendarPage {
  hostElem;
  selectElems;

  constructor() {
    this.hostElem = document.querySelector('#calendar-host');
    const calendarContent = this.hostElem.querySelector('.calendar__content');
    const calendarTableElems = this.hostElem.querySelectorAll('.calendar__table');
    this.selectElems = this.hostElem.querySelectorAll('.gl__select');

    new PerfectScrollbar(calendarContent, {
      wheelSpeed: 1,
      wheelPropagation: true,
      minScrollbarLength: 10
    });

    this.selectElems.forEach(select => {
      new Choices(select, {
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false,
      })
    })

    calendarTableElems.forEach(calendarElem => {
      new CalendarTableComponent(calendarElem, this.selectElems);
    })
  }
}
