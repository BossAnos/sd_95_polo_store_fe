import React, { useEffect, useState } from "react";
import {
  brandService,
  categoryService,
  materialService,
  productService,
} from "../../../../service/admin";
import { Image, Select, Checkbox, Button } from "antd";
import { toastService } from "../../../../service/common";
import { selectSearchDataUtil } from "../../../../utils";
import { LoadingBox, LoadingPage } from "../../../common";

const DiscountList = () => {
  const [products, setProducts] = useState([]);
  const [categoryMap, setCategoryMap] = useState({});
  const [brandMap, setBrandMap] = useState({});
  const [materialMap, setMaterialMap] = useState({});
  const [page, setPage] = useState(1);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [materialOptions, setMaterialOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [LIMIT] = useState(10);
  const [activeTab, setActiveTab] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]); // Trạng thái để lưu trữ sản phẩm đã chọn
  const [searchCriteria, setSearchCriteria] = useState({
    keyword: "",
    selectedCategory: null,
    selectedBrand: null,
    selectedMaterial: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const products = await getProducts(searchCriteria);
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
        const materialMap = materialRes.data.reduce((acrr, pre) => {
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
        setMaterialMap(materialMap);
        setLoading(false);
      } catch (e) {
        toastService.error(e.apiMessage);
      }
    })();
  }, [searchCriteria]);

  async function getProducts(form) {
    setLoading(true);
    const { data } = await productService.getAllProducts({
      ...form,
      name: keyword,
    });
    setLoading(false);
    return data;
  }

  const handleCheckboxChange = (productId) => {
    // Tìm sản phẩm trong danh sách sản phẩm đã chọn
    const selectedProductIndex = selectedProducts.findIndex(
      (p) => p === productId
    );

    if (selectedProductIndex > -1) {
      // Nếu sản phẩm đã được chọn trước đó, hãy loại bỏ nó khỏi danh sách đã chọn
      setSelectedProducts((prevSelectedProducts) =>
        prevSelectedProducts.filter((p) => p !== productId)
      );
    } else {
      // Nếu sản phẩm chưa được chọn trước đó, hãy thêm nó vào danh sách đã chọn
      setSelectedProducts((prevSelectedProducts) => [
        ...prevSelectedProducts,
        productId,
      ]);
    }
  };

  const handleCheckboxAllChange = () => {
    if (selectedProducts.length === products.length) {
      // Nếu tất cả sản phẩm đã được chọn, hãy loại bỏ tất cả khỏi danh sách đã chọn
      setSelectedProducts([]);
    } else {
      // Nếu không có sản phẩm nào được chọn hoặc chỉ có một số sản phẩm được chọn, hãy thêm tất cả vào danh sách đã chọn
      setSelectedProducts(products.map((product) => product.id));
    }
  };

  const handleSearch = () => {
    setSearchCriteria({
      keyword,
      selectedCategory,
      selectedBrand,
      selectedMaterial,
    });
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <div className="row mt-3">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-4">
                      <Select
                        placeholder="Loại khuyến mại"
                        options={[
                          { value: "percentage", label: "Phần trăm giảm" },
                          // Add other discount types if needed
                        ]}
                        value={searchCriteria.discountType}
                        onChange={(value) =>
                          setSearchCriteria({
                            ...searchCriteria,
                            discountType: value,
                          })
                        }
                      />
                    </div>
                    <div className="col-3">
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Ngày bắt đầu"
                        value={searchCriteria.startDate}
                        onChange={(e) =>
                          setSearchCriteria({
                            ...searchCriteria,
                            startDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-3">
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Ngày kết thúc"
                        value={searchCriteria.endDate}
                        onChange={(e) =>
                          setSearchCriteria({
                            ...searchCriteria,
                            endDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-2">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Phần trăm giảm"
                        value={searchCriteria.discountPercentage}
                        onChange={(e) =>
                          setSearchCriteria({
                            ...searchCriteria,
                            discountPercentage: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="mb-2">
                    <div className="row">
                      <div className="col-12 d-flex justify-content-between">
                        <div className="row">
                          <div className="col-4">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Tìm kiếm theo tên"
                              value={keyword}
                              onChange={(e) => setKeyword(e.target.value)}
                            />
                          </div>
                          <div className="col-3">
                            <Select
                              placeholder="Danh mục"
                              options={categoryOptions}
                              value={selectedCategory}
                              onChange={(value) => setSelectedCategory(value)}
                            />
                          </div>
                          <div className="col-3">
                            <Select
                              placeholder="Nhãn hiệu"
                              options={brandOptions}
                              value={selectedBrand}
                              onChange={(value) => setSelectedBrand(value)}
                            />
                          </div>
                          <div className="col-2">
                            <Select
                              placeholder="Chất liệu"
                              options={materialOptions}
                              value={selectedMaterial}
                              onChange={(value) => setSelectedMaterial(value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="row">
                      <div className="col-12">
                        <table className="table">
                          <thead>
                            <tr>
                              <th style={{ width: "10px" }}>
                                <div className="form-check">
                                  <Checkbox
                                    checked={
                                      selectedProducts.length ===
                                      products.length
                                    }
                                    onChange={handleCheckboxAllChange}
                                  />
                                </div>
                              </th>
                              <th>STT</th>
                              <th>Tên sản phẩm</th>
                              <th>Hình ảnh</th>
                              <th>Thao tác</th>
                            </tr>
                          </thead>
                          <tbody>
                            {products.map((product, index) => (
                              <tr key={product.id}>
                                <td>
                                  <div className="form-check">
                                    <Checkbox
                                      checked={selectedProducts.includes(
                                        product.id
                                      )}
                                      onChange={() =>
                                        handleCheckboxChange(product.id)
                                      }
                                    />
                                  </div>
                                </td>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    style={{ width: "50px", height: "50px" }}
                                  />
                                </td>
                                <td>{/* Additional actions if needed */}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Add the search form here */}
        </>
      )}
    </>
  );
};

export { DiscountList };
