export class speakersComponent {

  constructor() {
    const hostElem = document.getElementById('speakers-host');
    if (!hostElem) return;

    const itemWrapper = hostElem.querySelectorAll('.speakers__message-container');
    const btnShowMore = hostElem.querySelector('.speakers__btn-show-more');

    itemWrapper.forEach(elem => {
      elem.onmouseover = () => {
        itemWrapper.forEach(e => e.parentElement.parentElement.classList.remove('mod-hover'));
        elem.parentElement.parentElement.classList.add('mod-hover');
      }
    });

    btnShowMore.onclick = () => {
      console.log('показать еще 20')
    }
  }
}
