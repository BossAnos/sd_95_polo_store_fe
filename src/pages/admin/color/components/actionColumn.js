import Tooltip from "rc-tooltip";
import { useTranslation } from "react-i18next";
import iconCopy from "../../../../assets/icon/copy.svg";
import iconDelete from "../../../../assets/icon/delete.svg";
import iconView from "../../../../assets/icon/eye.svg";

export const ActionColumn = ({
    row, 
    handleOpenEditModal, 
    handleOpenDeleteModal
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Tooltip placement="bottom" overlay={<span>{t("Edit")}</span>}>
        <button
          onClick={() => {
            handleOpenEditModal(row);
          }}
        >
          <img src={iconView} alt="View" />
        </button>
      </Tooltip>
      <Tooltip placement="bottom" overlay={<span>{t("Delete")}</span>}>
        <button
          className="mx-2"
          onClick={() => {
            handleOpenDeleteModal(row);
          }}
        >
          <img src={iconDelete} alt="Delete" />
        </button>
      </Tooltip>
    </>
  );
};
