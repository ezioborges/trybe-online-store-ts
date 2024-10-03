import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories } from "../services/api";
import { Dispatch, ProductsType } from "../types";
import ProductCard from "../components/ProductCard";
import { getProducts, setProducts } from "../utils/localProducts";

import "../styles/home.css";
import { getQuantity } from "../utils/getQuantity";
import { useDispatch, useSelector } from "react-redux";
import { actionResquestCategoriesSuccessful } from "../redux/actions";
import Categories from "../components/Categories";
import Header from "../components/Header";

function Home() {
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();

  const products = useSelector(
    (state: { productsReducer: { products: ProductsType[] } }) =>
      state.productsReducer.products
  );
  const search = useSelector(
    (state: { productsReducer: { searchProduct: string } }) =>
      state.productsReducer.searchProduct
  );
  console.log("🚀 ~ Home ~ search:", search);

  type ProductsReducerType = {
    productsReducer: {
      searchProducts: string;
      isLoading: boolean;
      products: ProductsType[]
    };
  };

  const isLoading = useSelector((state: ProductsReducerType) => state.productsReducer.isLoading);
  console.log("🚀 ~ Home ~ isLoading:", isLoading)

  const [isLoad, setIsload] = useState(false);
  // const [notFound, setNotFound] = useState(false);
  const [carQuantity, setCarQuantity] = useState<number>(0);

  useEffect(() => {
    const getFetchCategories = async () => {
      const data = await getCategories();
      dispatch(actionResquestCategoriesSuccessful(data));
    };

    const initializeCarQuantity = () => {
      const quant = getQuantity() ?? 0;
      setCarQuantity(quant);
    };

    getFetchCategories();
    initializeCarQuantity();
  }, []);

  const handleProductClick = (prod: ProductsType) => {
    addProductsInShoppingCart(prod);
    navigate(`/product-details/${prod.id}`);
  };

  const addProductsInShoppingCart = (product: ProductsType) => {
    setIsload(true);

    const updateProducts: ProductsType[] = getProducts();
    const totalQuantity = updateProducts.reduce(
      (acc, prod) => acc + prod.quantity,
      0
    );

    setCarQuantity(totalQuantity + 1);

    setProducts(product);

    setIsload(false);
  };

  if (isLoading) return <h1>é meu bom...</h1>;

  return (
    <div className="container-fluid">
      <div className="d-flex">
        <Categories />
        <div className="w-100">
          {/* aqui vai ser onde eu vou colocar a quantidade de produtos que tem no carrinho */}
          <span>{carQuantity}</span>
          <div className="row d-flex align-items-center p-4">
            <Header />
          </div>
          <div className="col d-flex flex-column align-items-center">
            {products.length === 0 && !isLoad && (
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
        </div>
      </div>
    </div>
  );
}

export default Home;
