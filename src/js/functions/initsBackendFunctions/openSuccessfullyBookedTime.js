import { Modal } from '../../components/common/modal';

export function openSuccessfullyBookedTime() {
  const modal = new Modal('thanks', true, true);
  modal.isOpen();
  const thanksTime = modal.hostElem.querySelector('.js-thanks-time');
  thanksTime.innerHTML = `${ window.calendarDateText }${ window.calendarAuditoriumText }<br>
          ${ window.calendarTimeText.getAttribute('data-times') }`;
}
