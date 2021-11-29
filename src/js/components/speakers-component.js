import { ShowMoreItem } from './common/showMoreItem';

export class SpeakersComponent {

  constructor() {
    const hostElem = document.getElementById('speakers-host');
    if (!hostElem) return;

    const itemWrapper = hostElem.querySelectorAll('.speakers__message-container');
    const imageElem = hostElem.querySelectorAll('.speakers__item-image-wrapper');
    const btnShowMore = hostElem.querySelector('.speakers__btn-show-more.speakers__btn-show-more--btn');
    const linkRollUp = hostElem.querySelector('.speakers__btn-show-more.speakers__btn-show-more--link');
    const itemList = Array.from(hostElem.querySelectorAll('.speakers__item'));

    new ShowMoreItem(null, btnShowMore, linkRollUp, itemList, 10, 8,true);

    // появление облака
    itemWrapper.forEach((elem, i) => {
      elem.onmouseover = () => {
        itemWrapper.forEach(e => e.parentElement.parentElement.classList.remove('mod-hover'));
        elem.parentElement.parentElement.classList.add('mod-hover');
        imageElem[i].classList.add('mod-hover');
      }

      elem.onmouseout = () => {
        imageElem[i].classList.remove('mod-hover');
      }
    });
  }
}
