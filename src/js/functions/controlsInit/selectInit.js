import Choices from 'choices.js';

export default function selectInit() {
  const selectElems = document.querySelectorAll('.js-select');

  selectElems.forEach(selectElem => {
    const choicesInstance = new Choices(selectElem, {
      searchEnabled: false,
      itemSelectText: '',
      shouldSort: false,
    })

    const onChoiceSelected = () => {
      $(choicesInstance.passedElement.element).parsley().validate();
    }

    choicesInstance.passedElement.element.addEventListener('addItem', onChoiceSelected, false);
  })
}
