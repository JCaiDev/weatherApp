import { format, isValid, addDays } from "date-fns";

export const formatDate = (date, dateFormat = "MMM dd, HH:mm") => {
  if (!date) return "Invalid Date";
  const parsedDate = new Date(date);
  if (!isValid(parsedDate)) return "Invalid Date";
  return format(parsedDate, dateFormat);
};

export const addDaysToDate = (date, days) => addDays(date, days);

export const getLocalDate = (entry) => {
  const dateTime = new Date(entry.dt * 1000);
  dateTime.setSeconds(dateTime.getSeconds());
  return format(dateTime, "yyyy-MM-dd");
};

export const getformattedDate = (date, formatStr = "MMM dd") => {
  return format(date, formatStr);
};
