import Inputmask from 'inputmask';

export default function dateMask() {
  const phoneInputs = Array.from(document.querySelectorAll('.js-date-input'));
  phoneInputs.forEach(input => {
    const instance = new Inputmask({ mask: '99.99.9999' });
    instance.mask(input);
  });
}
