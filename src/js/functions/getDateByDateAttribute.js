export default function getDateByDateAttribute(elem, attribute) {
  const endDateAttribute = elem.getAttribute(attribute).split('/'); // [2021, 10, 01]

  const endDateYearStr = endDateAttribute[0];
  const endDateMothStr = endDateAttribute[1] - 1;
  const endDateDayStr = endDateAttribute[2];
  const endDateHoursStr = endDateAttribute[3];
  const endDateMinutesStr = endDateAttribute[4];
  const endDateSecondsStr = endDateAttribute[5];

  return new Date(
    +endDateYearStr,
    +endDateMothStr,
    +endDateDayStr,
    +endDateHoursStr | null,
    +endDateMinutesStr | null,
    +endDateSecondsStr | null
  );
}
