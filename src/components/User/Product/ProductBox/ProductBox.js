import { Link } from "react-router-dom";
import "./ProductBox.css";

const ProductBox = ({ product }) => {
  return (
    <div className="product-box">
      <Link to={`/products/${product.id}`}>
        <div className="img-wrapper">
          <img className="img-fluid product-image" src={product.image} />
        </div>
        <div className="product-detail">
          <h6>{product.name}</h6>
          <div className="prices">
            <h4>
              <span className="price-cost">{product.price}VNĐ</span>
              <span className="ml-1 discount">
                ({product.promotionPercent || 0}%)
              </span>
            </h4>
            <h4 className="sale-price">{product.pricecost}</h4>
          </div>

          <ul className="color-variant">
            <li className="bg-light0"></li>
            <li className="bg-light1"></li>
            <li className="bg-light2"></li>
          </ul>
        </div>
      </Link>
    </div>
  );
};

export { ProductBox };
