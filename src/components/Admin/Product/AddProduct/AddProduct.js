import {
  Button,
  Form,
  Image,
  Input,
  Space,
  Upload,
  Row,
  Divider,
  Col,
} from "antd";
import { useEffect, useState } from "react";
import {
  brandService,
  categoryService,
  colorService,
  discountService,
  materialService,
  imageService,
  //   productDetailService,
  productService,
  sizeService,
} from "../../../../service/admin";
import { selectSearchDataUtil } from "../../../../utils";
import { storage } from "../../../../firebaseConfig";
import { SelectSearch } from "../../../common/SelectSearch";
// import { AddBrandModal, AddCategoryModal } from "../../../common";
import ReactQuill from "react-quill";
import "./AddBrand.css";
// import { AddMaterialModal } from "../../../common/Modal/AddMaterialModal";
import { Typography } from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import QRCode from "qrcode.react";
import { fileService, toastService } from "../../../../service/common";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
// import { AddDiscountModal } from "../../../common/Modal";
import { AddMaterial } from "../../Material/AddMaterial/AddMaterial";
import { AddBrand } from "../../Brand/AddBrand/AddBrand";
import { AddSize } from "../../Size/AddSize/AddSize";
import { AddCategory } from "../../Categorie/AddCategorie/AddCategori";
import { AddColor } from "../../Color/AddColor/Addcolor";
import AddDiscountModal from "../../Discount/AddDiscount/AddDiscountModal";

const { Title } = Typography;

