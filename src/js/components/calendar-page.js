import PerfectScrollbar from 'perfect-scrollbar';
import Choices from 'choices.js';
import getDateByDateAttribute from '../functions/getDateByDateAttribute';

const MS_PER_HOUR = 3600000;

export class CalendarPage {
  hostElem;
  calendarRowElems;
  selectElems;
  calendarItemElems;
  calendarHeaderElems;

  constructor() {
    this.hostElem = document.querySelector('#calendar-host');
    const calendarContent = this.hostElem.querySelector('.calendar__content');
    const selectElems = this.hostElem.querySelectorAll('.gl__select');
    const btnShowAll = this.hostElem.querySelector('.calendar__btn-show-all');
    this.calendarRowElems = this.hostElem.querySelectorAll('.calendar__row-wrapper');
    this.selectElems = this.hostElem.querySelectorAll('.gl__select');
    this.calendarItemElems = Array.from(this.hostElem.querySelectorAll('.calendar__item-content'));
    this.calendarHeaderElems = Array.from(this.hostElem.querySelectorAll('.calendar__item-header'));

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

    this.hideOldRowByTime();

    if (btnShowAll) {
      btnShowAll.onclick = () => {
        this.calendarRowElems.forEach(calendarRow => {
          calendarRow.classList.add('mod-show');
          btnShowAll.classList.add('mod-hide');
          btnShowAll.parentElement.classList.add('mod-hide');
          setTimeout(() => {
            btnShowAll.parentElement.parentElement.remove();
          }, 300)
        })
      }
    }


    this.onListenFilter();
  }

  hideOldRowByTime() {
    const currentTimeMs = new Date().getTime();

    this.calendarRowElems.forEach(calendarRow => {
      if (calendarRow.getAttribute('data-time')) {
        const rowTimeMs = getDateByDateAttribute(calendarRow, 'data-time').getTime();

        if (rowTimeMs + MS_PER_HOUR >= currentTimeMs) {
          calendarRow.classList.add('mod-show');
        }
      } else {
        calendarRow.classList.add('mod-show');
      }
    })
  }

  onListenFilter() {
    this.selectElems.forEach(select => {
      if (select.name !== 'commonDates') {
        select.onchange = () => {
          switch (select.name) {
            case 'topics':
              this.onFilter(select.value, 'topics', 'Тема', '.calendar__item-content-mark');
              break;

            case 'auditoriums':
              this.onFilter(select.value, 'auditoriums', 'Аудитория');
              break;

            case 'speakers':
              this.onFilter(select.value, 'speakers', 'Спикер', '.calendar__item-content-title');
              break;

          }
        }
      }
    })
  }

  onFilter(selectValue, selectName, selectTitle, elemForFilterStr) {
    if (selectValue !== selectTitle) {
      this.calendarItemElems.map(elem => elem.classList.remove(`mod-hide-by-${ selectName }`));
      if (elemForFilterStr) {
        this.calendarItemElems.forEach(calendarElem => {
          const elemForFilter = calendarElem.querySelectorAll(elemForFilterStr);
          elemForFilter.forEach(topic => {
            if (topic.innerText.toLowerCase() !== selectValue.toLowerCase()) {
              calendarElem.classList.add(`mod-hide-by-${ selectName }`);
            }
          })
        })
      } else if (selectName === 'auditoriums') {
        this.calendarHeaderElems.map(elem => elem.classList.remove(`mod-hide-by-${ selectName }`));
        let activeColumn;
        this.calendarHeaderElems.forEach((calendarHeaderElem, indexHeaderElem) => {
          const calendarHeaderValueElem = calendarHeaderElem.querySelector('.calendar__item-header-value');
          if (calendarHeaderValueElem) {
            if (calendarHeaderValueElem.innerText.toLowerCase() !== selectValue.toLowerCase()) {
              calendarHeaderElem.classList.add(`mod-hide-by-${ selectName }`);
            } else {
              activeColumn = indexHeaderElem;
            }
          }
        })

        this.calendarRowElems.forEach(rowElem => {
          const itemContentForRowElems = Array.from(rowElem.querySelectorAll('.calendar__item-content'));
          if (itemContentForRowElems.length) {
            itemContentForRowElems.forEach((elem, i) => {

              if (i !== activeColumn && !elem.className.includes('mod-full') && !elem.className.includes('mod-head')) {
                elem.classList.add(`mod-hide-by-${ selectName }`)
              }
            });
          }
        })
      }
    } else {
      this.calendarItemElems.map(elem => elem.classList.remove(`mod-hide-by-${ selectName }`));
      this.calendarHeaderElems.map(elem => elem.classList.remove(`mod-hide-by-${ selectName }`));
    }
  }
}
