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
import { ModalCookies } from './components/modal-cookies';
import { ContactPage } from './components/contact-page';
import { ProgramPage } from './program-page';
import initDropDownMenu from './functions/initDropDownMenu';
import inputSearchInit from './functions/controlsInit/inputSearchInit';
import timeMask from './functions/timeMask';
import { AuthComponent } from './components/auth-component';
import openNaturalPerson from './functions/initsBackendFunctions/openNaturalPerson';
import openLegalPerson from './functions/initsBackendFunctions/openLegalPerson';
import initCalendarPage from './functions/initsBackendFunctions/initCalendarPage';

document.addEventListener('DOMContentLoaded', function () {
  // layout
  new Header();
  new StickyMenu();

  // Главная page
  new OldCommon();
  new MapComponent();
  new FaqComponent();
  new NewsComponent();
  new ProgramComponent();
  new SpeakersComponent();
  new RemainedTime();

  // Новости page
  new NewsPage();

  // Календарь page
  new CalendarPage();

  // Личный кабинет page
  new AccountPage();

  // Контакты page
  new ContactPage();

  // Программы page
  new ProgramPage();

  // Авторизация page
  new AuthComponent();

  // common
  polyfills();
  detectTouch();
  customSelects();
  scrollByAnchor();
  initDropDownMenu();

  // маски
  phoneMask();
  dateMask();
  timeMask();

  // контролы
  datepickerInit();
  selectInit();
  inputFileInit();
  inputSearchInit();

  new ModalCookies();

  window.initCalendarPage = initCalendarPage();
  window.selectInit = selectInit();
  window.openNaturalPerson = openNaturalPerson();
  window.openLegalPerson = openLegalPerson();
});

window.addEventListener('load', function () {
  document.body.classList.add('loaded');
  setTimeout(() => document.body.classList.add('animatable'), 300)
})
