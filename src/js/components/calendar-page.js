import PerfectScrollbar from 'perfect-scrollbar';

export class CalendarPage {

  constructor() {
    const hostElem = document.querySelector('#calendar-host');
    const calendarContent = hostElem.querySelector('.calendar__content');

    const ps = new PerfectScrollbar(calendarContent, {
      wheelSpeed: 1,
      wheelPropagation: true,
      minScrollbarLength: 10
    });
  }
}
