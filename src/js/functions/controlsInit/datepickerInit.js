import 'bootstrap-datepicker';
import 'bootstrap-datepicker/js/locales/bootstrap-datepicker.ru';

export default function datepickerInit() {
  const datepickerContainerElems = document.querySelectorAll('.js-datepicker-container');
  const datepickerInputElems = document.querySelectorAll('.js-input');

  datepickerContainerElems.forEach((datepickerContainerElem, index) => {
    let endDate;
    let startDate;
    const currentDate = new Date();

    switch (true) {
      case datepickerInputElems[index].hasAttribute('data-birth-18'):
        const maxPossibleYear = currentDate.getFullYear() - 18;
        const maxPossibleMouth = currentDate.getMonth();
        const maxPossibleDay = currentDate.getDate() - 1;
        endDate = new Date(maxPossibleYear, maxPossibleMouth, maxPossibleDay);
        break;

      case datepickerInputElems[index].hasAttribute('data-future-with-today'):
        startDate = currentDate;
        break;
    }

    $(datepickerInputElems[index])
      .datepicker({
        format: 'dd.mm.yyyy',
        container: datepickerContainerElem,
        language: 'ru',
        autoclose: true,
        endDate: endDate || null,
        startDate: startDate || null
      })

    datepickerInputElems[index].oninput = () => {
      $(datepickerInputElems[index]).datepicker('hide');
    }
  })
}
