import getDateByDateAttribute from '../functions/getDateByDateAttribute';

const MS_PER_HOUR = 3600000;

export class CalendarTableComponent {
  hostElem;
  calendarRowElems;
  selectElems;
  calendarHeaderElems;
  calendarItemElems;

  constructor(hostElem, selectElems) {
    this.hostElem = hostElem;
    this.selectElems = selectElems;
    const btnShowAll = this.hostElem.querySelector('.calendar__btn-show-all');
    const btnShowAllContentElem = this.hostElem.querySelector('.calendar__btn-show-all-content');
    const btnShowAllTriangleElem = this.hostElem.querySelector('.calendar__btn-show-all-triangle');
    this.calendarRowElems = Array.from(this.hostElem.querySelectorAll('.calendar__row-wrapper'));
    this.calendarHeaderElems = Array.from(this.hostElem.querySelectorAll('.calendar__item-header:not(.mod-date)'));
    this.calendarItemElems = Array.from(this.hostElem.querySelectorAll('.calendar__item-content.mod-card'));

    this.hideOldRowByTime();

    let isShowAllCalendar = false;

    if (btnShowAll) {
      btnShowAll.onclick = () => {
        if (isShowAllCalendar) {
          btnShowAllContentElem.innerText = 'Вся программа';
          btnShowAllTriangleElem.classList.remove('mod-open');
          this.hideOldRowByTime();
        } else {
          this.calendarRowElems.map(calendarRow => calendarRow.classList.add('mod-show'));
          btnShowAllContentElem.innerText = 'Показать только предстоящую программу';
          btnShowAllTriangleElem.classList.add('mod-open');
        }

        isShowAllCalendar = !isShowAllCalendar;
      }
    }


    this.onListenFilter();
  }

  hideOldRowByTime() {
    this.calendarRowElems.map(elem => elem.classList.remove('mod-show'));

    const currentTimeMs = new Date().getTime();

    const showRow = (calendarRow) => {
      calendarRow.classList.add('mod-show');
    }

    // const hideRow = (calendarRow) => {
    //   const itemElems = calendarRow.querySelectorAll('.calendar__item-content.mod-card');
    //   itemElems.forEach(elem => {
    //     elem.classList.add('mod-hide');
    //   })
    // }

    this.calendarRowElems.forEach(calendarRow => {
      if (calendarRow.getAttribute('data-time')) {
        const rowTimeMs = getDateByDateAttribute(calendarRow, 'data-time').getTime();

        if (rowTimeMs + MS_PER_HOUR >= currentTimeMs) {
          showRow(calendarRow);
        } else {
          // hideRow(calendarRow);
        }
      } else {
        showRow(calendarRow);
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
    this.calendarRowElems.map(elem => elem.classList.remove('mod-show'));
    this.hideOldRowByTime();

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
        let activeColumn;
        this.calendarHeaderElems.forEach((calendarHeaderElem, indexHeaderElem) => {
          const calendarHeaderValueElem = calendarHeaderElem.querySelector('.calendar__item-header-value');
          if (calendarHeaderValueElem) {
            if (calendarHeaderValueElem.innerText.toLowerCase() === selectValue.toLowerCase()) {
              activeColumn = indexHeaderElem;
            }
          }
        })

        this.calendarRowElems.forEach(rowElem => {
          const itemContentForRowElems = Array.from(rowElem.querySelectorAll('.calendar__item-content.mod-card:not(.mod-head)'));
          if (itemContentForRowElems.length) {
            itemContentForRowElems.forEach((elem, i) => {

              if (i !== activeColumn) {
                elem.classList.add(`mod-hide-by-${ selectName }`)
              }
            });
          }
        })
      }

      // todo сделать убирание пустых элементов
      // this.hideOldRowByTime()
      // this.removeRowsWithoutContent();
      // this.removeColumnWithoutContent();

    } else {
      this.calendarItemElems.map(elem => elem.classList.remove(`mod-hide-by-${ selectName }`));
      this.calendarHeaderElems.map(elem => elem.classList.remove(`mod-hide-by-${ selectName }`));

      // this.removeRowsWithoutContent();
      // this.removeColumnWithoutContent();
    }
  }

  removeRowsWithoutContent() {
    const showCalendarRowElems = this.calendarRowElems.filter(elem => elem.className.includes('mod-show') && !elem.className.includes('mod-head'));

    showCalendarRowElems.forEach(rowElem => {
      const itemContentForRowElems = rowElem.querySelectorAll('.calendar__item-content.mod-card:not(.mod-empty)');
      let rowIsShow = false;
      itemContentForRowElems.forEach(elem => {
        if (!elem.className.includes('mod-hide')) {
          rowIsShow = true;
        }
      });

      if (!rowIsShow) {
        rowElem.classList.remove('mod-show');

        const contentEmptyItems = Array.from(this.hostElem.querySelectorAll('.calendar__item-content.mod-card.mod-empty'));
        contentEmptyItems.map(elem => elem.classList.add('mod-hide'));
      } else {
        rowElem.classList.add('mod-show');
      }
    })
  }

  removeColumnWithoutContent() {
    this.calendarHeaderElems.map(elem => elem.classList.remove('mod-show'));

    const showCalendarRowElems = this.calendarRowElems.filter(elem => elem.className.includes('mod-show'));

    this.calendarHeaderElems.forEach((headerElem, index) => {
      const columnIsContent = showCalendarRowElems.some(rowElem => {
        const contentItems = Array.from(rowElem.querySelectorAll('.calendar__item-content.mod-card'));
        if (contentItems.length && contentItems[index]) {
          return !contentItems[index].className.includes('mod-hide');
        } else {
          return false;
        }
      });

      if (!columnIsContent) {
        this.calendarHeaderElems[index].classList.add('mod-hide');
        showCalendarRowElems.forEach(rowElem => {
          const contentItems = Array.from(rowElem.querySelectorAll('.calendar__item-content.mod-card'));
          if (contentItems.length && contentItems[index]) {
            contentItems[index].classList.add('mod-hide');
          }
        })


        const contentEmptyItems = Array.from(this.hostElem.querySelectorAll('.calendar__item-content.mod-card.mod-empty'));
        contentEmptyItems.map(elem => elem.classList.add('mod-hide'));
      }
    })
  }
}
