import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
  Modal,
  Table,
  Button,
  Input,
  Image,
  Form,
  Select,
  notification,
} from "antd";
import "react-tabs/style/react-tabs.css";
import { orderService, adminAuthService } from "../../../../service/admin";
import { toastService } from "../../../../service/common";
import { SERVER_URL } from "../../../../constant";

import { productDetailService } from "../../../../service/admin";
import "./CreateOrder.css";
const CreateOrder = () => {
  const [sales, setSales] = useState([
    {
      username: "",
      phone: "",
      address: "",
      products: [],
      shippingFee: 0,
      deliveryOption: "Tại quầy",
      transaction: 3,
    },
  ]);
  const [activeTab, setActiveTab] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [shippingFee, setShippingFee] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [urlPdf, setUrlPdf] = useState("");
  const [form] = Form.useForm();
  useEffect(() => {
    (async () => {
      const body = await productDetailService.getAllProductDetail();

      setProducts(body.data);
    })();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.nameProduct.includes(searchKeyword)
  );

  const handleCreateSale = () => {
    if (sales.length >= 5) {
      // Maximum number of sales orders reached
      alert("Tối đa chỉ được 5 đơn.");
      return;
    }

    const newSale = {
      username: "",
      phone: "",
      address: "",
      products: [],
      shippingFee: 0,
      deliveryOption: "Tại quầy",
      transaction: 3,
    };

    setSales([...sales, newSale]);
    setActiveTab(sales.length); // Cập nhật activeTab tại đây
  };
  const handleDeliveryOptionChange = (index, value) => {
    const updatedSales = [...sales];
    updatedSales[index].deliveryOption = value;
    setSales(updatedSales);
  };

  const handlePaymentMethodChange = (index, value) => {
    const updatedSales = [...sales];
    updatedSales[index].transaction = value;
    setSales(updatedSales);
  };

  const handleShippingFeeChange = (index, value) => {
    const updatedSales = [...sales];
    updatedSales[index].shippingFee = parseFloat(value);
    setSales(updatedSales);
  };
  const handleTabChange = (index, lastIndex, event) => {
    if (event.target.className.includes("react-tabs__x")) {
      event.stopPropagation();
      event.preventDefault();
      const newSales = [...sales];
      newSales.splice(index, 1);
      setSales(newSales);
      setActiveTab(Math.max(lastIndex - 1, 0));
    }
  };

  const totalWeight = (sale) => {
    let totalWeight = 0;
    sale.products.forEach((product) => {
      totalWeight += product.weight * product.quantity;
    });
    return totalWeight;
  };

  const calculateTotalPrice = (sale) => {
    let totalPrice = 0;
    sale.products.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });

    return totalPrice;
  };
  const handleQuantityChange = (tabIndex, productIndex, event) => {
    const updatedSales = [...sales];
    const newQuantity = event.target.value;
    const productDetailId =
      updatedSales[tabIndex].products[productIndex].productDetailId;

    console.log("New Quantity:", newQuantity);

    if (isQuantityValid(productDetailId, newQuantity)) {
      console.log("Quantity is valid. Updating...");
      updatedSales[tabIndex].products[productIndex].quantity = newQuantity;
      setSales(updatedSales);
    } else {
      console.log("Quantity is NOT valid.");
      // Display an error message or take appropriate action when the quantity is invalid.
      notification.error({
        message: "Lỗi",
        description: "Số lượng không hợp lệ.",
      });
    }
  };

  const handleAddProduct = (tabIndex) => {
    setActiveTab(tabIndex);
    setModalVisible(true);
  };

  const isQuantityValid = (productDetailId, newQuantity) => {
    console.log("Product ID:", productDetailId);
    console.log("New Quantity:", newQuantity);

    // Find the product in the products array based on productDetailId
    const product = products.find(
      (product) => product.productDetailId === productDetailId
    );

    // Check if the product is found and has the quantity property
    if (!product || !product.hasOwnProperty("quantity")) {
      console.error("Invalid product object or missing quantity property");
      return false;
    }

    console.log("Quantity in Stock:", product.quantity);
    return newQuantity >= 0 && newQuantity <= product.quantity;
  };
  const handleRemoveProduct = (tabIndex, productIndex) => {
    const updatedSales = [...sales];
    updatedSales[tabIndex].products.splice(productIndex, 1);
    setSales(updatedSales);
  };

  const handleProductSelect = (selectedProduct) => {
    const updatedSales = [...sales];
    const selectedTab = updatedSales[activeTab];

    // Kiểm tra xem sản phẩm đã tồn tại trong danh sách hay chưa
    const existingProduct = selectedTab.products.find(
      (product) => product.productDetailId === selectedProduct.productDetailId
    );

    if (existingProduct) {
      // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1
      existingProduct.quantity = String(parseInt(existingProduct.quantity) + 1);
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới với số lượng là 1
      selectedTab.products.push({
        nameProduct: selectedProduct.nameProduct,
        nameColor: selectedProduct.nameColor,
        nameSize: selectedProduct.nameSize,
        image: selectedProduct.images[0].name,
        quantity: 1,
        price:
          selectedProduct.price === selectedProduct.pricecost
            ? selectedProduct.price
            : selectedProduct.pricecost,
        productDetailId: selectedProduct.productDetailId,
        weight: selectedProduct.weight,
      });
    }

    setSales(updatedSales);
    setModalVisible(false);
  };

  const addOrderSubmitHandle = async (tabIndex) => {
    const adminInfo = adminAuthService.getAuthInfo();
    try {
      await form.validateFields();
    } catch (error) {
      return;
    }
    try {
      const formValue = form.getFieldsValue(); // Get the entire form value
      const tabFormValue = formValue.sales[tabIndex]; // Access the specific s
      console.log(tabFormValue);

      const selectedTab = sales[tabIndex];
      const deliveryOption = selectedTab.deliveryOption;
      const transaction = selectedTab.transaction;
      let transactionValue;
      let shoppingValue;

      if (transaction === 3) {
        transactionValue = 3;
      } else {
        transactionValue = 1;
      }

      if (deliveryOption === "Tại quầy") {
        shoppingValue = "Tại quầy";
      } else if (deliveryOption === "Đặt hàng") {
        shoppingValue = "Đặt hàng";
      }

      const orderDetailRequest = sales[tabIndex].products.map((product) => {
        const totalPrice = product.price * product.quantity;

        return {
          price: totalPrice,
          productDetailId: product.productDetailId,
          quantity: product.quantity,
        };
      });
      const subTotalPrice = calculateTotalPrice(sales[tabIndex]);
      const shipcost = sales[tabIndex].shippingFee;
      const subWeight = totalWeight(sales[tabIndex]);

      const request = {
        ...tabFormValue,
        orderDetailRequest: orderDetailRequest,
        shipCost: shipcost,
        totalPrice: subTotalPrice,
        weight: subWeight,
        shopping: shoppingValue,
        transactionId: transactionValue,
      };

      console.log(request);
      try {
        const newOrder = await orderService.addOrder(adminInfo.id, request);
        toastService.success("Add order success");
        setUrlPdf(
          "http://localhost:8080/admin/order/export/" + newOrder.data.id
        );
        console.log(urlPdf);
        setModalOpen(true);
        const updatedSales = [...sales];
        updatedSales[0].username = "";
        updatedSales[0].phone = "";
        updatedSales[0].address = "";
        updatedSales[0].products = [];
        updatedSales[0].shippingFee = 0;
        updatedSales[0].deliveryOption = "Tại quầy";
        updatedSales[0].transaction = 3;

        setSales(updatedSales);
        setActiveTab(0);

        // Reset form fields
        form.resetFields();
      } catch (e) {
        toastService.error(e.apiMessage);
      }
    } catch (error) {
      toastService.error(error.apiMessage);
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "nameProduct",
      key: "nameProduct",
      render: (text, record) =>
        `${record.nameProduct} - ${record.nameSize} - ${record.nameColor}`,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (text, record) => {
        if (record.images && record.images.length > 0) {
          return <Image src={record.images[0].name} width={80} />;
        }
        return null;
      },
    },
    {
      title: "Số lượng tồn",
      dataIndex: "quantity",
      key: "quantity",
    },

    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text, record) => {
        const price =
          record.price === record.pricecost ? record.price : record.pricecost;
        const formattedPrice = `${price.toLocaleString()} VNĐ`;
        return formattedPrice;
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <button type="primary" onClick={() => handleProductSelect(record)}>
          Chọn
        </button>
      ),
    },
  ];

  return (
    <div className="sales-page-container">
      <div className="sales-info-container">
        <Modal
          title="Thanh toán thành công. Bạn có muốn xuất hóa đơn không ?"
          centered
          open={modalOpen}
          onOk={() => {
            setModalOpen(false);
            window.open(urlPdf, "_blank");
          }}
          onCancel={() => setModalOpen(false)}
        ></Modal>
        <button className="btn-taohoadon" onClick={handleCreateSale}>
          Tạo hóa đơn
        </button>
        <Tabs>
          <TabList>
            {sales.map((sale, index) => (
              <Tab
                key={index}
                onClick={(event) => handleTabChange(index, activeTab, event)}
              >
                Bán hàng {index + 1} <span className="react-tabs__x">x</span>
              </Tab>
            ))}
          </TabList>

          {sales.map((sale, index) => (
            <TabPanel key={index}>
              <div style={{ display: "flex" }}>
                <Form layout="vertical" form={form}>
                  <div>
                    <h2 style={{ fontWeight: "bolder" }}>
                      Thông tin hóa đơn {index + 1}
                    </h2>
                    <div>
                      <Form.Item
                        style={{ fontWeight: "bolder", marginTop: "20px" }}
                        label="Tên người nhận"
                        name={["sales", index, "username"]}
                      >
                        <Input type="text" style={{ width: "180px" }} />
                      </Form.Item>
                      <Form.Item
                        style={{ fontWeight: "bolder" }}
                        label="Số điện thoại"
                        name={["sales", index, "phone"]}
                      >
                        <Input type="text" style={{ width: "180px" }} />
                      </Form.Item>
                      <Form.Item
                        style={{ fontWeight: "bolder" }}
                        label="Địa chỉ"
                        name={["sales", index, "address"]}
                      >
                        <Input type="text" style={{ width: "180px" }} />
                      </Form.Item>

                      <Form.Item
                        style={{ fontWeight: "bolder" }}
                        label="Phương thức thanh toán"
                      >
                        <Select
                          style={{ width: "180px" }}
                          defaultValue={sale.transaction}
                          onChange={(value) =>
                            handlePaymentMethodChange(index, value)
                          }
                        >
                          <Select.Option value={3}>
                            Thanh toán tại quầy
                          </Select.Option>
                          <Select.Option value={1}>
                            Thanh toán khi nhận hàng
                          </Select.Option>
                        </Select>
                      </Form.Item>

                      <Form.Item
                        style={{ fontWeight: "bolder" }}
                        label="Phương thức mua hàng"
                      >
                        <Select
                          style={{ width: "180px" }}
                          defaultValue={sale.deliveryOption}
                          onChange={(value) =>
                            handleDeliveryOptionChange(index, value)
                          }
                        >
                          <Select.Option value="Tại quầy">
                            Tại quầy
                          </Select.Option>
                          <Select.Option value="Đặt hàng">
                            Đặt hàng
                          </Select.Option>
                        </Select>
                      </Form.Item>
                      {sale.deliveryOption === "Đặt hàng" && (
                        <Form.Item label="Phí ship">
                          <Input
                            type="text"
                            onChange={(e) =>
                              handleShippingFeeChange(index, e.target.value)
                            }
                          />
                        </Form.Item>
                      )}
                    </div>
                  </div>
                </Form>

                <div className="price-table-container">
                  <button
                    className="btn-tonggia"
                    onClick={() => handleAddProduct(index)}
                  >
                    Thêm sản phẩm
                  </button>
                  <br />
                  <br />
                  <h3 style={{ fontWeight: "bolder" }}>Hóa đơn </h3>
                  <br />
                  <br />
                  <table>
                    <thead>
                      <tr className="tr-banggia">
                        <th>STT</th>
                        <th>Sản phẩm</th>
                        <th>Hình ảnh</th>
                        <th>Số lượng</th>
                        <th>Giá bán</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sale.products.length > 0 ? (
                        sale.products.map((product, productIndex) => (
                          <tr className="tr-banggia" key={productIndex}>
                            <td>{productIndex + 1}</td>
                            <td>
                              {product.nameProduct} - {product.nameSize} -{" "}
                              {product.nameColor}
                            </td>
                            <td>
                              <img
                                className="img-a"
                                src={product.image}
                                alt={product.name}
                              />
                            </td>
                            <td className="quantity-column">
                              <input
                                type="number"
                                value={product.quantity}
                                style={{ width: "50px", textAlign: "center" }}
                                onChange={(e) =>
                                  handleQuantityChange(index, productIndex, e)
                                }
                              />
                            </td>
                            <td style={{ color: "red" }}>
                              {product.price * product.quantity}VNĐ
                            </td>
                            <td>
                              <button
                                onClick={() =>
                                  handleRemoveProduct(index, productIndex)
                                }
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" style={{ textAlign: "center" }}>
                            Không có sản phẩm nào
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  {sale.products.length > 0 && (
                    <div>
                      <h4 className="text-tonggia">
                        <h4 style={{ display: "flex" }}>
                          Tổng giá:
                          <p style={{ color: "red" }}>
                            {calculateTotalPrice(sale)} VNĐ
                          </p>
                        </h4>
                        <h4
                          className="text-tonggia2"
                          style={{ display: "flex" }}
                        >
                          Tổng trọng lượng:{" "}
                          <p style={{ color: "red" }}>{totalWeight(sale)} g</p>
                        </h4>
                      </h4>
                    </div>
                  )}
                </div>
              </div>

              <button
                className="btn-guidonhang"
                onClick={() => addOrderSubmitHandle(activeTab)}
              >
                Gửi đơn hàng
              </button>
            </TabPanel>
          ))}
        </Tabs>

        <Modal
          title="Danh sách sản phẩm"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
          className="custom-modal"
          style={{ width: "800px" }}
        >
          <div style={{ marginBottom: "10px" }}>
            <Input
              placeholder="Tìm kiếm sản phẩm"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
          <Table
            dataSource={filteredProducts.map((product, index) => ({
              ...product,
              stt: index + 1,
            }))}
            columns={columns}
            rowKey="id"
          />
        </Modal>
      </div>
    </div>
  );
};

export { CreateOrder };
