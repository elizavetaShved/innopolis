const modal = document.querySelector('#modal-payment-participation-host');
const modalMainContent = modal.querySelector('.js-main-content');
const modalNatural = modal.querySelector('.js-natural-person-content');
const modalLegal = modal.hostElem.querySelector('.js-legal-person-content');

const openNaturalPerson = () => {
  modalMainContent.classList.add('mod-hide');
  modalNatural.classList.remove('mod-hide');
}

const openLegalPerson = () => {
  modalMainContent.classList.add('mod-hide');
  modalLegal.classList.remove('mod-hide');
}
