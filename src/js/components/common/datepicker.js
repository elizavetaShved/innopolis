import 'bootstrap-datepicker';
import 'bootstrap-datepicker/js/locales/bootstrap-datepicker.ru';

export class Datepicker {
  constructor(hostElem) {
    const datepickerContainerElems = hostElem.querySelectorAll('.gl__datepicker-container');
    const datepickerBtnOpenElems = hostElem.querySelectorAll('.gl__input-icon');

    datepickerBtnOpenElems.forEach((datepickerBtn, index) => {
      let endDate;
      let startDate;
      const currentDate = new Date();

      switch (true) {
        case datepickerBtn.hasAttribute('data-birth-18'):
          const maxPossibleYear = currentDate.getFullYear() - 18;
          const maxPossibleMouth = currentDate.getMonth();
          const maxPossibleDay = currentDate.getDate() - 1;
          endDate = new Date(maxPossibleYear, maxPossibleMouth, maxPossibleDay);
          break;

        case datepickerBtn.hasAttribute('data-future-with-today'):
          startDate = currentDate;
          break;
      }

      $(datepickerBtn)
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
