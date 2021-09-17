import polyfills from './functions/polyfills';
import './functions/lazyload';
import detectTouch from './functions/detectTouch';
import customSelects from './functions/customSelects';

import { NewsComponent } from './components/news-component';
import { ProgramComponent } from './components/program-component';
import { SpeakersComponent } from './components/speakers-component';
import { OldCommon } from './components/old-common';
import { Header } from './components/header';
import { FaqComponent } from './components/faq-component';
import { StickyMenu } from './components/sticky-menu';
import scrollByAnchor from './functions/scrollByAnchor';
import { NewsPage } from './components/news-page';
import { MapComponent } from './components/map-component';
import { RemainedTime } from './components/common/remainedTime';
import { CalendarPage } from './components/calendar-page';
import { AccountPage } from './components/account-page';

document.addEventListener('DOMContentLoaded', function () {
  // todo для GH-page (оставить только else)
  if (window.location.href.split('innopolis/build/')[1] !== undefined) {
    switch (window.location.href.split('innopolis/build/')[1].split('.html')[0].split('#')[0]) {
      case '':
        new OldCommon();
        new MapComponent();
        new FaqComponent();
        new NewsComponent();
        new ProgramComponent();
        new SpeakersComponent();
        new RemainedTime();
        break;

      case 'news':
        new NewsPage();
        break;

      case 'calendar':
        new CalendarPage();
        break;

      case 'account':
        new AccountPage();
        break;
    }
  } else {
    switch (window.location.href.split('/')[3].split('.html')[0].split('#')[0]) {
      case '':
        new OldCommon();
        new MapComponent();
        new FaqComponent();
        new NewsComponent();
        new ProgramComponent();
        new SpeakersComponent();
        new RemainedTime();
        break;

      case 'news':
        new NewsPage();
        break;

      case 'calendar':
        new CalendarPage();
        break;

      case 'account':
        new AccountPage();
        break;
    }
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
