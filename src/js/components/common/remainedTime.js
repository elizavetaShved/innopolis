export const MS_PER_DAY = 86400000;
export const MS_PER_HOUR = 3600000;
export const MS_PER_MINUTES = 60000;

export class RemainedTime {
  dateRemainedElems;
  remainedDaysElem;
  remainedHoursElem;
  remainedMinutesElem;

  constructor() {
    this.dateRemainedElems = document.querySelectorAll('.js-date-remained');
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
      const endDateAttribute = elem.getAttribute('data-end-time').split('/'); // [2021, 10, 01]

      const endDateYearStr = endDateAttribute[0];
      const endDateMothStr = endDateAttribute[1] - 1;
      const endDateDayStr = endDateAttribute[2];
      const endDateHoursStr = endDateAttribute[3];
      const endDateMinutesStr = endDateAttribute[4];
      const endDateSecondsStr = endDateAttribute[5];

      const endDateMs = new Date(
        +endDateYearStr,
        +endDateMothStr,
        +endDateDayStr,
        +endDateHoursStr | null,
        +endDateMinutesStr | null,
        +endDateSecondsStr | null
      );

      const remainedMs = endDateMs - currentDateMs;

      const remainedDays = parseInt(remainedMs / MS_PER_DAY);
      const remainedHours = parseInt((remainedMs - remainedDays * MS_PER_DAY) / MS_PER_HOUR);
      const remainedMinutes = parseInt((remainedMs - remainedDays * MS_PER_DAY - remainedHours * MS_PER_HOUR) / MS_PER_MINUTES);

      this.remainedDaysElem.innerText = remainedDays < 10 ? `0${ remainedDays }` : remainedDays;
      this.remainedHoursElem.innerText = remainedHours < 10 ? `0${ remainedHours }` : remainedHours;
      this.remainedMinutesElem.innerText = remainedMinutes < 10 ? `0${ remainedMinutes }` : remainedMinutes;
    });
  }
}
