import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toastService } from "../../../../service/common";
import { productService } from "../../../../service/admin";
import { LoadingPage } from "../../../common";
import "./UserProductDetail.css";
import { Carousel, Divider, Form, Input, notification } from "antd";
import { cartService, userAuthService } from "../../../../service/user";
import { useNavigateLoginPage } from "../../../../hook";

const UserProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [listImages, setListImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [productDetailMap, setProductDetailMap] = useState([]);
  const [price, setPrice] = useState(0);
  const [productDetailId, setProductDetailId] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [sizePicker, setSize] = useState("");
  const [colorPicker, setColor] = useState("");
  const [pricecost, setPriceCost] = useState(0);

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

  const getCurrentProductDetailKey = () => {
    return `${sizePicker?.id || ""}_${colorPicker?.id || ""}`;
  };
  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };
  const getAvailableQuanity = () => {
    const colorSizeKey = getCurrentProductDetailKey();
    const productDetail = productDetailMap[colorSizeKey];
    return productDetail?.quantity || 0;
  };

  // Find the first product detail initially
  useEffect(() => {
    // ...
    if (sizes.length > 0) {
      setSize(sizes[0]);
    }
    if (colors.length > 0) {
      setColor(colors[0]);
    }
  }, [sizes, colors]);

  useEffect(() => {
    if (sizePicker && colorPicker) {
      const currentProductDetailKey = `${sizePicker.id}_${colorPicker.id}`;
      const productDetail = productDetailMap[currentProductDetailKey];
      setProductDetailId(productDetail?.productDetailId || "");
      setPrice(productDetail?.price || 0);
      setPriceCost(productDetail?.pricecost || price);
      const images = productDetail?.images || [];
      setListImages(images);
      console.log(images);
    }
  }, [sizePicker, colorPicker, productDetailMap]);

  const isSizeAvailable = (colorId, sizeId) => {
    const productDetailKey = `${sizeId}_${colorId}`;
    return productDetailMap.hasOwnProperty(productDetailKey);
  };
  const isColorAvailable = (colorId, sizeId) => {
    const productDetailKey = `${sizeId}_${colorId}`;
    return productDetailMap.hasOwnProperty(productDetailKey);
  };

  const getSelectedProductDetail = () => {
    return productDetailMap[getCurrentProductDetailKey()];
  };

  const addProductToCardHandle = async () => {
    if (!userAuthService.isLogin()) {
      toastService.info(
        <a>
          Bạn cần đăng nhập
          <div>
            <a style={{ fontWeight: 700, color: "#007bff" }}>Login now</a>
          </div>
        </a>,
        {
          onClick: () => navigateLogin(),
        }
      );
      return;
    }
    const quantity = quantityForm.getFieldsValue().quantity;
    const productDetail = getSelectedProductDetail();
    if (!productDetail) {
      toastService.info("Please choose product model");
      return;
    }
    if (!quantity) {
      toastService.info("Please input quantity");
      return;
    }
    if (quantity > productDetail.quantity) {
      toastService.info("Vui lòng nhập số lượng nhỏ hơn số lượng tồn");
      return;
    }
    const req = {
      productDetailId: productDetailId,
      quantity: quantity,
    };

    try {
      const authInfo = await userAuthService.getAuthInfo();
      const res = await cartService.addProduct(authInfo.id, req);
      toastService.success("Thêm vào giỏ hàng thành công");
      console.log(res);
    } catch (error) {
      notification.error({
        message: "Đã vượt quá số lượng tồn",
        description: error.message, // Hoặc sử dụng mô tả lỗi khác tùy theo nhu cầu
      });
    }
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
          <div></div>
        </div>
      </div>
      <div className={"container product_detail"}>
        <div className={"row"}>
          <div className={"col-5"}>
            <div className={"main_image"}>
              <Carousel autoplay>
                {listImages.map((image, index) => (
                  <div key={index} className="main_image">
                    <img
                      className="product-image"
                      src={image.name}
                      alt={`Image ${index + 1}`}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
          <div className={"col-6"}>
            <div className={"product-right "}>
              <div>
                <h1
                  style={{
                    fontSize: "20px",
                    display: "inline-block",
                    verticalAlign: "middle",
                  }}
                >
                  {product.name}
                </h1>
                {product.promotionPercent !== 0 && (
                  <span
                    className="promotionPercent"
                    style={{ display: "inline-block", verticalAlign: "middle" }}
                  >
                    {product.promotionPercent}%
                  </span>
                )}
              </div>
              <br></br>
              <h4>Mã sản phẩm : APL{productDetailId}</h4>
              <br></br>
              <div className="rating-section">
                <div className="rating">
                  <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                  <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                  <i className="fa fa-star"></i>
                </div>
                <h6>120 ratings</h6>
              </div>

              <h3 className="price-detail">
                <div className="prices">
                  {product.promotionPercent ? (
                    <>
                      <span className="originalPrice">
                        {pricecost.toLocaleString()} VNĐ
                      </span>
                      {pricecost !== 0 && (
                        <span className="discountedPrice">
                          {price.toLocaleString()} VNĐ
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="originalPrice">
                      {price.toLocaleString()} VNĐ
                    </span>
                  )}
                </div>
              </h3>

              <h6 className="product-title">
                Số lượng tồn : {getAvailableQuanity()}
              </h6>

              <div className="qty-container">
                <h6 className="product-title">Số lượng :</h6>
                <div className="qty-box mt-3">
                  <Form form={quantityForm}>
                    <Form.Item name={"quantity"} initialValue={1}>
                      <Input
                        min={1}
                        className="qty-input"
                        style={{ width: "100px" }}
                        type={"number"}
                        placeholder={"Số lượng"}
                      />
                    </Form.Item>
                  </Form>
                </div>
              </div>

              <hr style={{ width: "400px" }}></hr>
              <br></br>

              <div
                id="selectSize"
                className="addeffect-section product-description border-product"
              >
                <p>Màu sắc :</p>
                <div className="color-box">
                  <ul className="color-variant">
                    {colors.map((color, index) => (
                      <li
                        onClick={() => setColor(color)}
                        className={`color-item ${
                          color.id === colorPicker?.id ? "active" : ""
                        }`}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "5px", // You can adjust the border radius as needed
                          textDecoration:
                            !isSizeAvailable(color.id, sizePicker?.id) ||
                            !isColorAvailable(color.id, sizePicker?.id)
                              ? "line-through"
                              : "none",
                          pointerEvents:
                            !isSizeAvailable(color.id, sizePicker?.id) ||
                            !isColorAvailable(color.id, sizePicker?.id)
                              ? "none"
                              : "auto",
                          border: "2px solid #c3bebd",
                        }}
                        key={index}
                      >
                        {color.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div
                id="selectSize"
                className="addeffect-section product-description border-product"
              >
                <p>Size : </p>
                <div className="size-box">
                  <ul className="size-variant">
                    {sizes.map((size, index) => (
                      <li
                        onClick={() => setSize(size)}
                        className={`size-item ${
                          size.id === sizePicker?.id ? "active" : ""
                        }`}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "5px", // You can adjust the border radius as needed
                          textDecoration:
                            !isSizeAvailable(colorPicker?.id, size.id) ||
                            !isColorAvailable(colorPicker?.id, size.id)
                              ? "line-through"
                              : "none",
                          cursor:
                            !isSizeAvailable(colorPicker?.id, size.id) ||
                            !isColorAvailable(colorPicker?.id, size.id)
                              ? "not-allowed"
                              : "pointer",
                          pointerEvents:
                            !isSizeAvailable(colorPicker?.id, size.id) ||
                            !isColorAvailable(colorPicker?.id, size.id)
                              ? "none"
                              : "auto",
                          border: "2px solid #c3bebd",
                        }}
                        key={index}
                      >
                        {size.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="product-buttons">
                <button
                  id="cartEffect"
                  onClick={addProductToCardHandle}
                  disabled={!canAddToCard()}
                  className="btn-solid"
                >
                  <i className="fa fa-shopping-cart me-1"></i> Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
          <hr></hr>
          <br></br>
          <div className={"col-12"}>
            <br></br>
            <h2>Thông tin sản phẩm</h2>
            <Divider />
            <div>
              {" "}
              Mô tả : {product.description},Thương hiệu : {product.nameBrand},
              Chất Liệu : {product.nameMaterial}, Loại áo :{" "}
              {product.nameCategory}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { UserProductDetail };
