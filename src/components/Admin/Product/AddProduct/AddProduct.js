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
  //   discountService,
  materialService,
  //   productDetailService,
  productService,
  sizeService,
} from "../../../../service/admin";
import { selectSearchDataUtil } from "../../../../utils";
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
import { fileService, toastService } from "../../../../service/common";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
// import { AddDiscountModal } from "../../../common/Modal";

const { Title } = Typography;

const AddProduct = () => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [materialOptions, setMaterialOptions] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [discountOptions, setDiscountOptions] = useState([]);
  const [description, setDescription] = useState("");

  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddBrandModal, setShowAddBrandModal] = useState(false);
  const [showMaterialModal, setShowAddMaterialModal] = useState(false);
  const [showAddDiscountModal, setShowAddDiscountModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const { productId } = useParams();

  const [images, setImages] = useState({});

  const navigate = useNavigate();

  const [form] = Form.useForm();

  useEffect(() => {
    (async () => {
      try {
        const categoryRes = await categoryService.getAllCategory();
        const brandRes = await brandService.getAllBrands();
        const materialRes = await materialService.getAllMaterial();
        const sizeRes = await sizeService.getAllSizes();
        const colorRes = await colorService.getAllColors();
        // const discountRes = await discountService.getDiscounts({
        //   statuses: "ACTIVE",
        // });

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
        // const discountOptions = selectSearchDataUtil.transformSearchSelectData(
        //   discountRes.data,
        //   "id",
        //   "name"
        // );

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
            // discount_id,
            productDetails,
          } = data;
          setDescription(description);
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

          const product_detail_requests = productDetails.map(
            (product_detail) => {
              return {
                ...product_detail,
              };
            }
          );
          const formValue = {
            name,
            categoryId,
            description,
            brandId,
            materialId,
            // discount_id,
            product_detail_requests,
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
    if (productId) {
      const formValue = form.getFieldsValue();

      const productDetails = formValue.product_detail_requests.map(
        (productDetail) => {
          const { form_id } = productDetail;
          const image = images[form_id];
          if (image) {
            return {
              ...productDetail,
              images: [image],
            };
          }
          return {
            ...productDetail,
          };
        }
      );
      formValue.product_detail_requests = productDetails;
      formValue.description = description;
      //   await productService.updateProductById(productId, formValue);
      navigate("/admin/products");
      toastService.success("Cập nhật sản phẩm thành công");
      return;
    }
    const request = {
      ...e,
    };

    // for (let image of Object.values(images)) {
    //     const {secure_url} = await fileService.uploadFile({
    //         publicId: uuid(),
    //         file: image.file
    //     })
    //     image.secure_url = secure_url;
    // }

    request.product_detail_requests = request.product_detail_requests
      .filter((data) => data)
      .map((productDetail) => {
        const form_id = productDetail.form_id;
        const image = images[form_id];
        if (!image) {
          return {
            ...productDetail,
          };
        }
        return {
          ...productDetail,
          images: [image],
        };
      });
    request.description = description;
    // await productService.createProduct(request);
    toastService.success("Tạo sản phẩm thành công");
    navigate("/admin/products");
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

  async function createMaterialFinishHandle(newMaterial) {
    setShowAddMaterialModal(false);
    setMaterialOptions((pre) => {
      return [
        {
          value: newMaterial.id,
          label: newMaterial.name,
        },
        ...pre,
      ];
    });
    form.setFieldValue("material_id", newMaterial.id);
  }

  async function createDiscountFinishHandle(newDiscount) {
    setShowAddDiscountModal(false);
    setDiscountOptions((pre) => {
      return [
        {
          value: newDiscount.id,
          label: newDiscount.name,
        },
        ...pre,
      ];
    });
    form.setFieldValue("discount_id", newDiscount.id);
  }

  function descriptionChangeHandle(e) {
    setDescription(e);
  }

  const fileChangeHandle = async (key, e) => {
    try {
      const file = e.target.files[0];
      const { secure_url } = await fileService.uploadFile({
        publicId: uuid(),
        file,
      });
      setImages((pre) => {
        const newImages = {
          ...pre,
          [key]: {
            name: secure_url,
          },
        };
        return newImages;
      });
    } catch (error) {
      toastService.error(error.apiMessage);
    }
  };

  async function deleteProductDetailHandle(form_id, remove, name) {
    const formValue = form.getFieldsValue();
    const productDetail = formValue.product_detail_requests[form_id];
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

  const removeUploaded = (index) => {
    setUploadedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Title level={1} style={{ textAlign: "center" }}>
        {" "}
        {productId ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
      </Title>
      {/* <AddCategoryModal
        open={showAddCategoryModal}
        onCreateCategoryFinish={createCategoryFinishHandle}
        onCancel={() => setShowAddCategoryModal(false)}
      />
      <AddBrandModal
        open={showAddBrandModal}
        onAddBrandFinish={createBrandFinishHandle}
        onCancel={() => setShowAddBrandModal(false)}
      />
      <AddMaterialModal
        onAddMaterialFinish={createMaterialFinishHandle}
        open={showMaterialModal}
        onCancel={() => setShowAddMaterialModal(false)}
      /> */}

      {/* <AddDiscountModal
        onAddDiscountFinish={createDiscountFinishHandle}
        open={showAddDiscountModal}
        onCancel={() => setShowAddDiscountModal(false)}
      /> */}
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
              label="Danh mục"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn danh mục",
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
              name="discount_id"
              label="Giảm giá"
            >
              <SelectSearch allowClear options={discountOptions} />
            </Form.Item>
            <Button onClick={() => setShowAddDiscountModal(true)}>
              <i className="fa-solid fa-plus"></i>
            </Button>
          </div>
        </div>

        <div className="product-details-form">
          <Title level={3}>Chi tiết sản phẩm</Title>

          <div className="product-details" style={{ maxWidth: "800px" }}>
            <Form.List name="product_detail_requests">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key}>
                      <div>
                        <Row gutter={[16, 16]}>
                          <Col span={4}>
                            <strong style={{ marginLeft: "10px" }}>Size</strong>
                          </Col>
                          <Col span={4}>
                            <strong style={{ marginLeft: "-14px" }}>
                              Màu sắc
                            </strong>
                          </Col>
                          <Col span={4}>
                            <strong style={{ marginLeft: "-46px" }}>
                              Số lượng
                            </strong>
                          </Col>
                          <Col span={4}>
                            <strong style={{ marginLeft: "-46px" }}>
                              Gía nhập
                            </strong>
                          </Col>
                          <Col span={4}>
                            <strong style={{ marginLeft: "-44px" }}>
                              Gía bán
                            </strong>
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
                          onChange={(e) => {
                            fileChangeHandle(key, e);
                          }}
                          trigger="false"
                        >
                          <Upload
                            beforeUpload={() => false}
                            showUploadList={false}
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
                      <Row gutter={[16, 16]}>
                        {images[key]?.map((image, imageIndex) => (
                          <div
                            key={imageIndex}
                            style={{ position: "relative" }}
                          >
                            <Image width={200} src={image.name || ""} />
                            <Button
                              type="text"
                              icon={<DeleteOutlined />}
                              style={{ position: "absolute", top: 0, right: 0 }}
                              onClick={() => remove(`${name}.${imageIndex}`)}
                            />
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

        <Button className="mt-3" htmlType="submit" type="primary">
          {productId ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
        </Button>
      </Form>
    </div>
  );
};

export { AddProduct };
