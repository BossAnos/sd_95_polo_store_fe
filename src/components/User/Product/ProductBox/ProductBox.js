import { Link } from "react-router-dom";
import "./ProductBox.css";

const ProductBox = ({ product }) => {
  return (
    <div className="product-box">
      <Link to={`/products/${product.id}`}>
        <div className="img-wrapper">
          <img className="img-fluid product-image" src={product.image} />
          {product.promotionPercent !== 0 && (
            <span className="promotion-percent">
              {product.promotionPercent}%
            </span>
          )}
        </div>
        <div className="product-detail">
          <h6 className="product-name">{product.name}</h6>
          <div className="prices">
            {product.promotionPercent ? (
              <>
                <span className="original-price">
                  {product.price.toLocaleString()} VNĐ
                </span>
                {product.pricecost !== 0 && (
                  <span className="discounted-price">
                    {product.pricecost.toLocaleString()} VNĐ
                  </span>
                )}
              </>
            ) : (
              <span className="original-price-2">
                {product.price.toLocaleString()} VNĐ
              </span>
            )}
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
