import { Button, Checkbox, Input, Popconfirm } from "antd";
import "./UserCart.css";
import { useEffect, useState } from "react";
import { cartService } from "../../../service/user";
import { toastService } from "../../../service/common";
import { Link, useNavigate } from "react-router-dom";
import { DebounceInput, EmptyPage, LoadingPage } from "../../common";
import { useNavigateLoginPage } from "../../../hook";

const UserCart = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await cartService.getProducts();
        setProducts(
          res.data.cartDetailResponses.map((p) => {
            return {
              ...p,
              checked: p.cc === 1 ? true : false,
            };
          })
        );
        setLoading(false);
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
      await cartService.changeQuantity(product.cartDetailId, newQuantity);
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
      toastService.error(error.apiMessage);
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

  const checkOutClickHandle = async () => {
    if (!products?.some((p) => p.checked)) {
      toastService.info("Please choose at least one product");
      return;
    }

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
          <h2>CART</h2>
        </div>
      </div>
      <div className="carts">
        <div className="container">
          <div className="col-sm-12 table-responsive-xs">
            <table className="table cart-table">
              <thead>
                <tr className="table-head">
                  <th style={{ display: "flex" }}>
                    <Checkbox
                      checked={products.every((p) => p.checked)}
                      onChange={(e) => checkAllProduct(e)}
                    ></Checkbox>
                  </th>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Tổng giá</th>
                  <th>action</th>
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
                          min={1}
                          type="number"
                          onSubmit={(e) => quantityChangeHandle(p, e)}
                          defaultValue={p.quantity}
                          style={{ width: "70px" }}
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
                          <Button>
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
                    <td>total price :</td>
                    <td>
                      <h3>{getTotalPrice().toLocaleString()}</h3>
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
                className="btn btn-solid"
              >
                check out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { UserCart };
