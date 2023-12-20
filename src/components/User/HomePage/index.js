import { useContext, useEffect, useState } from "react";
import "./HomePage.css";
import {
  productService,
  brandService,
  categoryService,
  materialService,
} from "../../../service/admin";
import { Link } from "react-router-dom";
import { ProductBox } from "../Product/ProductBox";
import { Pagination } from "antd";
import { usePagination } from "../../../hook";
import { toastService } from "../../../service/common";
import { useUserStore } from "../../../layout/store";
import { EmptyPage, LoadingBox } from "../../common";
import { Slider, Select, Input, Form } from "antd";
import "./HomePage.css";

const { Option } = Select;
const { Item } = Form;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]); // Fetch brands data
  const [categories, setCategories] = useState([]); // Fetch categories data
  const [materials, setMaterials] = useState([]); // Fetch materials data
  const pagination = usePagination(products, 10);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productRes = await productService.getAllProductsForUser();
        const brandRes = await brandService.getAllBrands();
        const categoryRes = await categoryService.getAllCategory();
        const materialRes = await materialService.getAllMaterial();

        setProducts(productRes.data);
        setBrands(brandRes.data);
        setCategories(categoryRes.data);
        setMaterials(materialRes.data);

        setLoading(false);
      } catch (error) {
        toastService.error(error.apiMessage);
      }
    };

    fetchData();
  }, []);

  const filterProducts = () => {
    return products.filter((product) => {
      const brandFilter = !selectedBrand || product.nameBrand === selectedBrand;
      const categoryFilter =
        !selectedCategory || product.nameCategory === selectedCategory;
      const materialFilter =
        !selectedMaterial || product.nameMaterial === selectedMaterial;
      const priceFilter =
        product.price >= priceRange.min && product.price <= priceRange.max;
      const nameFilter = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return (
        brandFilter &&
        categoryFilter &&
        materialFilter &&
        priceFilter &&
        nameFilter
      );
    });
  };

  const handleBrandChange = (value) => {
    setSelectedBrand(value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleMaterialChange = (value) => {
    setSelectedMaterial(value);
  };

  const handlePriceRangeChange = (value) => {
    setPriceRange({ min: value[0], max: value[1] });
  };

  return (
    <div className="home_page">
      <div className="home_page_slide">
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
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src="https://file.hstatic.net/1000369857/collection/1919_730_polo_3da01ded33614497a1884a3b99489661.jpg"
                alt="First slide"
              />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
      <div className="container home_page_products">
        <div className="filter-options">
          <Form layout="vertical">
            <div style={{ display: "flex", marginBottom: "16px" }}>
              {/* Search by name */}
              <Item label="Tên sản phẩm" style={{ marginRight: "16px" }}>
                <Input
                  style={{ width: "200px" }}
                  type="text"
                  placeholder="Search by name"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </Item>

              {/* Select Brand */}
              <Item label="Thương hiệu" style={{ marginRight: "16px" }}>
                <Select
                  style={{ width: "200px" }}
                  placeholder="Select Brand"
                  onChange={handleBrandChange}
                  value={selectedBrand}
                >
                  <Option value="">Select Brand</Option>
                  {brands.map((brand) => (
                    <Option key={brand.id} value={brand.name}>
                      {brand.name}
                    </Option>
                  ))}
                </Select>
              </Item>

              {/* Select Category */}
              <Item label="Loại áo" style={{ marginRight: "16px" }}>
                <Select
                  style={{ width: "200px" }}
                  placeholder="Select Category"
                  onChange={handleCategoryChange}
                  value={selectedCategory}
                >
                  <Option value="">Select Category</Option>
                  {categories.map((category) => (
                    <Option key={category.id} value={category.name}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </Item>

              {/* Select Material */}
              <Item label="Chất liệu" style={{ marginRight: "16px" }}>
                <Select
                  style={{ width: "200px" }}
                  placeholder="Select Material"
                  onChange={handleMaterialChange}
                  value={selectedMaterial}
                >
                  <Option value="">Select Material</Option>
                  {materials.map((material) => (
                    <Option key={material.id} value={material.name}>
                      {material.name}
                    </Option>
                  ))}
                </Select>
              </Item>

              {/* Price Range */}
              <Item label="Giá">
                <Slider
                  style={{ width: "200px" }}
                  range
                  min={0}
                  max={1000000}
                  value={[priceRange.min, priceRange.max]}
                  onChange={handlePriceRangeChange}
                />
                <div>
                  <span style={{ marginRight: 10 }}>
                    Min Price: {priceRange.min.toLocaleString()}
                  </span>
                  <span>Max Price: {priceRange.max.toLocaleString()} đ</span>
                </div>
              </Item>
            </div>
          </Form>
        </div>

        <br></br>

        <br></br>

        <h1
          style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px" }}
        >
          Danh sách sản phẩm
        </h1>
        <br></br>
        <div className="row">
          {filterProducts().length === 0 ? (
            <EmptyPage description={"No products match the selected filters"} />
          ) : (
            // Render product boxes only if there are products to display
            pagination
              .currentData()
              .map((product) => (
                <ProductBox key={product.id} product={product} />
              ))
          )}
        </div>
        <div
          className="pagination"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Pagination
            onChange={(e) => pagination.jump(e)}
            total={filterProducts().length}
            current={pagination.getCurrentPage()}
            pageSize={pagination.getItemPerPage()}
          />
        </div>
      </div>
    </div>
  );
};

export { HomePage };
