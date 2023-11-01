import { useTitle } from "ahooks";
import { useTranslation } from "react-i18next";
import { ProductList } from "./component/productList";

function ProductPage() {
  const { t } = useTranslation();
  useTitle(t("Dataset"));
  return (
    <>
      <ProductList />
    </>
  );
}

export default ProductPage;