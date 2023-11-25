import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toastService } from "../../../../service/common";
import { productService } from "../../../../service/admin";
import { LoadingPage } from "../../../common";
import "./UserProductDetail.css";
import { Carousel, Divider, Form, Input } from "antd";
// import { cartService, userAuthService } from "../../../../service/user";
import { useNavigateLoginPage } from "../../../../hook";

const UserProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [productDetailMap, setProductDetailMap] = useState([]);

  const [productDetailId, setProductDetailId] = useState("");

  const [sizePicker, setSize] = useState("");
  const [colorPicker, setColor] = useState("");

  const [quantityForm] = Form.useForm();

  const [navigateLogin] = useNavigateLoginPage();

  useEffect(() => {
    (async () => {
      try {
        const productRes = await productService.getProductDetailById(productId);
        const product = productRes.data;
        setProduct(productRes.data);

        const productDetails = product.productDetails || [];

        const sizeMap = productDetails.reduce((acrr, pre, index) => {
          return {
            ...acrr,
            [pre.sizeId]: {
              id: pre.sizeId,
              name: pre.nameSize,
              index,
            },
          };
        }, {});

        setSizes(Object.values(sizeMap));

        const colors = productDetails.reduce((acrr, pre, index) => {
          return {
            ...acrr,
            [pre.colorId]: {
              id: pre.colorId,
              name: pre.nameColor,
              index,
            },
          };
        }, {});
        setColors(Object.values(colors));

        const productDetailMap = productDetails.reduce((acrr, pre) => {
          const colorSizeKey = `${pre.sizeId}_${pre.colorId}`;
          return {
            ...acrr,
            [colorSizeKey]: pre,
          };
        }, {});

        setProductDetailMap(productDetailMap);

        const images = product.productDetails.map((pd) => {
          return pd?.images?.[0]?.name;
        });
        setImages(images);
        setLoading(false);
      } catch (error) {
        toastService.error(error.apiMessage);
      }
    })();
  }, []);

  const sizeChangeHandle = (index) => {
    setSize(index);
  };

  const getCurrentProductDetailKey = () => {
    return `${sizePicker?.id || ""}_${colorPicker?.id || ""}`;
  };

  const getAvailableQuanity = () => {
    const colorSizeKey = getCurrentProductDetailKey();
    const productDetail = productDetailMap[colorSizeKey];
    return productDetail?.quantity || 0;
  };

  // const addProductToCardHandle = async () => {
  //   if (!userAuthService.isLogin()) {
  //     toastService.info(
  //       <a>
  //         You need to login to perform this action,
  //         <div>
  //           <a style={{ fontWeight: 700, color: "#007bff" }}>Login now</a>
  //         </div>
  //       </a>,
  //       {
  //         onClick: () => navigateLogin(),
  //       }
  //     );
  //     return;
  //   }
  //   const quantity = quantityForm.getFieldsValue().quantity;
  //   const productDetail = getSelectedProductDetail();
  //   if (!productDetail) {
  //     toastService.info("Please choose product model");
  //     return;
  //   }
  //   if (!quantity) {
  //     toastService.info("Please input quantity");
  //     return;
  //   }
  //   if (quantity > productDetail.quantity) {
  //     toastService.info("Please input quantity less than available");
  //     return;
  //   }
  //   const req = {
  //     color_id: productDetail.color_id,
  //     product_detail_id: productDetail.product_detail_id,
  //     product_id: product.id,
  //     quantity: quantity,
  //     size_id: productDetail.size_id,
  //   };

  //   try {
  //     const authInfo = await userAuthService.getAuthInfo();
  //     const res = await cartService.addProduct(authInfo.id, req);
  //     toastService.success("Add Product to cart successfully");
  //     console.log(res);
  //   } catch (error) {
  //     toastService.error(error.apiMessage);
  //   }
  // };

  const getSelectedProductDetail = () => {
    return productDetailMap[getCurrentProductDetailKey()];
  };

  const canAddToCard = () => {
    const quantity = quantityForm.getFieldsValue()?.quantity;
    return quantity && quantity < getAvailableQuanity();
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <div className="breadcrumb-section">
        <div className="container">
          <h2>PRODUCT</h2>
        </div>
      </div>
      <div className={"container product_detail"}>
        <div className={"row"}>
          <div className={"col-6 "}>
            <div className={"main_image"}>
              <Carousel autoplay>
                <div className={"main_image"}>
                  <img
                    className={"product-image"}
                    src={images[0]}
                    alt="Image 1"
                  />
                </div>
                <div>
                  <img
                    className={"product-image"}
                    src={images[0]}
                    alt="Image 2"
                  />
                </div>
                <div>
                  <img
                    className={"product-image"}
                    src={images[0]}
                    alt="Image 3"
                  />
                </div>
                {/* Add more images here */}
              </Carousel>
            </div>
          </div>
          <div className={"col-6"}>
            <div className={"product-right "}>
              <div className={"product-count"}>
                <ul>
                  <li>
                    <img
                      src="http://themes.pixelstrap.com/multikart/assets/images/fire.gif"
                      className="img-fluid"
                      alt="image"
                    />
                    <span className="p-counter">37</span>
                    <span className="lang">orders in last 24 hours</span>
                  </li>
                  <li>
                    <img
                      src="http://themes.pixelstrap.com/multikart/assets/images/person.gif"
                      className="img-fluid user_img"
                      alt="image"
                    />
                    <span className="p-counter">44</span>
                    <span className="lang">active view this</span>
                  </li>
                </ul>
              </div>
              <h2>{product.name}</h2>
              <div className="rating-section">
                <div className="rating">
                  <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                  <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                  <i className="fa fa-star"></i>
                </div>
                <h6>120 ratings</h6>
              </div>

              <div className="label-section">
                <span className="badge badge-grey-color">#1 Best seller</span>
                <span className="label-text">in fashion</span>
              </div>

              <h3 className="price-detail">
                {product.productDetails.price}
                <del>{product.productDetails.pricecost}</del>
                <span>{product.promotionPercent}% off</span>
              </h3>

              <ul className="color-variant">
                {colors.map((color, index) => {
                  return (
                    <li
                      onClick={() => setColor(color)}
                      className={
                        color.index === colorPicker?.index ? "active" : ""
                      }
                      style={{
                        border: "1px solid lightgray",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "0.25rem",
                      }}
                      key={index}
                    >
                      {color.name}
                    </li>
                  );
                })}
              </ul>

              <div
                id="selectSize"
                className="addeffect-section product-description border-product"
              >
                <h6 className="product-title size-text">
                  select size{" "}
                  <span>
                    <a
                      href=""
                      data-bs-toggle="modal"
                      data-bs-target="#sizemodal"
                    >
                      size chart
                    </a>
                  </span>
                </h6>
                <h6 className="error-message">please select size</h6>
                <div className="size-box">
                  <ul>
                    {sizes.map((size, index) => {
                      return (
                        <li
                          key={index}
                          className={
                            size.index === sizePicker?.index ? "active" : ""
                          }
                          onClick={() => sizeChangeHandle(size)}
                        >
                          {size.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <h6 className="product-title">Available</h6>

              <div className="qty-box mt-3">{getAvailableQuanity()}</div>

              <h6 className="product-title">quantity</h6>
              <div className="qty-box mt-3">
                <Form form={quantityForm}>
                  <Form.Item name={"quantity"} initialValue={1}>
                    <Input
                      min={1}
                      style={{ width: "100px" }}
                      type={"number"}
                      placeholder={"Số lượng"}
                    />
                  </Form.Item>
                </Form>
              </div>

              <div className="product-buttons">
                <button
                  id="cartEffect"
                  // onClick={addProductToCardHandle}
                  disabled={!canAddToCard()}
                  className="btn btn-solid hover-solid btn-animation"
                >
                  <i className="fa fa-shopping-cart me-1"></i> add to cart
                </button>
              </div>
            </div>
          </div>

          <div className={"col-12"}>
            <h2>Product detail</h2>
            <Divider />
            <div
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { UserProductDetail };
