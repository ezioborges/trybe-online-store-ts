import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import { useEffect, useState } from "react";
import { getCategories, getProductsByQuery } from "../services/api";
import { CategoriesType, ProcutsCardType } from "../types";
import ProductCard from "../components/ProductCard";

function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [productsByQuery, setProductsByQuery] = useState<ProcutsCardType[]>([]);
  const [isLoad, setIsload] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const getFetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    getFetchCategories();
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

    setProductsByQuery(searchedProducts || []);
    setSearchProduct("");
    setIsload(false);
  };



  if (isLoad) return <h1>Loading...</h1>;

  return (
    <div className="container-fluid">
      <div className="d-flex">
        <div
          style={{ flex: "0 0 15%", height: "100vh" }}
          className="overflow-y-scroll border-end"
        >
          <h2 className="text-center">Categorias</h2>
          {categories.map((categorie) => (
            <button className="w-100 btn btn-light" key={categorie.id}>
              {categorie.name}
            </button>
          ))}
        </div>
        <div className="w-100">
          <div className="row d-flex align-items-center p-4">
            <div className="col d-flex justify-content-between">
              <div className="d-flex w-75">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Faça aqui sua pesquisa"
                  name="search"
                  value={searchProduct}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-success ms-2"
                  onClick={handleSearchProducts}
                >
                  Pesquisar
                </button>
              </div>
              <button className="btn btn-primary" onClick={handleClick}>
                Carrinho de Compras
              </button>
            </div>
          </div>
          <div
            className="col d-flex flex-column align-items-center"
            style={{ padding: "20px" }}
          >
            {productsByQuery.length === 0 && !isLoad && !notFound && (
              <h2>Digite algum termo de pesquisa ou escolha uma categoria.</h2>
            )}
            <ul className="list-unstyled w-100 overflow-y-scroll" style={{ height: '85vh' }}>
              {productsByQuery &&
                productsByQuery.map((prod) => (
                  <li key={prod.id} className="mb-3">
                    <ProductCard
                      title={prod.title}
                      img={prod.thumbnail}
                      price={prod.price}
                    />
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
