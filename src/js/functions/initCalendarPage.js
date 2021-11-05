import { CalendarPage } from '../components/calendar-page';
import selectInit from './controlsInit/selectInit';

export default function initCalendarPage() {
  new CalendarPage();
  selectInit();
}
