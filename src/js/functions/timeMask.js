import Inputmask from 'inputmask';

export default function timeMask() {
  const phoneInputs = Array.from(document.querySelectorAll('.js-time-input'));
  phoneInputs.forEach(input => {
    const instance = new Inputmask({ regex: `^(([0,1][0-9])|(2[0-3])):[0-5][0-9]$` });
    instance.mask(input);
  });
}
