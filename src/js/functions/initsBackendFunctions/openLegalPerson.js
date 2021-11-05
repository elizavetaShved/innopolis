export default function openLegalPerson() {
  const modal = document.querySelector('#modal-payment-participation-host');
  const modalMainContent = modal.querySelector('.js-main-content');
  const modalNatural = modal.querySelector('.js-natural-person-content');

  modalMainContent.classList.add('mod-hide');
  modalNatural.classList.remove('mod-hide');
}
