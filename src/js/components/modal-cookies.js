export class ModalCookies {
  constructor() {
    const hostElem = document.querySelector('#modal-cookies-host');
    if (!hostElem) return;

    const btn = hostElem.querySelector('#modal-cookies-btn');

    btn.onclick = () => {
      hostElem.classList.remove('mod-show');
    }
  }
}
