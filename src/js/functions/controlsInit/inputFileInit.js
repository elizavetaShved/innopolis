import { BYTES_IN_KILOBYTES, BYTES_IN_MEGABYTES } from '../../utils/consts';

export default function inputFileInit() {
  const inputFileElems = document.querySelectorAll('.js-input-file');
  const inputContentElems = document.querySelectorAll('.js-input-file-content');
  const inputWrapperElems = document.querySelectorAll('.gl__input-wrapper.mod-file');
  const btnClearFile = document.querySelectorAll('.js-btn-clear-file');

  const addStyleFilledFile = (file, index) => {
    const fileSizeB = file.size;
    const fileSizeMb = fileSizeB / BYTES_IN_MEGABYTES;
    const fileSizeKb = fileSizeB / BYTES_IN_KILOBYTES;

    inputWrapperElems[index].classList.add('mod-filled');

    switch (true) {
      case fileSizeMb >= 1:
        inputContentElems[index].innerText = `${ file.name } (${ fileSizeMb }Mb)`;
        break;

      case fileSizeKb >= 1:
        inputContentElems[index].innerText = `${ file.name } (${ fileSizeKb }Kb)`;
        break;

      default:
        inputContentElems[index].innerText = `${ file.name } (${ fileSizeB }B)`;
    }
  }

  inputFileElems.forEach((inputFile, index) => {
    const file = inputFile.files[0];
    if (file) {
      addStyleFilledFile(file, index);
    }

    inputFile.onchange = () => {
      const file = inputFile.files[0];
      const fileSizeB = file.size;
      const fileSizeMb = fileSizeB / BYTES_IN_MEGABYTES;
      if (fileSizeMb <= 2) {
        addStyleFilledFile(file, index);
      } else {
        console.log('слишком тяжелый файл')
      }
    }

    btnClearFile[index].onclick = () => {
      inputFile.value = null;
      inputWrapperElems[index].classList.remove('mod-filled');
      inputContentElems[index].innerText = 'PDF файл, не более 2 мб';
    }
  })
}
