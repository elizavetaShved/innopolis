import { checkExistParent } from '../functions/checkExistParent';
import { MobileBox } from './mobile-box';
import { Modal } from './common/modal';

export const LANG_ARR = [
  {
    name: 'ru',
    value: 'РУС'
  },
  {
    name: 'en',
    value: 'ENG'
  }
];

export class Header {
  selectWrapperElem;
  isOpenSelect = false;
  selectedSelectElem;
  optionSelectElems;

  constructor() {
    const hostElem = document.querySelector('#header-host');
    const btnBurger = hostElem.querySelector('.header__burger-btn');
    const body = document.querySelector('body');
    this.selectWrapperElem = hostElem.querySelector('.header__lang-select-wrapper');
    const selectedItemElem = hostElem.querySelector('.header__lang-selected-item');
    const btnAuthElems = hostElem.querySelectorAll('.header__auth-btn');
    const modalAuthElem = document.querySelector('#modal-auth-host');

    this.selectedSelectElem = hostElem.querySelector('.header__lang-select');
    this.optionSelectElems = hostElem.querySelectorAll('.header__lang-option-item');

    let isOpen = false;

    const mobileBox1 = new MobileBox(isOpen, btnBurger);

    if (document.location.href.split('?')[1] && document.location.href.split('?')[1].includes('lang=')) {
      const currentLangName = document.location.href.split('lang=');
      const indexCurrentLang = LANG_ARR.findIndex(langModel => currentLangName.includes(langModel.name));
      this.setLang(indexCurrentLang);
    } else {
      this.setLang(0);
    }

    btnBurger.onclick = () => {
      if (!isOpen) {
        mobileBox1.isOpenMobileBox();
        btnBurger.classList.add('mod-open');
        body.classList.add('mod-no-scroll');
        setTimeout(() => {
          isOpen = !isOpen;
        })
      }
    }

    hostElem.onclick = () => {
      if (isOpen) {
        mobileBox1.isCloseMobileBox();
        btnBurger.classList.remove('mod-open');
        body.classList.remove('mod-no-scroll');
        setTimeout(() => {
          isOpen = !isOpen;
        })
      }
    }

    selectedItemElem.onclick = () => {
      this.toggleSelect();
    }

    btnAuthElems.forEach(btn => {
      btn.onclick = () => {
        const modal = new Modal('auth');
        modal.isOpen();
      }
    })

    document.addEventListener('click', e => {
      if (this.isOpenSelect && !checkExistParent(e.target, this.selectWrapperElem)) {
        this.toggleSelect();
      }
    })

    this.optionSelectElems.forEach(optionElem => {
      optionElem.onclick = () => {
        const indexCurrentLang = LANG_ARR.findIndex(langModel => langModel.value === optionElem.innerText);
        this.setLang(indexCurrentLang);
        this.toggleSelect();
        const langUrlParam = document.location.href.split('lang=')[1];
        if (langUrlParam) {
          const nameParam = langUrlParam.split('/')[0] || langUrlParam;
          document.location.href = document.location.href.replace(`lang=${ nameParam }`, `lang=${ LANG_ARR[indexCurrentLang].name }`)
        } else {
          document.location.href += `?lang=${ LANG_ARR[indexCurrentLang].name }`;
        }
      }
    })
  }

  toggleSelect() {
    if (this.isOpenSelect) {
      this.selectWrapperElem.classList.remove('mod-show');
    } else {
      this.selectWrapperElem.classList.add('mod-show');
    }

    this.isOpenSelect = !this.isOpenSelect;
  }

  setLang(indexLang) {
    this.selectedSelectElem.innerText = LANG_ARR[indexLang].value;

    const newLangArr = LANG_ARR.filter((e, i) => i !== indexLang)
    this.optionSelectElems.forEach((elem, i) => {
      elem.innerText = newLangArr[i].value;
    })
  }
}
