import getDateByDateAttribute from '../../functions/getDateByDateAttribute';
import { MS_PER_DAY, MS_PER_HOUR, MS_PER_MINUTES } from '../../utils/consts';

export class RemainedTime {
  dateRemainedElems;
  remainedDaysElem;
  remainedHoursElem;
  remainedMinutesElem;

  constructor() {
    this.dateRemainedElems = document.querySelectorAll('.js-date-remained');
    if (!this.dateRemainedElems) return;

    this.dateRemainedElems.forEach(dateRemainedElem => {
      this.remainedDaysElem = dateRemainedElem.querySelector('.tickets-block__day');
      this.remainedHoursElem = dateRemainedElem.querySelector('.tickets-block__hours');
      this.remainedMinutesElem = dateRemainedElem.querySelector('.tickets-block__minutes');

      this.setRemainedDate();

      setInterval(() => {
        this.setRemainedDate();
      }, 1000)
    })
  }

  setRemainedDate() {
    const currentDateMs = new Date().getTime();

    this.dateRemainedElems.forEach(elem => {
      const endDateMs = getDateByDateAttribute(elem, 'data-end-time');

      const remainedMs = endDateMs - currentDateMs;

      const remainedDays = parseInt(remainedMs / MS_PER_DAY);
      const remainedHours = parseInt((remainedMs - remainedDays * MS_PER_DAY) / MS_PER_HOUR);
      const remainedMinutes = parseInt((remainedMs - remainedDays * MS_PER_DAY - remainedHours * MS_PER_HOUR) / MS_PER_MINUTES);

      if (remainedDays <= 0) {
        this.remainedDaysElem.innerText = '0';
      } else {
        this.remainedDaysElem.innerText = remainedDays < 10 ? `0${ remainedDays }` : remainedDays;
      }

      if (remainedHours <= 0) {
        this.remainedHoursElem.innerText = '0';
      } else {
        this.remainedHoursElem.innerText = remainedHours < 10 ? `0${ remainedHours }` : remainedHours;
      }

      if (remainedMinutes <= 0) {
        this.remainedMinutesElem.innerText = '0';
      } else {
        this.remainedMinutesElem.innerText = remainedMinutes < 10 ? `0${ remainedMinutes }` : remainedMinutes;
      }
    });
  }
}
