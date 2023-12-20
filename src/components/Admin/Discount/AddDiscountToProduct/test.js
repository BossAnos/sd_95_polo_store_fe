import React, { useEffect, useState } from "react";
import { discountService, productService } from "../../../../service/admin";
import { toastService } from "../../../../service/common";
import { Tabs, Input, Checkbox, Switch, notification, Pagination } from "antd";
import AddDiscountModal from "../AddDiscount/AddDiscountModal";
import "../../admin-product.css";
const { TabPane } = Tabs;

const ProductPage = () => {
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [products, setProducts] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [searchProductName, setSearchProductName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchBrand, setSearchBrand] = useState("");
  const [searchMaterial, setSearchMaterial] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(1);
  const [isProductsSelected, setIsProductsSelected] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const tabs = [
    {
      key: "1",
      label: "Đang hoạt động",
      status: 1,
    },
    {
      key: "0",
      label: "Đang được giảm giá",
      status: 3,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: productsData } = await productService.getAllProducts({});
        const { data: discountsData } = await discountService.getAllDiscount(
          {}
        );
        setProducts(productsData);
        setDiscounts(discountsData);
        setSelectedDiscount(discountsData.length > 0 ? discountsData[0] : null);
      } catch (e) {
        toastService.error(e.apiMessage);
      }
    };

    fetchData();
  }, []);

  const handleDiscountChange = (value) => {
    const discountId = parseInt(value, 10);
    const selectedDiscount = discounts.find(
      (discount) => discount.id === discountId
    );
    setSelectedDiscount(selectedDiscount);
  };

  const handleProductCheckboxChange = (productId) => {
    const updatedProducts = products.map((product) => ({
      ...product,
      discount:
        product.id === productId
          ? toggleDiscount(product.discount)
          : product.discount,
    }));
    setProducts(updatedProducts);

    const anyProductSelected = updatedProducts.some(
      (product) => product.discount === selectedDiscount
    );
    setIsProductsSelected(anyProductSelected);
  };

  const handleSelectAllProducts = () => {
    const allSelected = products.every(
      (product) => product.discount === selectedDiscount
    );
    const updatedProducts = products.map((product) => ({
      ...product,
      discount: allSelected ? null : selectedDiscount,
    }));
    setProducts(updatedProducts);
  };

  const toggleDiscount = (currentDiscount) => {
    return currentDiscount === selectedDiscount ? null : selectedDiscount;
  };

  const filterProducts = () => {
    return products.filter((product) => {
      const nameMatch =
        !searchProductName ||
        product.name.toLowerCase().includes(searchProductName.toLowerCase());
      const categoryMatch =
        !searchCategory ||
        product.nameCategory
          .toLowerCase()
          .includes(searchCategory.toLowerCase());
      const brandMatch =
        !searchBrand ||
        product.nameBrand.toLowerCase().includes(searchBrand.toLowerCase());
      const materialMatch =
        !searchMaterial ||
        product.nameMaterial
          .toLowerCase()
          .includes(searchMaterial.toLowerCase());

      return nameMatch && categoryMatch && brandMatch && materialMatch;
    });
  };

  const handleStatusButton = async (productId) => {
    try {
      const updatedProducts = products.map((product) =>
        product.id === productId
          ? {
              ...product,
              status: product.status === 3 ? 1 : 3,
            }
          : product
      );
      setProducts(updatedProducts);

      const updatedStatus = updatedProducts.find(
        (product) => product.id === productId
      )?.status;

      await productService.changeStautsDiscount(productId);

      toastService.success("Cập nhật trạng thái thành công");
    } catch (error) {
      console.error("Error updating product status:", error);
      toastService.error("Cập nhật trạng thái không thành công");
    }
  };

  const filteredProducts = filterProducts().filter(
    (product) => product.status === selectedStatus
  );

  const handleAddDiscountToSelectedProducts = async () => {
    if (!isProductsSelected) {
      notification.warning({
        message: "Cảnh báo",
        description:
          "Vui lòng chọn ít nhất một sản phẩm trước khi áp dụng khuyến mại",
      });
      return;
    }

    const selectedProductIds = products
      .filter((product) => product.discount === selectedDiscount)
      .map((product) => product.id);

    try {
      const response = await discountService.addDiscountToProduct({
        idDiscount: selectedDiscount.id,
        idProduct: selectedProductIds,
      });

      console.log(response);

      const updatedProducts = products.map((product) =>
        selectedProductIds.includes(product.id)
          ? { ...product, discount: selectedDiscount, status: 3 }
          : product
      );

      setProducts(updatedProducts);
      setSelectedStatus(3);

      toastService.success("Áp dụng khuyến mại thành công");
    } catch (error) {
      toastService.error(error.apiMessage);
    }
  };

  const handleAddDiscount = async (formData) => {
    try {
      setDiscounts([...discounts, formData]);
      setIsModalVisible(false);
      notification.success({
        message: "Success",
        description: "Khuyến mại đã được thêm mới",
      });
    } catch (error) {
      console.error("Error adding discount:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <AddDiscountModal
        visible={isModalVisible}
        onOk={handleAddDiscount}
        onCancel={() => {
          setIsModalVisible(false);
        }}
      />
      <Tabs
        activeKey={selectedStatus.toString()}
        onChange={(key) => setSelectedStatus(parseInt(key, 10))}
      >
        {tabs.map((tab) => (
          <TabPane tab={tab.label} key={tab.status.toString()}>
            <div>
              <div style={{ display: "flex" }}>
                <h1 style={{ fontWeight: "bolder", marginLeft: "50px" }}>
                  Chọn khuyến mại để áp dụng:{" "}
                </h1>{" "}
                <select
                  style={{
                    fontWeight: "bolder",
                    marginLeft: "50px",
                    marginTop: "-10px",
                  }}
                  onChange={(e) => handleDiscountChange(e.target.value)}
                  value={selectedDiscount ? selectedDiscount.id.toString() : ""}
                >
                  {discounts.map((discount) => (
                    <option key={discount.id} value={discount.id}>
                      {discount.name}
                    </option>
                  ))}
                </select>
                <button
                  style={{ width: "50px" }}
                  type="primary"
                  onClick={() => setIsModalVisible(true)}
                >
                  <a>
                    <i className="fas fa-plus"></i>
                  </a>
                </button>
              </div>

              {selectedDiscount && selectedDiscount.id !== discounts[0]?.id && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", marginBottom: "8px" }}>
                    <div style={{ flex: 1, marginRight: "8px" }}>
                      <label>Tên khuyến mại:</label>
                      <Input
                        value={selectedDiscount.name}
                        disabled
                        style={{ fontWeight: "bold" }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label>Gía trị khuyến mại:</label>
                      <Input
                        value={
                          parseFloat(
                            selectedDiscount.discount * 100
                          ).toString() + "%"
                        }
                        disabled
                        style={{ fontWeight: "bold" }}
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: 1, marginRight: "8px" }}>
                      <label>Ngày bắt đầu:</label>
                      <Input
                        value={selectedDiscount.startDate}
                        disabled
                        style={{ fontWeight: "bold" }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label>Ngày kết thúc:</label>
                      <Input
                        value={selectedDiscount.endDate}
                        disabled
                        style={{ fontWeight: "bold" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: "16px" }}>
                  <label
                    style={{
                      fontWeight: "bolder",
                      marginLeft: "50px",
                      marginTop: "20px",
                    }}
                  >
                    Tên sản phẩm:
                  </label>

                  <Input
                    style={{ width: "200px", marginLeft: "50px" }}
                    placeholder="Search by product name..."
                    value={searchProductName}
                    onChange={(e) => setSearchProductName(e.target.value)}
                  />
                </div>
                <div style={{ marginRight: "16px" }}>
                  <label style={{ fontWeight: "bolder", marginTop: "20px" }}>
                    Loại áo:
                  </label>

                  <Input
                    style={{ width: "200px" }}
                    placeholder="Search by category..."
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                  />
                </div>
                <div style={{ marginRight: "16px" }}>
                  <label style={{ fontWeight: "bolder", marginTop: "20px" }}>
                    Thương hiệu:
                  </label>

                  <Input
                    style={{ width: "200px" }}
                    placeholder="Search by brand..."
                    value={searchBrand}
                    onChange={(e) => setSearchBrand(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: "bolder", marginTop: "20px" }}>
                    Chất liệu:
                  </label>

                  <Input
                    style={{ width: "200px" }}
                    placeholder="Search by material..."
                    value={searchMaterial}
                    onChange={(e) => setSearchMaterial(e.target.value)}
                  />
                </div>
              </div>
              <br></br>
              <h1
                style={{
                  fontWeight: "bolder",
                  marginLeft: "50px",
                  marginTop: "20px",
                }}
              >
                Danh sách sản phẩm
              </h1>

              <br></br>
              <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                {filteredProducts.length === 0 ? (
                  <p>Không tìm thấy sản phẩm nào.</p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <Checkbox
                            checked={filteredProducts.every(
                              (product) => product.discount === selectedDiscount
                            )}
                            onChange={handleSelectAllProducts}
                          />
                        </th>
                        <th>Tên sản phẩm</th>
                        <th>Chất liệu</th>
                        <th>Thương hiệu</th>
                        <th>Loại áo</th>

                        {selectedStatus === 3 && <th>On/Off</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id}>
                          <td>
                            <Checkbox
                              checked={product.discount === selectedDiscount}
                              onChange={() =>
                                handleProductCheckboxChange(product.id)
                              }
                            />
                          </td>
                          <td>{product.name}</td>
                          <td>{product.nameMaterial}</td>
                          <td>{product.nameBrand}</td>
                          <td>{product.nameCategory}</td>

                          {selectedStatus === 3 && (
                            <td>
                              <Switch
                                style={{
                                  backgroundColor: "#52c41a",
                                  width: "30px",
                                }}
                                checked={product.status === 3}
                                onChange={() => handleStatusButton(product.id)}
                              />
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              {filteredProducts.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <Pagination
                    current={currentPage}
                    total={filteredProducts.length}
                    pageSize={itemsPerPage}
                    onChange={handlePageChange}
                  />
                </div>
              )}
              {filteredProducts.length > 0 && (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <button onClick={handleAddDiscountToSelectedProducts}>
                    Áp dụng khuyến mại
                  </button>
                </div>
              )}
              <br></br>
              <br></br>
            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export { ProductPage };
