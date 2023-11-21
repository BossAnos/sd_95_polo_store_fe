import { useEffect, useState } from "react";
import {
  brandService,
  categoryService,
  materialService,
  productService,
} from "../../../service/admin";
import {
  Button,
  Dropdown,
  Form,
  Image,
  Input,
  Pagination,
  Popconfirm,
  Select,
  Space,
} from "antd";
import { toastService } from "../../../../services/common";
import { Link } from "react-router-dom";
import { log } from "util";
import { selectSearchDataUtil } from "../../../../utils";
import { SelectSearch } from "../../../common/SelectSearch";
import { LoadingBox, LoadingPage } from "../../../common";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categoryMap, setCategoryMap] = useState({});
  const [brandMap, setBrandMap] = useState({});
  const [materialMap, setMaterialMap] = useState({});
  const [page, setPage] = useState(1);

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [materialOptions, setMaterialOptions] = useState([]);
  const LIMIT = 10;

  const [loading, setLoading] = useState(true);

  const onPageChange = async (e) => {
    setPage(e);
  };

  useEffect(() => {
    (async () => {
      try {
        const products = await getProducts({});
        const categoryRes = await categoryService.getAllCategory();
        const brandRes = await brandService.getAllBrands();

        const materialRes = await materialService.getAllMaterial();
        const categoryMap = categoryRes.data.reduce((acrr, pre) => {
          acrr = {
            ...acrr,
            [pre.id]: pre.name,
          };
          return acrr;
        }, {});
        const brandMap = brandRes.data.reduce((acrr, pre) => {
          acrr = {
            ...acrr,
            [pre.id]: pre.name,
          };
          return acrr;
        }, {});
        setCategoryOptions(
          selectSearchDataUtil.transformSearchSelectData(
            categoryRes.data,
            "id",
            "name"
          )
        );
        setBrandOptions(
          selectSearchDataUtil.transformSearchSelectData(
            brandRes.data,
            "id",
            "name"
          )
        );
        setMaterialOptions(
          selectSearchDataUtil.transformSearchSelectData(
            materialRes.data,
            "id",
            "name"
          )
        );

        setProducts(products);
        setCategoryMap(categoryMap);
        setBrandMap(brandMap);
        setLoading(false);
      } catch (e) {
        toastService.error(e.apiMessage);
      }
    })();
  }, []);

  async function getProducts(form) {
    setLoading(true);
    const { data } = await productService.getAllProducts(form);
    setLoading(false);
    return data;
  }

  const handleDelete = async (productId) => {
    try {
      setLoading(true);
      await productService.deleteProductById(productId);
      toastService.success("Xóa sản phẩm thành công");
      setProducts(products.filter((p) => p.id != productId));
      if (products?.length === 0) {
        setPage(1);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  async function onSearchHandle(form) {
    const products = await getProducts(form);
    setProducts(products);
    setPage(1);
  }

  return (
    <div>
      <Form layout={"inline"} className="my-3" onFinish={onSearchHandle}>
        <Form.Item name={"name"}>
          <Input placeholder={"Tên sản phẩm"} />
        </Form.Item>
        <Form.Item name={"categoryId"} style={{ width: "166px" }}>
          <SelectSearch
            allowClear
            placeholder={"Danh mục sản phẩm"}
            options={categoryOptions}
          />
        </Form.Item>
        <Form.Item name={"brandId"} style={{ width: "166px" }}>
          <SelectSearch
            allowClear
            placeholder={"Thương hiệu sản phẩm"}
            options={brandOptions}
          />
        </Form.Item>
        <Form.Item name={"materialId"} style={{ width: "166px" }}>
          <SelectSearch
            allowClear
            placeholder={"Chất liệu sản phẩm"}
            options={materialOptions}
          />
        </Form.Item>

        <Form.Item>
          <Button htmlType={"submit"} type={"primary"}>
            Search
          </Button>
        </Form.Item>
      </Form>
      <Link to={"/admin/products/add"}>
        <Button type="primary">Thêm sản phẩm</Button>
      </Link>
      {loading && (
        <div
          style={{
            height: "500px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LoadingBox />
        </div>
      )}
      {!loading && (
        <table className="mt-3 table table-bordered">
          <thead>
            <tr>
              <th>Id</th>

              <th>Tên</th>
              <th style={{ width: "70px" }}>Ảnh</th>
              <th>Danh mục</th>
              <th>Thương hiệu</th>
              <th>Chất Liệu</th>
              <th>Khuyến Mại</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products
              .slice((page - 1) * LIMIT, (page - 1) * LIMIT + LIMIT)
              .map((p) => {
                return (
                  <tr key={p.id}>
                    <td>{p.id}</td>

                    <td>{p.name}</td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "70px",
                      }}
                    >
                      <Image src={p.image} width={50} height={50}></Image>
                    </td>
                    <td>{categoryMap[p.category_id]}</td>
                    <td>{brandMap[p.brand_id]}</td>
                    <td>{p.price_core}</td>
                    <td>
                      <div className="actions">
                        <div className="action update">
                          <Link to={"/admin/products/update/" + p.id}>
                            <button className="btn">
                              <i className="fa-regular fa-pen-to-square"></i>
                            </button>
                          </Link>
                        </div>
                        <div className="action delete">
                          <Popconfirm
                            title="Xóa sản phẩm"
                            description="Bạn có chắc chắn muốn xóa sản phẩm này?"
                            onConfirm={() => handleDelete(p.id)}
                            // onCancel={cancel}
                            okText="Có"
                            cancelText="Không"
                          >
                            <button className="btn">
                              <i className="fa-sharp fa-solid fa-trash"></i>
                            </button>
                          </Popconfirm>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
      <Pagination
        defaultCurrent={1}
        total={products.length}
        pageSize={LIMIT}
        onChange={onPageChange}
      />
      ;
    </div>
  );
};

export { ProductList };
