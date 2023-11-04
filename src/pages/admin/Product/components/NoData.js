import { useTranslation } from "react-i18next";
export const NoData = () => {
  const { t } = useTranslation();
  return <div className="my-10">{t("No available data")}</div>;
};
