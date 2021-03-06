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
import { ProgramPage } from './components/program-page';
import initDropDownMenu from './functions/initDropDownMenu';
import inputSearchInit from './functions/controlsInit/inputSearchInit';
import timeMask from './functions/timeMask';
import { AuthComponent } from './components/auth-component';
import openNaturalPerson from './functions/initsBackendFunctions/openNaturalPerson';
import openLegalPerson from './functions/initsBackendFunctions/openLegalPerson';
import initCalendarPage from './functions/initsBackendFunctions/initCalendarPage';
import initProgramPage from './functions/initsBackendFunctions/initProgramPage';
import { ChangePasswordComponent } from './components/change-password-component';
import { openSuccessfullyBookedTime } from './functions/initsBackendFunctions/openSuccessfullyBookedTime';
import openProgramModalFilter from './functions/initsBackendFunctions/openProgramModalFilter';

document.addEventListener('DOMContentLoaded', function () {
  // common
  polyfills();
  detectTouch();
  customSelects();
  scrollByAnchor();
  initDropDownMenu();

  // ??????????
  phoneMask();
  dateMask();
  timeMask();

  // ????????????????
  datepickerInit();
  selectInit();
  inputFileInit();
  inputSearchInit();

  new ModalCookies();

  // layout
  new Header();
  new StickyMenu();

  // ?????????????? page
  new OldCommon();
  new MapComponent();
  new FaqComponent();
  new NewsComponent();
  new ProgramComponent();
  new SpeakersComponent();
  new RemainedTime();

  // ?????????????? page
  new NewsPage();

  // ?????????????????? page
  new CalendarPage();

  // ???????????? ?????????????? page
  new AccountPage();

  // ???????????????? page
  new ContactPage();

  // ?????????????????? page
  new ProgramPage();

  // ?????????????????????? page
  new AuthComponent();

  // ?????????? ???????????? page
  new ChangePasswordComponent();

  window.initCalendarPage = initCalendarPage;
  window.initProgramPage = initProgramPage;
  window.selectInit = selectInit;
  window.openNaturalPerson = openNaturalPerson;
  window.openLegalPerson = openLegalPerson;
  window.openSuccessfullyBookedTime = openSuccessfullyBookedTime;
  window.openProgramModalFilter = openProgramModalFilter;
});

window.addEventListener('load', function () {
  document.body.classList.add('loaded');
  setTimeout(() => document.body.classList.add('animatable'), 300)
})
