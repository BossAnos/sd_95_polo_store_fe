import { useContext, useEffect, useState } from "react";
import "./HomePage.css";
import { productService } from "../../../service/admin";
import { Link } from "react-router-dom";
import { ProductBox } from "../Product/ProductBox";
import { Pagination } from "antd";
import { usePagination } from "../../../hook";
import { toastService } from "../../../service/common";
import { useUserStore } from "../../../layout/store";
import { EmptyPage, LoadingBox } from "../../common";
import "./HomePage.css";
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const pagination = usePagination(products, 20);
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useUserStore();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const productRes = await productService.getAllProductsForUser();
        setProducts(productRes.data);
        setLoading(false);
      } catch (error) {
        toastService.error(error.apiMessage);
      }
    })();
  }, []);

  // if (!products || products.length === 0) {
  //     return <EmptyPage description={'No products'} />
  // }

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
            <div className="carousel-item">
              <div className="carousel-item_title">
                <h4>for kids</h4>
                <h1>Spring collection</h1>
                <button className="btn btn-solid">Shop now</button>
              </div>
              <img
                className="d-block w-100"
                src="http://themes.pixelstrap.com/multikart/assets/images/home-banner/22.jpg"
                alt="Second slide"
              />
            </div>
            <div className="carousel-item">
              <div className="carousel-item_title">
                <h4>for woman</h4>
                <h1>Spring collection</h1>
                <button className="btn btn-solid">Shop now</button>
              </div>
              <img
                className="d-block w-100"
                src="http://themes.pixelstrap.com/multikart/assets/images/home-banner/2.jpg"
                alt="Third slide"
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
        <div className="row">
          {pagination.currentData().map((product) => {
            return <ProductBox key={product.id} product={product} />;
          })}
        </div>
        <div
          className="pagination"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Pagination
            onChange={(e) => pagination.jump(e)}
            total={products?.length}
            current={pagination.getCurrentPage()}
            pageSize={pagination.getItemPerPage()}
          />
        </div>
      </div>
    </div>
  );
};

export { HomePage };