const AddProduct = () => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [materialOptions, setMaterialOptions] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [discountOptions, setDiscountOptions] = useState([]);
  const [qrCodeValues, setQRCodeValues] = useState({});
  const [detailImages, setDetailImages] = useState({});
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddBrandModal, setShowAddBrandModal] = useState(false);
  const [showMaterialModal, setShowAddMaterialModal] = useState(false);
  const [showSizeModal, setShowAddSizeModal] = useState(false);
  const [showColorModal, setShowAddColorModal] = useState(false);
  const [showAddDiscountModal, setShowAddDiscountModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [fields, setFields] = useState([]);
  const [file, setFile] = useState(null);

  const { productId } = useParams();

  const [images, setImages] = useState({});

  const navigate = useNavigate();

  const [form] = Form.useForm();

  useEffect(() => {
    (async () => {
      try {
        const categoryRes = await categoryService.getAllCategoryByStatus();
        const brandRes = await brandService.getAllBrandsByStatus();
        const materialRes = await materialService.getAllMaterialByStatus();
        const sizeRes = await sizeService.getAllSizeByStatus();
        const colorRes = await colorService.getAllColorsByStatus();
        const discountRes = await discountService.getAllDiscount({
          status: "1",
        });

        const materialOptions = selectSearchDataUtil.transformSearchSelectData(
          materialRes.data,
          "id",
          "name"
        );
        const categoryOptions = selectSearchDataUtil.transformSearchSelectData(
          categoryRes.data,
          "id",
          "name"
        );
        const brandOptions = selectSearchDataUtil.transformSearchSelectData(
          brandRes.data,
          "id",
          "name"
        );
        const sizeOptions = selectSearchDataUtil.transformSearchSelectData(
          sizeRes.data,
          "id",
          "name"
        );
        const colorOptions = selectSearchDataUtil.transformSearchSelectData(
          colorRes.data,
          "id",
          "name"
        );
        const discountOptions = selectSearchDataUtil.transformSearchSelectData(
          discountRes.data,
          "id",
          "name"
        );

        setMaterialOptions(materialOptions);
        setCategoryOptions(categoryOptions);
        setBrandOptions(brandOptions);
        setSizeOptions(sizeOptions);
        setColorOptions(colorOptions);
        setDiscountOptions(discountOptions);

        if (productId) {
          const { data } = await productService.getProductById(productId);

          const {
            name,
            categoryId,
            description,
            brandId,
            materialId,
            discountId,
            productDetails,
          } = data;

          console.log(productDetails);
          const images = productDetails.reduce((acc, curr, index) => {
            const imageList = curr.images;
            if (!imageList || imageList.length === 0) {
              return acc;
            }
            const imageObjects = imageList.map((image, imageIndex) => ({
              ...image,
              previewUrl: image.name,
              imageIndex: imageIndex,
            }));
            return {
              ...acc,
              [index]: imageObjects,
            };
          }, {});
          console.log(images);
          setImages(images);

          const productDetailRepuests = productDetails.map((product_detail) => {
            return {
              ...product_detail,
            };
          });
          const formValue = {
            name,
            categoryId,
            description,
            brandId,
            materialId,
            discountId,
            productDetailRepuests,
          };

          form.setFieldsValue(formValue);
        }
      } catch (error) {
        console.log(error);
        toastService.error(error.apiMessage || "Server error");
      }
    })();
  }, []);

  const addProductHandle = async (e) => {
    const request = {
      ...e,
    };
    console.log(e);
    if (productId) {
      request.productDetailRepuests = request.productDetailRepuests
        .filter((data) => data)
        .map((productDetail) => {
          const form_id = productDetail.form_id;
          const image = images[form_id];
          const names = image
            ? image.map((item) => ({ name: item.previewUrl }))
            : [];
          console.log(image);
          console.log(names);
          if (!image) {
            return {
              ...productDetail,
            };
          }

          return {
            ...productDetail,
            images: names, // Use the Firebase Storage image URL (name)
          };
        });

      await productService.updateProductById(productId, request);

      navigate("/admin/product");
      toastService.success("Cập nhật sản phẩm thành công");

      return;
    }
    request.productDetailRepuests = request.productDetailRepuests
      .filter((data) => data)
      .map((productDetail) => {
        const form_id = productDetail.form_id;
        const image = images[form_id];
        const names = Array.isArray(image)
          ? image.map((item) => ({ name: item.previewUrl }))
          : [];
        console.log(image);
        console.log(names);
        if (!image) {
          return {
            ...productDetail,
          };
        }

        return {
          ...productDetail,
          images: names, // Use the Firebase Storage image URL (name)
        };
      });

    // Save the product data to the database
    await productService.createProduct(request);

    navigate("/admin/product");
    toastService.success("Tạo sản phẩm thành công");
  };

  async function createCategoryFinishHandle(newCategory) {
    setShowAddCategoryModal(false);
    setCategoryOptions((pre) => {
      return [
        {
          value: newCategory.id,
          label: newCategory.name,
        },
        ...pre,
      ];
    });
    form.setFieldValue("category_id", newCategory.id);
  }

  async function createBrandFinishHandle(newBrand) {
    setShowAddBrandModal(false);
    setBrandOptions((pre) => {
      return [
        {
          value: newBrand.id,
          label: newBrand.name,
        },
        ...pre,
      ];
    });
    form.setFieldValue("brand_id", newBrand.id);
  }

  const onCreateMaterialFinish = (newMaterial) => {
    // Update the material options state with the new material
    setMaterialOptions((prevOptions) => [
      { value: newMaterial.id, label: newMaterial.name },
      ...prevOptions,
    ]);
  };

  const onCreateBrandFinish = (newBrand) => {
    // Update the material options state with the new material
    setBrandOptions((prevOptions) => [
      { value: newBrand.id, label: newBrand.name },
      ...prevOptions,
    ]);
  };
  const onCreateCategoryFinish = (newCategory) => {
    // Update the material options state with the new material
    setCategoryOptions((prevOptions) => [
      { value: newCategory.id, label: newCategory.name },
      ...prevOptions,
    ]);
  };
  const onCreateSizeFinish = (newSize) => {
    // Update the material options state with the new material
    setSizeOptions((prevOptions) => [
      { value: newSize.id, label: newSize.name },
      ...prevOptions,
    ]);
  };

  const onCreateColorFinish = (newColor) => {
    // Update the material options state with the new material
    setColorOptions((prevOptions) => [
      { value: newColor.id, label: newColor.name },
      ...prevOptions,
    ]);
  };

  const removeImage = async (form_id, imageIndex) => {
    const updatedImages = { ...images };
    const formImages = updatedImages[form_id];

    if (formImages && formImages.length > imageIndex) {
      const removedImage = formImages[imageIndex];
      const id = removedImage.id; // Lấy ID của ảnh
      console.log(id);

      // Kiểm tra xem ảnh đã có ID hay chưa
      if (id) {
        // Gọi hàm để thay đổi trạng thái ảnh trước
        await imageService.changeStatusImage(id);

        formImages.splice(imageIndex, 1);
        setImages(updatedImages);
      } else {
        formImages.splice(imageIndex, 1);
        setImages(updatedImages);
      }
    }
  };

  const fileChangeHandle = async (key, e) => {
    const fileList = Array.from(e.target.files);
    const newImages = fileList.map(async (file) => {
      const storageRef = storage.ref();
      const imageRef = storageRef.child(file.name);
      await imageRef.put(file);
      const downloadUrl = await imageRef.getDownloadURL();
      return {
        name: file.name,
        previewUrl: downloadUrl,
      };
    });

    setFile(fileList);
    console.log(fileList);

    const updatedDetailImages = await Promise.all(newImages);

    setDetailImages((prevImages) => {
      return {
        ...prevImages,
        [key]: [...(prevImages[key] || []), ...updatedDetailImages],
      };
    });

    setImages((prevImages) => {
      return {
        ...prevImages,
        [key]: [...(prevImages[key] || []), ...updatedDetailImages],
      };
    });

    console.log(images); // Make sure the images object is properly updated

    // Check Firebase Storage for uploaded images
    updatedDetailImages.forEach((image) => {
      const storageRef = storage.ref();
      const imageRef = storageRef.child(image.name);
      imageRef
        .getDownloadURL()
        .then((downloadUrl) => {
          console.log("Image uploaded to Firebase:", downloadUrl);
        })
        .catch((error) => {
          console.log("Error retrieving download URL:", error);
        });
    });

    // ... rest of your code
  };
  async function deleteProductDetailHandle(form_id, remove, name) {
    const formValue = form.getFieldsValue();
    const productDetail = formValue.productDetailRepuests[form_id];
    if (!productDetail?.product_detail_id) {
      remove(name);
      return;
    }
    const product_detail_id = productDetail.product_detail_id;

    // await productDetailService.deleteProductDetailById(product_detail_id);
    form.setFieldsValue({
      ...formValue,
      product_detail_requests: formValue.product_detail_requests.filter(
        (p) => p.product_detail_id !== product_detail_id
      ),
    });
    toastService.success("Xóa phân loại sản phẩm thành công");
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <AddMaterial
        open={showMaterialModal}
        onCancel={() => setShowAddMaterialModal(false)}
        onMaterialFinish={() => setShowAddMaterialModal(false)}
        onCreateMaterialFinish={onCreateMaterialFinish}
      />
      <AddBrand
        open={showAddBrandModal}
        onCancel={() => setShowAddBrandModal(false)}
        onBrandFinish={() => setShowAddBrandModal(false)}
        onCreateBrandFinish={onCreateBrandFinish}
      />
      <AddCategory
        open={showAddCategoryModal}
        onCancel={() => setShowAddCategoryModal(false)}
        onCategoryFinish={() => setShowAddCategoryModal(false)}
        onCreateCategoryFinish={onCreateCategoryFinish}
      />
      <AddSize
        open={showSizeModal}
        onCancel={() => setShowAddSizeModal(false)}
        onSizeFinish={() => setShowAddSizeModal(false)}
        onCreateSizeFinish={onCreateSizeFinish}
      />
      <AddColor
        open={showColorModal}
        onCancel={() => setShowAddColorModal(false)}
        onSizeFinish={() => setShowAddColorModal(false)}
        onCreateSizeFinish={onCreateSizeFinish}
      />
      <AddDiscountModal
        visible={showAddDiscountModal}
        onOk={(data) => {
          // Handle the data returned from the AddDiscountModal if needed
          console.log("Discount modal data:", data);
          setShowAddDiscountModal(false); // Close the modal
        }}
        onCancel={() => setShowAddDiscountModal(false)}
      />
      <Title level={1} style={{ textAlign: "center" }}>
        {" "}
        {productId ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
      </Title>
      <Form
        onFinish={addProductHandle}
        form={form}
        style={{ marginLeft: "40px" }}
      >
        <div style={{ maxWidth: "800px" }} className="main_add_product_form">
          <Form.Item
            name={"name"}
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input />
          </Form.Item>

          <div
            style={{
              display: "flex",
            }}
          >
            <Form.Item
              style={{
                width: "95%",
              }}
              name="categoryId"
              label="Loại áo"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại áo",
                },
              ]}
            >
              <SelectSearch options={categoryOptions} />
            </Form.Item>
            <Button onClick={() => setShowAddCategoryModal(true)}>
              <i className="fa-solid fa-plus"></i>
            </Button>
          </div>

          <div
            style={{
              display: "flex",
            }}
          >
            <Form.Item
              style={{
                width: "95%",
              }}
              name="brandId"
              label="Thương hiệu"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thương hiệu",
                },
              ]}
            >
              <SelectSearch options={brandOptions} />
            </Form.Item>
            <Button onClick={() => setShowAddBrandModal(true)}>
              <i className="fa-solid fa-plus"></i>
            </Button>
          </div>

          <div
            style={{
              display: "flex",
            }}
          >
            <Form.Item
              style={{
                width: "95%",
              }}
              name="materialId"
              label="Chất liệu"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn chất liệu",
                },
              ]}
            >
              <SelectSearch options={materialOptions} />
            </Form.Item>
            <Button onClick={() => setShowAddMaterialModal(true)}>
              <i className="fa-solid fa-plus"></i>
            </Button>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <Form.Item
              style={{
                width: "95%",
              }}
              name="discountId"
              label="Giảm giá"
            >
              <SelectSearch allowClear options={discountOptions} />
            </Form.Item>
            <Button onClick={() => setShowAddDiscountModal(true)}>
              <i className="fa-solid fa-plus"></i>
            </Button>
          </div>
          <Form.Item
            name={"description"}
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input />
          </Form.Item>
        </div>

        <div className="product-details-form">
          <Title level={3}>Chi tiết sản phẩm</Title>

          <div className="product-details" style={{ maxWidth: "800px" }}>
            <Form.List name="productDetailRepuests">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => (
                    <div key={key}>
                      <div>
                        <Row gutter={[16, 16]}>
                          <Col span={4}>
                            <strong style={{ marginLeft: "10px" }}>Size</strong>
                          </Col>
                          <Col span={4}>
                            <strong style={{ marginLeft: "25px" }}>
                              Màu sắc
                            </strong>
                          </Col>
                          <Col span={4}>
                            <strong style={{ marginLeft: "35px" }}>
                              Số lượng
                            </strong>
                          </Col>
                          <Col span={4}>
                            <strong style={{ marginLeft: "-20px" }}>
                              Giá nhập
                            </strong>
                          </Col>
                          <Col span={4}>
                            <strong style={{ marginLeft: "-75px" }}>
                              Giá bán
                            </strong>
                          </Col>
                          <Col span={4}>
                            <strong style={{ marginLeft: "-130px" }}>
                              Trọng lượng
                            </strong>
                          </Col>
                          <Col span={4}>
                            <strong style={{ marginLeft: "-44px" }}></strong>
                          </Col>
                        </Row>
                      </div>
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "form_id"]}
                          initialValue={key}
                        >
                          <Input type="hidden" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "sizeId"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng chọn màu sản phẩm",
                            },
                          ]}
                        >
                          <SelectSearch
                            options={sizeOptions}
                            placeholder="size"
                          />
                        </Form.Item>
                        <Button
                          style={{
                            width: "30px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onClick={() => setShowAddSizeModal(true)}
                        >
                          <i className="fa-solid fa-plus"></i>
                        </Button>

                        <Form.Item
                          {...restField}
                          name={[name, "colorId"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng chọn size sản phẩm",
                            },
                          ]}
                        >
                          <SelectSearch
                            options={colorOptions}
                            placeholder="color"
                          />
                        </Form.Item>
                        <Button
                          style={{
                            width: "30px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onClick={() => setShowAddColorModal(true)}
                        >
                          <i className="fa-solid fa-plus"></i>
                        </Button>

                        <Form.Item
                          {...restField}
                          name={[name, "quantity"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập số lượng phân loại",
                            },
                          ]}
                        >
                          <Input placeholder="Số lượng" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "cost"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập giá nhập phân loại",
                            },
                          ]}
                        >
                          <Input placeholder="Giá nhập" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "price"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập giá bán phân loại",
                            },
                          ]}
                        >
                          <Input placeholder="Giá bán" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "weight"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập cân nặng sản phẩm",
                            },
                          ]}
                        >
                          <Input placeholder="Trọng lượng" />
                        </Form.Item>
                        <Form.Item
                          onChange={(e) => {
                            fileChangeHandle(key, e);
                            console.log(e);
                          }}
                          trigger="false"
                        >
                          <Upload
                            beforeUpload={() => false}
                            showUploadList={false}
                            multiple
                          >
                            <Button icon={<UploadOutlined />}>
                              Upload image
                            </Button>
                          </Upload>
                        </Form.Item>
                        <MinusCircleOutlined
                          onClick={() =>
                            deleteProductDetailHandle(key, remove, name)
                          }
                        />
                      </Space>
                      <Row gutter={[16, 16]} style={{ marginLeft: "10px" }}>
                        {images[key] &&
                          images[key].map((image, imageIndex) => (
                            <div
                              key={`${key}.${imageIndex}`}
                              style={{ position: "relative" }}
                            >
                              <Image width={100} src={image.previewUrl} />
                              <Button
                                type="text"
                                icon={<DeleteOutlined />}
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  right: 0,
                                }}
                                onClick={() => {
                                  const confirmDelete = window.confirm(
                                    "Bạn có muốn xóa ảnh này không?"
                                  );
                                  if (confirmDelete) {
                                    removeImage(key, imageIndex);
                                  }
                                }}
                              />

                              {/* Thêm dòng này để in ra ID của ảnh */}
                            </div>
                          ))}
                      </Row>
                      <Divider style={{ margin: "20px", color: "black" }} />
                    </div>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
        </div>

        <br></br>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="mt-3" htmlType="submit" type="primary">
            {productId ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export { AddProduct };
