import { format, isValid, addDays } from "date-fns";

export const formatDate = (date, dateFormat = "MMM dd, HH:mm") => {
  const parsedDate = new Date(date);
  if (!isValid(parsedDate)) return "Invalid Date";
  return format(parsedDate, dateFormat);
};

export const getLocalDate = (entry) => {
  const dateTime = new Date(entry.dt * 1000);
  return format(dateTime, "yyyy-MM-dd");
};

export const getformattedDate = (date, formatStr = "MMM dd") => {
  return format(date, formatStr);
};
