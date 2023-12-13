import { useEffect, useState } from "react";
import {
  brandService,
  categoryService,
  discountService,
  productService,
} from "../../../../service/admin";
import { toastService } from "../../../../service/common";

const ProductPage = () => {
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [products, setProducts] = useState([]);
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const products = await getProducts({});
        const { data } = await discountService.getAllDiscount({});
        setSelectedDiscount(selectedDiscount);
        setProducts(products);
        setDiscounts(data);
        console.log(products);
        console.log(discounts);
      } catch (e) {
        toastService.error(e.apiMessage);
      }
    })();
  }, []);

  async function getProducts(form) {
    const { data } = await productService.getAllProducts({});
    return data;
  }

  const handleDiscountChange = (event) => {
    const discountId = event.target.value;
    const selectedDiscount = discounts.find(
      (discount) => discount.id === parseInt(discountId, 10)
    );
    setSelectedDiscount(selectedDiscount);
  };

  const handleProductCheckboxChange = (event, productId) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      const updatedProducts = products.map((product) => {
        if (product.id === productId) {
          return { ...product, discount: selectedDiscount };
        }
        return product;
      });
      setProducts(updatedProducts);
    } else {
      const updatedProducts = products.map((product) => {
        if (product.id === productId) {
          const { discount, ...updatedProduct } = product;
          return updatedProduct;
        }
        return product;
      });
      setProducts(updatedProducts);
    }
  };

  return (
    <div>
      <h1>Select Discount</h1>
      <select onChange={handleDiscountChange}>
        <option value="">Select a discount</option>
        {discounts.map((discount) => (
          <option key={discount.id} value={discount.id}>
            {discount.name}
            {discount.discount}
          </option>
        ))}
      </select>

      {selectedDiscount && (
        <div>
          <h2>Discount Details</h2>
          <div>
            <label>Tên khuyến mại:</label>
            <input type="text" value={selectedDiscount.name} disabled />
          </div>
          <div>
            <label>Gía trị khuyến mại:</label>
            <input type="text" value={selectedDiscount.discount} disabled />
          </div>
          <div>
            <label>Mô tả:</label>
            <input type="text" value={selectedDiscount.description} disabled />
          </div>
          <div>
            <label>Ngày bắt đầu :</label>
            <input type="text" value={selectedDiscount.startDate} disabled />
          </div>
          <div>
            <label>Ngày kết thúc:</label>
            <input type="text" value={selectedDiscount.endDate} disabled />
          </div>
        </div>
      )}

      <h2>Product List</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={product.discount === selectedDiscount}
                    onChange={(event) =>
                      handleProductCheckboxChange(event, product.id)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export { ProductPage };
