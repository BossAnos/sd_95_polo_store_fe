import { toast as toastify } from "react-toastify";

const ParsedContent = ({ content, title, ...props }) => (
  <div className={"flex flex-col"}>
    <span className={"capitalize font-semibold text-base"}>{title}</span>
    <span className={"font-normal	text-sm"}>{content}</span>
  </div>
);

export const toastError = (content, { title, ...options } = {}) => {
  return toastify.error(
    <ParsedContent {...{ content, title: title || "Error occurred" }} />,
    {
      ...options,
    }
  );
};

export const toastSuccess = (content, { title, ...options } = {}) =>
  toastify.success(
    <ParsedContent {...{ content, title: title || "Completed" }} />,
    {
      ...options,
    }
  );
