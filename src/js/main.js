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
import selectInit from './functions/controlsInit/selectInit';
import datepickerInit from './functions/controlsInit/datepickerInit';
import inputFileInit from './functions/controlsInit/inputFileInit';
import phoneMask from './functions/phoneMask';
import dateMask from './functions/dateMask';

document.addEventListener('DOMContentLoaded', function () {
  // layout
  new Header();
  new StickyMenu();

  // index page
  new OldCommon();
  new MapComponent();
  new FaqComponent();
  new NewsComponent();
  new ProgramComponent();
  new SpeakersComponent();
  new RemainedTime();

  // news page
  new NewsPage();

  // calendar page
  new CalendarPage();

  // account page
  new AccountPage();

  // common
  polyfills();
  detectTouch();
  customSelects();
  scrollByAnchor();

  // маски
  phoneMask();
  dateMask();

  // контролы
  datepickerInit();
  selectInit();
  inputFileInit();
});

window.addEventListener('load', function () {
  document.body.classList.add('loaded');
  setTimeout(() => document.body.classList.add('animatable'), 300)
})
