import Tooltip from "rc-tooltip";
import { useTranslation } from "react-i18next";
import iconDelete from "../../../../assets/icon/delete.svg";
import iconEdit from "../../../../assets/icon/edit.svg";

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
          <img src={iconEdit} alt="Edit" />
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
