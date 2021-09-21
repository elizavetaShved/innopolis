import 'bootstrap-datepicker';
import 'bootstrap-datepicker/js/locales/bootstrap-datepicker.ru';

export class Datepicker {
  constructor(hostElem) {
    const datepickerContainerElems = hostElem.querySelectorAll('.gl__datepicker-container');
    const datepickerInputElems = hostElem.querySelectorAll('.gl__datepicker-input');

    datepickerInputElems.forEach((datepickerInput, index) => {
      let endDate;
      let startDate;
      const currentDate = new Date();

      switch (true) {
        case datepickerInput.hasAttribute('data-birth-18'):
          const maxPossibleYear = currentDate.getFullYear() - 18;
          const maxPossibleMouth = currentDate.getMonth();
          const maxPossibleDay = currentDate.getDate() - 1;
          endDate = new Date(maxPossibleYear, maxPossibleMouth, maxPossibleDay);
          break;

        case datepickerInput.hasAttribute('data-future-with-today'):
          startDate = currentDate;
          break;
      }

      $(datepickerInput)
        .datepicker({
          format: 'dd.mm.yyyy',
          container: datepickerContainerElems[index],
          language: 'ru',
          autoclose: true,
          endDate: endDate || null,
          startDate: startDate || null
        })
    })
  }
}
