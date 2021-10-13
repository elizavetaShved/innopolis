// добавить классы:
// gl__drop-menu-btn и js-drop-menu-btn - на кнопку открытия
// gl__drop-menu-btn-content и js-drop-menu-btn-content - на 2 варинта контента (1 при скрытом меню, 2 - при открытом)
// js-drop-menu-leave-open - на кнопку открытия, если НЕ нужно автозарываение неактивных
// gl__drop-menu-container и js-drop-menu-container - обернуть меню в этот класс (для max-height = 0)
// gl__drop-menu и js-drop-menu - на само меню
// gl__drop-menu-icon- на иконку стрелки

export default function initDropDownMenu() {
  const linksTitleElements = Array.from(document.querySelectorAll('.js-drop-menu-btn'));
  const menuContainerElements = Array.from(document.querySelectorAll('.js-drop-menu-container'));
  const menuElements = Array.from(document.querySelectorAll('.js-drop-menu'));

  const onClose = (btnElem, menuContainerElem) => {
    btnElem.classList.remove('mod-open');
    const btnContent = btnElem.querySelectorAll('.js-drop-menu-btn-content');
    btnContent[0].classList.add('mod-show');
    btnContent[1].classList.remove('mod-show');
    menuContainerElem.classList.remove('mod-open');
    menuContainerElem.style.maxHeight = 0;
  }

  const onOpen = (btnElem, menuContainerElem, menuElem) => {
    btnElem.classList.add('mod-open');

    const btnContent = btnElem.querySelectorAll('.js-drop-menu-btn-content');
    btnContent[0].classList.remove('mod-show');
    btnContent[1].classList.add('mod-show');
    menuContainerElem.classList.add('mod-open');
    const heightContent = menuElem.clientHeight;
    menuContainerElem.style.maxHeight = `${ heightContent }px`;
  }

  linksTitleElements.forEach((btn, i) => {
    btn.onclick = () => {
      if (btn.className.includes('mod-open')) {
        onClose(btn, menuContainerElements[i]);
      } else {
        if (!btn.className.includes('js-drop-menu-leave-open')) {
          linksTitleElements.map((elem, idx) => {
            onClose(elem, menuContainerElements[idx]);
          });
        }
        onOpen(btn, menuContainerElements[i], menuElements[i]);
      }
    }
  })
}
