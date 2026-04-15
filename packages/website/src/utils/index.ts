import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: false,
});

export const formatDate = (date: Date) => {
  const parts = formatter.formatToParts(date);

  const getPart = (type: keyof Intl.DateTimeFormatPartTypesRegistry) =>
    parts.find((p) => p.type === type)?.value;

  const day = getPart("day") || "";
  const month = getPart("month") || "";
  const hour = getPart("hour") || "";
  const minute = getPart("minute") || "";
  const year = getPart("year") || "";

  return {
    day,
    month,
    hour,
    minute,
    year,
  };
};
