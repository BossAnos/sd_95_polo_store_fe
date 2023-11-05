import { useTranslation } from "react-i18next";

export const Loading = () => {
  const { t } = useTranslation();
  return (
    <span className="flex space-x-2 py-6">
      <div
        className="h-6 border-2 border-gray-200 rounded-full animate-spin"
        style={{ borderTop: "2px solid blue", width: "22px", height: "22px"  }}
      ></div>
      <span>{t("Loading ...")}</span>
    </span>
  );
};
