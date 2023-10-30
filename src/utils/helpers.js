import dayjs from "dayjs";
import { FORMAT } from "./const";

export const textOverflow = (text, length) => {
  return length
    ? text.slice(0, length) + (text.length > length ? "..." : "")
    : text;
};

export const formatDate = (date, template = FORMAT.DATE_TIME_DEFAULT) => {
  return date ? dayjs(date).format(template) : '';
};
