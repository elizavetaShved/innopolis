import polyfills from './functions/polyfills';
import './functions/lazyload';
import detectTouch from './functions/detectTouch';
import customSelects from './functions/customSelects';

import { NewsComponent } from './components/news-component';
import { ProgramComponent } from './components/program-component';
import { SpeakersComponent } from './components/speakers-component';
import { oldInit } from './components/old';
import { OldCommon } from './components/old-common';
import { Header } from './components/header';
import { Faq } from './components/faq';
import { StickyMenu } from './components/sticky-menu';
import scrollByAnchor from './functions/scrollByAnchor';
import { NewsPage } from './news-page';

document.addEventListener('DOMContentLoaded', function () {
  switch (window.location.href.split('/')[3].split('.html')[0]) {
    case '':
      oldInit();
      new OldCommon();
      new Faq();
      new NewsComponent();
      new ProgramComponent();
      new SpeakersComponent();
      break;

    case 'news':
      new NewsPage();
      break;
  }

  switch (window.location.href.split('innopolis/build/')[1].split('.html')[0]) {
    case '':
      oldInit();
      new OldCommon();
      new Faq();
      new NewsComponent();
      new ProgramComponent();
      new SpeakersComponent();
      break;

    case 'news':
      new NewsPage();
      break;
  }

  new Header();
  new StickyMenu();

  polyfills();
  detectTouch();
  customSelects();
  scrollByAnchor();
});

window.addEventListener('load', function () {
  document.body.classList.add('loaded');
  setTimeout(() => document.body.classList.add('animatable'), 300)
})
