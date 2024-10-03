import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getCategories,
  getProductsByQuery,
} from "../services/api";
import { Dispatch, ProductsType } from "../types";
import ProductCard from "../components/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { getProducts, setProducts } from "../utils/localProducts";

import "../styles/home.css";
import { getQuantity } from "../utils/getQuantity";
import { useDispatch } from "react-redux";
import { actionResquestCategoriesSuccessful } from "../redux/actions";
import Categories from "../components/Categories";

function Home() {
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();

  const [searchProduct, setSearchProduct] = useState("");
  const [productsArray, setProductsArray] = useState<ProductsType[]>([]);
  const [isLoad, setIsload] = useState(false);
  const [notFound, setNotFound] = useState(false);
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

  const handleClick = () => {
    navigate("/shopping-cart");
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setSearchProduct(value);
  };

  const handleSearchProducts = async () => {
    setIsload(true);
    const searchedProducts = await getProductsByQuery(searchProduct);

    if (searchedProducts.length === 0) {
      setNotFound(true);
    }

    setProductsArray(searchedProducts || []);
    setSearchProduct("");
    setIsload(false);
  };

  // const handleGetProductByCategoryId = async (categoryId: string) => {
  //   setIsload(true);
  //   const productsByCategory = await getProductsByCategoryId(categoryId);

  //   dispatch(actionSetProductsByCategories(productsByCategory || []));
  //   setIsload(false);
  // };

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

  if (isLoad) return <h1>Loading...</h1>;

  return (
    <div className="container-fluid">
      <div className="d-flex">
        <Categories />
        <div className="w-100">
          <div className="row d-flex align-items-center p-4">
            <div className="col d-flex justify-content-around">
              <div className="d-flex w-75">
                <input
                  type="text"
                  className="form-control h-50"
                  placeholder="Faça aqui sua pesquisa"
                  name="search"
                  value={searchProduct}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-success ms-2 h-50"
                  onClick={handleSearchProducts}
                >
                  Pesquisar
                </button>
              </div>
              <div className="d-flex flex-column align-items-end w-25">
                <div
                  className="d-flex justify-content-center border bg-danger border-danger rounded-circle quantity-position"
                  style={{ width: "1vw" }}
                >
                  <span className="text-white fw-bold">{carQuantity}</span>
                </div>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleClick}
                >
                  <span>
                    <FontAwesomeIcon icon={faCartShopping} />
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="col d-flex flex-column align-items-center">
            {productsArray.length === 0 && !isLoad && !notFound && (
              <h2>Digite algum termo de pesquisa ou escolha uma categoria.</h2>
            )}
            <ul
              className="list-unstyled w-100 overflow-y-scroll overflow-auto products-list"
              style={{ height: "85vh" }}
            >
              {productsArray &&
                productsArray.map((prod) => (
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
              {notFound && (
                <div className="d-flex justify-content-center">
                  <h2>Nenhum produto encontrado</h2>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
