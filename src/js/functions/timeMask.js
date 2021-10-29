import Inputmask from 'inputmask';

export default function timeMask() {
  const phoneInputs = Array.from(document.querySelectorAll('.js-time-input'));
  phoneInputs.forEach(input => {
    const instance = new Inputmask({ regex: `^([8-9]|1[0-8]):[0-5][0-9]|[0-0][0-0]$` });
    instance.mask(input);
  });
}
