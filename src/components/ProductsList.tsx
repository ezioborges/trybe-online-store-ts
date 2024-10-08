import { useDispatch, useSelector } from "react-redux";
import { Dispatch, ProductsReducerType, ProductsType } from "../types";
import ProductCard from "./ProductCard";
import { getProducts, setProducts } from "../utils/localProducts";
import { useNavigate } from "react-router-dom";
import { actionUpdateQauntity } from "../redux/actions";

function ProductsList() {
  const dispatch: Dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector(
    (state: ProductsReducerType) => state.productsReducer.products
  );
  const loading = useSelector(
    (state: ProductsReducerType) => state.productsReducer.isLoading
  );

  const handleProductClick = (prod: ProductsType) => {
    navigate(`/product-details/${prod.id}`);
    addProductsInShoppingCart(prod);
  };

  const addProductsInShoppingCart = (product: ProductsType) => {
    const updateProducts: ProductsType[] = getProducts() || [];

    let productsQuantity = updateProducts.reduce(
      (acc, products) => acc + products.quantity,
      0
    );
      
    productsQuantity = productsQuantity === 0 ? 1 : productsQuantity + 1;

    dispatch(actionUpdateQauntity(productsQuantity));

    setProducts(product);
  };

  return (
    <div className="col d-flex flex-column align-items-center">
      {products.length === 0 && !loading && (
        <h2>Digite algum termo de pesquisa ou escolha uma categoria.</h2>
      )}
      <ul
        className="list-unstyled w-100 overflow-y-scroll overflow-auto products-list"
        style={{ height: "85vh" }}
      >
        {Array.isArray(products) &&
          products.map((prod) => (
            <li
              key={prod.id}
              className="d-flex flex-column align-items-center mb-3"
            >
              <div
                onClick={() => handleProductClick(prod)}
                style={{ cursor: "pointer" }}
              >
                <ProductCard
                  title={prod.title}
                  img={prod.thumbnail}
                  price={prod.price}
                />
              </div>
              <button
                className="btn btn-primary"
                onClick={() => addProductsInShoppingCart(prod)}
              >
                Adicionar ao Carrinho
              </button>
            </li>
          ))}
        {/* {notFound && (
                <div className="d-flex justify-content-center">
                  <h2>Nenhum produto encontrado</h2>
                </div>
              )} */}
      </ul>
    </div>
  );
}

export default ProductsList;
