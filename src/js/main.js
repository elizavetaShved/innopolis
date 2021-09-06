import polyfills from './polyfills';
import './lazyload';
import detectTouch from './detectTouch';
import customSelects from './customSelects';

import { newsComponent } from './components/news-component';
import { programComponent } from './components/program-component';
import { speakersComponent } from './components/speakers-component';
import { oldInit } from './components/old';

document.addEventListener('DOMContentLoaded', function () {
  switch (window.location.href.split('/')[1]) {
    case '':
      oldInit();
      new newsComponent();
      new programComponent();
      new speakersComponent();
      break;
  }

  polyfills();
  detectTouch();
  customSelects();
});

window.addEventListener('load', function () {
  document.body.classList.add('loaded');
  setTimeout(() => document.body.classList.add('animatable'), 300)
})
