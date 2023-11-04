import { useRequest, useToggle } from "ahooks";
import Tooltip from "rc-tooltip";
import React, { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import iconSearch from "../../../../assets/icon/search.svg";
import { Button, TYPE_BUTTON } from "../../../../components/button";
import { Loading } from "../../../../components/loading/loading";
import Modal from "../../../../components/modal";
import { DeleteFileApi, ReadAllFileApi } from "../../../services/file";
import { formatDate, textOverflow } from "../../../../utils/helpers";
import { toastError, toastSuccess } from "../../../../utils/toast";
import { ActionColumn } from "./actionColumn";
import { Breadcrumb } from "./breadcrumb";
import { NoData } from "./noData";

const tableStyles = {
  headRow: {
    style: {
      borderTopLeftRadius: "0.375rem",
      borderTopRightRadius: "0.375rem",
      backgroundColor: "#EEEEEE",
      fontWeight: "bold",
    },
  },
  table: {
    style: {
      borderRadius: "0.75rem",
    },
  },
  tableWrapper: {
    style: {
      width: "100%",
    },
  },
  rows: {
    style: {
      backgroundColor: "transparent",
    },
  },
  pagination: {
    style: {
      border: "0px",
    },
  },
  noData: {
    style: {
      backgroundColor: "transparent",
    },
  },
  progress: {
    style: {
      backgroundColor: "transparent",
    },
  },
};

const PAGE_NO_DEFAULT = 1;

export const FileList = () => {
  const { t } = useTranslation();
  const [clearSelectedRows, { toggle: toggledClearSelectedRows }] =
    useToggle(false);

  const columns = [
    {
      id: "id",
      name: t("ID"),
      selector: (row) => row.id,
      width: "100px",
    },
    {
      id: "name",
      name: t("Color Name"),
      selector: (row) => row.name,
      cell: (row) => (
        <Tooltip placement="bottom" overlay={<span>{row.name}</span>}>
          <span>{textOverflow(row.name, 20)}</span>
        </Tooltip>
      ),
      minWidth: "200px",
    },
    {
      id: "created_date",
      name: t("Creation date"),
      selector: (row) => row.create_date,
      cell: (row) => {
        return formatDate(row.create_date);
      },
      center: true,
      minWidth: "200px",
    },
    {
      id: "update_date",
      name: t("Creation date"),
      selector: (row) => row.update_date,
      cell: (row) => {
        return formatDate(row.update_date);
      },
      center: true,
      minWidth: "200px",
    },
    {
      id: "description",
      name: t("Description"),
      selector: (row) => row.description,
      cell: (row) => (
        <Tooltip placement="bottom" overlay={<span>{row.description}</span>}>
          <span>{textOverflow(row.description, 20)}</span>
        </Tooltip>
      ),
      center: true,
      minWidth: "200px",
    },
    {
      id: "action",
      name: "Action",
      cell: (row) => (
        <ActionColumn
          {...{ row, handleOpenEditModal, handleOpenDeleteModal }}
        />
      ),
      center: true,
      width: "140px",
    },
  ];
  const { folderId } = useParams();
  const [folderName, setFolderName] = useState("...");
  const [filter, setFilter] = useState({
    searchFiled: "",
    pageSize: 10,
    pageNo: PAGE_NO_DEFAULT,
    total: 0,
  });
  const [fileList, setFileList] = useState([]);
  const [fileSelected, setFileSelected] = useState(null);
  const [filesSelected, setFilesSelected] = useState([]);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const GetFileList = useRequest(
    ({ searchFiled, pageSize, pageNo }) =>
      ReadAllFileApi({
        folderId,
        searchFiled: searchFiled.trim(),
        pageSize,
        pageNo,
      }),
    {
      manual: true,
      onSuccess: ({ data, ...reply }) => {
        const { items, pageSize, pageNo, total, folderName } = data.data;
        setFolderName(folderName);
        setFileList(items);
        setFilter(({ searchFiled }) => ({
          searchFiled,
          pageSize,
          pageNo,
          total,
        }));
      },
      onError: (error) => {
        toastError(error.data.message);
      },
    }
  );
  const handlePageChange = (pageNo, total) => {
    GetFileList.run({ folderId, ...filter, pageNo });
  };
  const handleRowsPerPageChange = (pageSize, pageNo) => {
    GetFileList.run({ folderId, ...filter, pageSize, pageNo });
  };

  useEffect(() => {
    GetFileList.run({ folderId, ...filter });
  }, []);

  const DeleteFileRequest = useRequest(
    ({ folderId, selectedIds }) => DeleteFileApi({ folderId, selectedIds }),
    {
      manual: true,
      onSuccess: ({ data, ...reply }) => {
        handleCloseDeleteModal();
        toggledClearSelectedRows();
        setFilesSelected([]);
        setFileSelected(null);
        toastSuccess("Delete File successfully");
        GetFileList.run({ folderId, ...filter, pageNo: PAGE_NO_DEFAULT });
      },
    }
  );

  const handleOpenDeleteModal = (row) => {
    setDeleteModalIsOpen(true);
    row && setFileSelected(row.id);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };

  const DeleteAllBar = useMemo(() => {
    return (
      !!filesSelected.length && (
        <div className={"flex justify-start items-center px-4"}>
          <p className="px-2">{`${filesSelected.length} ${t("Selected")}`}</p>
          <Button
            type={TYPE_BUTTON.DANGER}
            title={t("Delete")}
            onClick={handleOpenDeleteModal}
          />
        </div>
      )
    );
  }, [filesSelected, t]);

  const handleSelectedRowsChange = ({ selectedRows }) => {
    setFilesSelected([...selectedRows.map(({ id }) => id)]);
  };

  const handleDeleteFile = () => {
    DeleteFileRequest.run({
      folderId,
      selectedIds: fileSelected ? [fileSelected] : [...filesSelected],
    });
  };

  const handleOpenEditModal = () => {}

  return (
    <>
      <div className="px-10 py-6">
        <div className="flex justify-start text-2xl font-semibold py-2">
          <span>{t("File list")}</span>
        </div>
        <Breadcrumb {...{ folderName }} />
        <div className="flex justify-between py-4">
          <div className="flex">
            {DeleteAllBar}
            <Button
              type={TYPE_BUTTON.PRIMARY}
              title={t("Add Color")}
              //   onClick={handleImport}
            />
          </div>
        </div>
        <div className="w-full rounded-xl">
          <DataTable
            className="border border-none shadow-xl rounded-xl overflow-auto"
            keyField={"id"}
            columns={columns}
            data={fileList}
            selectableRows
            onSelectedRowsChange={handleSelectedRowsChange}
            clearSelectedRows={clearSelectedRows}
            persistTableHead={true}
            customStyles={tableStyles}
            pagination
            paginationServer
            noDataComponent={<NoData />}
            progressPending={GetFileList.loading}
            progressComponent={<Loading />}
            // paginationComponent={<></>}
            paginationRowsPerPageOptions={[10, 20, 50, 100]}
            paginationPerPage={filter.pageSize}
            paginationDefaultPage={filter.pageNo}
            paginationTotalRows={filter.total}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
          />
        </div>
      </div>

      <Modal
        onCancel={handleCloseDeleteModal}
        onSave={handleDeleteFile}
        show={deleteModalIsOpen}
        title="Delete File"
        titleSave="Delete"
        typeSave={TYPE_BUTTON.DANGER}
        children={
          <p className="text-center">
            Are you sure that you want to delete selected file?
          </p>
        }
      />
    </>
  );
};