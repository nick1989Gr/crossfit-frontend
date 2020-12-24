export const NUM_WEEK_DAYS = 7;
export const NUM_GYM_WORK_HOURS = 10;

export function getWeekNumber(d) {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  // Return array of year and week number
  const firstDay = new Date();
  firstDay.setDate(d.getDate() - d.getDay() + 1);
  const lastDay = new Date();
  lastDay.setDate(d.getDate() - d.getDay() + 7);
  return {
    year: d.getUTCFullYear(),
    weekNo,
    firstDay,
    lastDay,
    reference: d,
  };
}

export function getOneWeekForward(weekInYear) {
  weekInYear.reference.setUTCDate(weekInYear.reference.getUTCDate() + 7);
  return getWeekNumber(weekInYear.reference);
}

export function getOneWeekBack(weekInYear) {
  weekInYear.reference.setUTCDate(weekInYear.reference.getUTCDate() - 7);
  return getWeekNumber(weekInYear.reference);
}

// Formats date to Day dd Mon
export function formatDate(d) {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  console.log();
  return days[d.getDay()] + " " + d.getDate() + " " + months[d.getMonth()];
}

// Given a date it returns an array with 7 consequtive days starting
// from the given date
export function getWeekDates(firstWeekdayDate) {
  let dates = [];
  for (let i = 0; i < 7; i++) {
    var d = new Date(firstWeekdayDate);
    dates.push(d);
    firstWeekdayDate.setUTCDate(firstWeekdayDate.getUTCDate() + 1);
  }
  return dates;
}
