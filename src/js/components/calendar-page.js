import PerfectScrollbar from 'perfect-scrollbar';
import Choices from 'choices.js';

export class CalendarPage {

  constructor() {
    const hostElem = document.querySelector('#calendar-host');
    const calendarContent = hostElem.querySelector('.calendar__content');
    const selectElems = hostElem.querySelectorAll('.gl__select');

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
  }
}
