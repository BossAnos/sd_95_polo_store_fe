import { Button, Checkbox, Input, Popconfirm } from "antd";
import "./UserCart.css";
import { useEffect, useState } from "react";
import { cartService } from "../../../service/user";
import { productDetailService } from "../../../service/admin";
import { toastService } from "../../../service/common";
import { Link, useNavigate } from "react-router-dom";
import { DebounceInput, EmptyPage, LoadingPage } from "../../common";
import { useNavigateLoginPage } from "../../../hook";
import "../../Admin/admin-product.css";

const UserCart = () => {
  const [products, setProducts] = useState([]);
  const [detail, setDetail] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const socket = new WebSocket("ws://localhost:3001");

      socket.onopen = () => {
        console.log("WebSocket connection opened");
      };

      socket.onmessage = (event) => {
        const updatedData = JSON.parse(event.data);
        console.log("Received data:", updatedData);
        setProducts(updatedData.products);
        setDetail(updatedData.detail);
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed");
      };

      return () => {
        // Cleanup: close WebSocket connection when the component unmounts
        socket.close();
      };
    } catch (error) {
      console.error("WebSocket connection error:", error);
    }
  }, []);

  useEffect(() => {
    // Fetch initial data from the server
    const fetchData = async () => {
      try {
        const res = await cartService.getProducts();
        setProducts(
          res.data.cartDetailResponses.map((p) => ({
            ...p,
            checked: p.cc === 1 ? true : false,
          }))
        );
        setLoading(false);
        console.log(res);
      } catch (error) {
        toastService.error(error.apiMessage);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await productDetailService.getAllProductDetail();
        setDetail(res.data);
        setLoading(false);
        console.log(res);
      } catch (error) {
        toastService.error(error.apiMessage);
      }
    })();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  if (!products || products.length === 0) {
    return <EmptyPage description={"No cart item"} />;
  }

  const getTotalPrice = () => {
    if (products?.length === 0) {
      return 0;
    }
    return products
      .filter((p) => p.checked)
      .reduce((total, product) => {
        const price =
          product.priceCore === product.pricePromotion
            ? product.priceCore
            : product.pricePromotion;
        return total + price * product.quantity;
      }, 0);
  };

  // const handleDelete = async (product) => {
  //   try {
  //     await cartService.reduce(product.cartDetailId, 0);
  //     setProducts((pre) => {
  //       const newProducts = pre.filter(
  //         (p) => p.cartDetailId !== product.cartDetailId
  //       );
  //       return newProducts;
  //     });
  //   } catch (error) {
  //     toastService.error(error.apiMessage);
  //   }
  // };

  const quantityChangeHandle = async (product, e) => {
    try {
      const newQuantity = e.target.value;
      if (!newQuantity || newQuantity == 0) {
        return;
      }

      const params = {
        quantity: +newQuantity, // Ensure the value is a number
        idProductDetail: product.productDetailId, // Assuming this is the correct key
      };
      await cartService.changeQuantity(product.cartDetailId, params);
      setProducts((pre) => {
        return pre.map((p) => {
          if (p.cartDetailId === product.cartDetailId) {
            return {
              ...product,
              quantity: +newQuantity,
            };
          }
          return p;
        });
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle specific error message from the backend
        toastService.error("Invalid quantity. Please enter a valid quantity.");
      } else {
        // Handle other generic errors
        toastService.error("Số lượng tồn của sản phẩm không đủ");
      }
    }
  };

  const checkProductChangeHandle = async (product, e) => {
    try {
      product.checked = e.target.checked;
      await cartService.changeStatus(
        product.cartDetailId,
        product.checked ? 0 : 1
      );
      setProducts([...products]);
    } catch (error) {
      toastService.error(error.apiMessage);
    }
  };

  const getAvailableQuantity = (product) => {
    const productDetail = detail.find(
      (detailItem) => detailItem.productDetailId === product.productDetailId
    );
    return productDetail ? productDetail.quantity : 0;
  };

  const checkOutClickHandle = async () => {
    if (!products?.some((p) => p.checked)) {
      toastService.info("Vui lòng chọn sản phẩm để thanh toán");
      return;
    }

    // Check product quantities before navigating to checkout
    const invalidProducts = products.filter((p) => {
      return p.checked && p.quantity > getAvailableQuantity(p);
    });

    if (invalidProducts.length > 0) {
      const productNames = invalidProducts.map((p) => p.nameProduct).join(", ");
      toastService.error(
        `Số lượng sản phẩm ${productNames} vượt quá số lượng tồn. Vui lòng giảm số lượng.`
      );
      return;
    }
    // If all quantities are valid, navigate to checkout
    navigate("/checkout");
  };
  const checkAllProduct = async (e) => {
    if (e.target.checked) {
      for (let product of products) {
        cartService.changeStatus(product.cartDetailId, 0);
      }
      const newProducts = products.map((product) => {
        product.checked = true;
        return product;
      });
      console.log(newProducts);
      setProducts([...newProducts]);
    }

    if (!e.target.checked) {
      for (let product of products) {
        cartService.changeStatus(product.cartDetailId, 1);
      }
      const newProducts = products.map((product) => {
        product.checked = false;
        return product;
      });
      console.log(newProducts);
      setProducts([...newProducts]);
    }
  };

  return (
    <div className="cart">
      <div className="breadcrumb-section">
        <div className="container">
          <h1 className="text-giohang">Thông tin giỏ hàng </h1>
        </div>
      </div>
      <div className="carts">
        <div className="container">
          <div className="col-sm-12 table-responsive-xs">
            <table className="table__main">
              <thead>
                <tr>
                  <th>
                    <Checkbox
                      style={{ minWidth: "10px" }}
                      checked={products.every((p) => p.checked)}
                      onChange={(e) => checkAllProduct(e)}
                    ></Checkbox>
                  </th>
                  <th>Tên sản phẩm</th>
                  <th style={{ paddingLeft: "90px" }}>Số lượng</th>
                  <th style={{ paddingLeft: "100px" }}>Đơn giá</th>
                  <th style={{ paddingLeft: "80px" }}>action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Checkbox
                          checked={p.checked}
                          onChange={(e) => checkProductChangeHandle(p, e)}
                        ></Checkbox>
                      </td>
                      <td
                        style={{
                          display: "flex",

                          alignItems: "center",
                        }}
                      >
                        <div style={{ display: "flex" }}>
                          <img src={p.image} alt="" width={"60px"} />
                          <span>
                            {p.nameProduct}
                            <div>
                              <div>
                                {p.priceCore === p.pricePromotion ? (
                                  <span style={{ color: "red" }}>
                                    {p.priceCore.toLocaleString()} VNĐ
                                  </span>
                                ) : (
                                  <span>
                                    <span style={{ color: "red" }}>
                                      {p.pricePromotion.toLocaleString()} VNĐ
                                    </span>
                                    <span
                                      style={{
                                        textDecoration: "line-through",
                                        color: "black",
                                      }}
                                    >
                                      {p.priceCore.toLocaleString()} VNĐ
                                    </span>{" "}
                                  </span>
                                )}
                              </div>
                              <div>
                                <strong>
                                  Size: {p.nameSize} - Màu: {p.nameColor}
                                </strong>
                              </div>
                            </div>
                          </span>
                        </div>
                      </td>

                      <td>
                        <DebounceInput
                          className="input-soluong"
                          min={1}
                          type="number"
                          onSubmit={(e) => quantityChangeHandle(p, e)}
                          defaultValue={p.quantity}
                        />
                      </td>
                      <td>
                        <h4 className="td-color">
                          {p.priceCore === p.pricePromotion
                            ? (p.priceCore * p.quantity).toLocaleString()
                            : (
                                p.pricePromotion * p.quantity
                              ).toLocaleString()}{" "}
                          VNĐ
                        </h4>
                      </td>
                      <td>
                        <Popconfirm
                          title="Xóa đơn hàng"
                          description="Bạn có chắc chắn muốn xóa đơn hàng này?"
                          // onConfirm={() => handleDelete(p)}
                          // onCancel={cancel}
                          okText="Có"
                          cancelText="Không"
                        >
                          <Button className="btn-xoa">
                            <i className="fa fa-close"></i>
                          </Button>
                        </Popconfirm>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="table-responsive-md">
              <table className="table cart-table ">
                <tfoot>
                  <tr>
                    <td style={{ paddingRight: "180px" }}>Tổng giá:</td>
                    <td>
                      <h3 style={{ paddingRight: "10px", display: "flex" }}>
                        {getTotalPrice().toLocaleString()} VNĐ
                      </h3>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <div className="d-flex justify-content-end">
              <button
                onClick={() => checkOutClickHandle()}
                className="btn-thanhtoan "
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { UserCart };
