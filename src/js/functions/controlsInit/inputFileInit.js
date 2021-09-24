import { BYTES_IN_KILOBYTES, BYTES_IN_MEGABYTES } from '../../utils/consts';

export default function inputFileInit() {
  const inputFileElems = document.querySelectorAll('.js-input-file');
  const inputContentElems = document.querySelectorAll('.js-input-file-content');

  inputFileElems.forEach((inputFile, index) => {
    inputFile.onchange = () => {
      const file = inputFile.files[0];
      const fileSizeB = file.size;
      const fileSizeMb = fileSizeB / BYTES_IN_MEGABYTES;
      const fileSizeKb = fileSizeB / BYTES_IN_KILOBYTES;
      if (fileSizeMb <= 2) {
        switch (true) {
          case fileSizeMb >=1:
            inputContentElems[index].innerText = `${ file.name } (${ fileSizeMb }Mb)`;
            break;

          case fileSizeKb >= 1:
            inputContentElems[index].innerText = `${ file.name } (${ fileSizeKb }Kb)`;
            break;

          default:
            inputContentElems[index].innerText = `${ file.name } (${ fileSizeB }B)`;
        }
      } else {
        console.log('слишком тяжелый файл')
      }
    }
  })
}
