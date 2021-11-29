import { ShowMoreItem } from './common/showMoreItem';

export class ProgramComponent {
  contentBlockElems;
  contentElems;
  form;
  indexCurrentContent = 0;

  constructor() {
    const hostElem = document.getElementById('program-host');
    if (!hostElem) return;
    const btsOpenDescription = hostElem.querySelectorAll('.program__content-info-btn-show');
    const descriptionElems = hostElem.querySelectorAll('.program__content-info-list');

    const radioDateElems = hostElem.querySelectorAll('.program__navigate-radio');
    this.contentBlockElems = hostElem.querySelectorAll('.program__bottom-block-wrapper');

    const checkboxFilterElems = hostElem.querySelectorAll('.program__filter-checkbox');

    this.form = hostElem.querySelector('#program-form');

    this.contentBlockElems.forEach(blockElem => {
      const btnShowMore = blockElem.querySelector('.js-btn-more');
      const linkRollUp = blockElem.querySelector('.js-btn-hide');
      const itemList = Array.from(blockElem.querySelectorAll('.program__content-item'));
      new ShowMoreItem(blockElem, btnShowMore, linkRollUp, itemList, 10, 5);
    })

    btsOpenDescription.forEach((btn, index) => {
      btn.onclick = () => {
        descriptionElems.forEach((descriptionElem, i) => {
          if (i === index && !descriptionElem.className.includes('mod-show')) {
            btn.innerText = 'Скрыть описание';
            descriptionElem.classList.add('mod-show');
          } else {
            descriptionElem.classList.remove('mod-show');
            btn.innerText = 'Подробнее';
          }
        })
      }
    })

    radioDateElems.forEach((radio, index) => {
      if (radio.checked) {
        this.setActiveContentBlock(index);
      }

      radio.onchange = () => {
        this.setActiveContentBlock(index);
      }
    })

    checkboxFilterElems.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.onFilterContent();
      })
    })
  }

  setActiveContentBlock(index) {
    this.indexCurrentContent = index;

    this.contentBlockElems.forEach((contentBlock, i) => {
      if (i === index) {
        contentBlock.classList.add('mod-show');
      } else {
        contentBlock.classList.remove('mod-show');
      }
    })

    this.onFilterContent();
  }

  onFilterContent() {
    const checkedNames = [...this.form['program-filter']].filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

    this.contentBlockElems.forEach(contentBlockItem => {
      this.contentElems = contentBlockItem.querySelectorAll('.program__content-item');

      let lastElem;
      if (checkedNames.length) {
        this.contentElems.forEach(elem => {
          let isShowElem = false;
          checkedNames.forEach(checkedName => {
            if (elem.className.includes(checkedName)) {
              isShowElem = true;
            }
          })

          if (isShowElem) {
            elem.classList.remove('mod-hide-by-filter');
            lastElem = elem;
          } else {
            elem.classList.add('mod-hide-by-filter');
          }

          elem.classList.remove('last-of-type');
        });
      } else {
        this.contentElems.forEach(elem => {
          elem.classList.remove('mod-hide-by-filter');
          lastElem = elem;
        })
      }

      const showItemsArr = Array.from(this.contentElems).filter(item => !item.className.includes('mod-hide-by-filter'));
      if (showItemsArr[showItemsArr.length - 1]) {
        showItemsArr[showItemsArr.length - 1].classList.add('last-of-type');
      }
    })
  }
}
