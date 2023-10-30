import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useTitle } from "ahooks";
import { useTranslation } from "react-i18next";
import Tooltip from "rc-tooltip";
import { formatDate, textOverflow } from "../../../utils/helpers";
import iconEdit from "../../../assets/icon/edit.svg";
import iconDelete from "../../../assets/icon/delete.svg";
import iconSearch from "../../../assets/icon/search.svg";
import { NoData } from "./component/NoData";

const tableStyles = {
  headRow: {
    style: {
      borderTopLeftRadius: "0.75rem",
      borderTopRightRadius: "0.75rem",
      backgroundColor: "#EEEEEE",
      fontWeight: "bold",
    },
  },
  table: {
    style: {
      borderWidth: "1px",
      borderRadius: "0.75rem",
      borderColor: "rgb(209, 213, 219)",
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

const Products = () => {
  const { t } = useTranslation();
  useTitle("Products");

  const columns = [
    {
      id: "id",
      name: t("ID"),
      selector: (row) => row.id,
      sortable: true,
      style: {
        textAlign: "center",
      },
      width: "100px",
    },
    {
      id: "name",
      name: t("Product Name"),
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <Tooltip placement="bottom" overlay={<span>{row.name}</span>}>
          <span>{textOverflow(row.name, 20)}</span>
        </Tooltip>
      ),
    },
    {
      id: "createdAt",
      name: t("Creation date"),
      selector: (row) => row.create_date,
      sortable: true,
      cell: (row) => {
        return formatDate(row.create_date);
      },
    },
    {
      id: "updatedAt",
      name: t("Last update"),
      selector: (row) => row.update_date,
      sortable: true,
      cell: (row) => {
        return formatDate(row.update_date);
      },
    },
    {
      id: "createdBy",
      name: t("Create by"),
      selector: (row) => row.createdBy,
      sortable: true,
      cell: (row) => (
        <Tooltip
          placement="bottom"
          overlay={<span>{row.createdBy.username}</span>}
        >
          <span>{textOverflow(row.createdBy.username, 20)}</span>
        </Tooltip>
      ),
    },
    {
      id: "categoryId",
      name: t("CategoryName"),
      selector: (row) => row.categoryId.name,
      sortable: true,
    },
    {
      id: "note",
      name: t("Description"),
      selector: (row) => row.description,
      sortable: true,
      cell: (row) => (
        <Tooltip placement="bottom" overlay={<span>{row.description}</span>}>
          <span>{textOverflow(row.description, 20)}</span>
        </Tooltip>
      ),
    },
    {
      id: "action",
      name: t("Action"),
      cell: (row) => (
        <div className="w-24">
          <Tooltip placement="bottom" overlay={<span>{t("Edit")}</span>}>
            <button className="mr-2">
              <img src={iconEdit} alt="Edit" />
            </button>
          </Tooltip>
          <Tooltip placement="bottom" overlay={<span>{t("Delete")}</span>}>
            <button
              className="mx-2"
              onClick={() => {
                // handleOpenDeleteModal(row);
              }}
            >
              <img src={iconDelete} alt="Delete" />
            </button>
          </Tooltip>
        </div>
      ),
      center: true,
      width: "108px",
    },
  ];
  
  return (
    <>
      <div className="px-10 py-4">
        <h1 className="flex justify-start text-3xl font-bold py-6">
          {t("Product")}
        </h1>
        <div className="flex justify-between">
          <div className="w-width-360 flex justify-start relative border border-1 pl-2 pr-8 rounded-full">
            <input
              className="w-full h-10 p-2 rounded-full focus:outline-none appearance-none focus:ring-0"
              placeholder={t("Search")}
              // onChange={handleSearchChange}
              // onKeyUp={(e) => {
              //   if (e.key === "Enter") {
              //     handleSearch();
              //   }
              // }}
            />
            <img
              className="absolute right-0 bottom-0"
              src={iconSearch}
              alt=""
              // onClick={handleSearch}
            />
          </div>
          <button
            className="px-4 h-10 flex flex-col justify-center items-center bg-main text-white rounded-full focus:ring-1 focus:outline-none"
            type="submit"
            // onClick={handleAddFolder}
          >
            {t("Add Folder")}
          </button>
        </div>
        <div className="flex flex-col justify-center mt-5">
          <div className="w-full rounded-xl">
            <DataTable
              className="border shadow-xl rounded-xl overflow-auto"
              columns={columns}
              // data={folderList}
              selectableRows
              // // selectableRowSelected={rowSelectCriteria}
              // onSelectedRowsChange={handleSelectedRowsChange}
              // // clearSelectedRows={true}
              persistTableHead={true}
              customStyles={tableStyles}
              // defaultSortFieldId={"createdAt"}
              // defaultSortAsc={false}
              pagination
              // paginationServer
              // progressPending={GetFolderList.loading}
              // progressComponent={<Loading />}
              noDataComponent={<NoData />}
              // paginationRowsPerPageOptions={[10, 20, 50, 100]}
              // paginationPerPage={filter.pageSize}
              // paginationDefaultPage={filter.pageNo}
              // paginationTotalRows={filter.total}
              // onChangePage={handlePageChange}
              // onChangeRowsPerPage={handleRowsPerPageChange}
              // onRowClicked={(row) => PreviewScreen(row)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
