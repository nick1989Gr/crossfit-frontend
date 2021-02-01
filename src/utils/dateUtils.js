export const NUM_WEEK_DAYS = 7;
export const FIRST = 0;
export const LAST = NUM_WEEK_DAYS - 1;

// Formats date to Day dd Mon
export const formatDateVerbose = (d) => {
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
};

export const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

// Takes a date and retuns the time as HH:MM:SS
export const formatTime = (date) => {
  return date.toTimeString().split(" ")[0];
};

export const getWeekDays = (startDay) => {
  let days = [];
  days[0] = new Date(startDay);
  for (let i = 1; i < NUM_WEEK_DAYS; i++) {
    days[i] = new Date(
      startDay.getFullYear(),
      startDay.getMonth(),
      startDay.getDate() + i
    );
  }
  return days;
};

export const getNextWeekDate = (d) => {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + NUM_WEEK_DAYS);
};

export const getPreviousWeekDate = (d) => {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() - NUM_WEEK_DAYS);
};
