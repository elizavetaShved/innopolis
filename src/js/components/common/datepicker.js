import 'bootstrap-datepicker';
import 'bootstrap-datepicker/js/locales/bootstrap-datepicker.ru';

export class Datepicker {
  constructor(hostElem) {
    const datepickerContainerElems = hostElem.querySelectorAll('.gl__datepicker-container');
    const datepickerInputElems = hostElem.querySelectorAll('.gl__datepicker-input');

    datepickerInputElems.forEach(datepickerInput => {
      $(datepickerInput)
        .datepicker({
          format: 'dd.mm.yyyy',
          container: datepickerContainerElems,
          language: 'ru',
          autoclose: true,
          endDate: new Date()
        })
      // .on('show', () => {
      //   datepicker.classList.add('commonDatepicker-shown')
      // })
      // .on('hide', () => {
      // datepicker.classList.remove('commonDatepicker-shown')
      // });
    })
  }
}
