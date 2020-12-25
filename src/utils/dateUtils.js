export const NUM_WEEK_DAYS = 7;

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
  return days[d.getDay()] + " " + d.getDate() + " " + months[d.getMonth()];
}

export function getWeekDays(startDay) {
  let days = [];
  days[0] = new Date(startDay);
  for (let i = 1; i < 7; i++) {
    days[i] = new Date();
    days[i].setDate(startDay.getDate() + i);
  }
  return days;
}

export function getNextWeekDate(d) {
  let ts = new Date().setDate(d.getDate() + NUM_WEEK_DAYS);
  return new Date(ts);
}

export function getPreviousWeekDate(d) {
  let ts = new Date().setDate(d.getDate() - NUM_WEEK_DAYS);
  return new Date(ts);
}
