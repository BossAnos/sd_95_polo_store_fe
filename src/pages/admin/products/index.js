import React, { useState } from "react";
import { Table } from "antd";
import { useTitle } from "ahooks";
import { useTranslation } from "react-i18next";

const Products = () => {
  const { t } = useTranslation();
  useTitle("Products");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      <div className="px-10 py-4">
        <h1 className="flex justify-start text-3xl font-bold py-6">
          {t("Folder")}
        </h1>
        <div className="flex flex-col justify-center mt-5">
          <div className="w-full rounded-xl">
            <Table
              className="border border-gray-200 shadow-xl rounded-xl overflow-auto"
              dataSource={dataSource}
              columns={columns}
              rowSelection={rowSelection}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
