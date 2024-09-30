import { useEffect, useState } from "react";
import { getProducts } from "../utils/localProducts";
import { useNavigate } from "react-router-dom";
import { ProductsType } from "../types";

function ShoppingSummary() {
  const navigate = useNavigate();
  const [productsArray, setProductsArray] = useState<ProductsType[]>();
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setIsLoad(true);
    const data = getProducts();
    setProductsArray(data);
    setIsLoad(false);
  }, []);

  const initialValue = 0;
  const productsPrices =
    productsArray && productsArray?.map((product) => product.price);
  const productsTotalPrices = productsPrices?.reduce(
    (acc, prices) => acc + prices,
    initialValue
  );

  if (isLoad) return <h1>Loading...</h1>;

  return (
    <>
      {!isLoad && (
        <div
          className="container-fluid overflow-y-scroll overflow-auto"
          style={{ height: "100vh" }}
        >
          <div className="row">
            <button onClick={() => navigate("/")}>Voltar</button>
          </div>
          <div className="row d-flex flex-column justify-content-center align-itmes-center">
            <div
              className="col-4 my-1 d-flex flex-column justify-content-start w-100 overflow-y-scroll overflow-auto"
              style={{ height: "33vh" }}
            >
              <h2>Revise os produtos</h2>
              {productsArray &&
                productsArray.map((product) => (
                  <div
                    key={product.id}
                    className="d-flex justify-content-between w-50"
                  >
                    <div className="w-25">
                      <img
                        src={product.thumbnail}
                        alt={`imagem de ${product.title}`}
                      />
                    </div>
                    <div className="d-flex w-50">
                      <p>{product.title}</p>
                    </div>
                    <div className="w-25">
                      <p>R$ {product.price.toFixed(2).replace(".", ",")}</p>
                    </div>
                  </div>
                ))}
              <p>
                <strong>Total:</strong> R${" "}
                {productsTotalPrices?.toFixed(2).replace(".", ",")}
              </p>
            </div>
            <div
              className="col-4 my-1 w-100"
              style={{ border: "1px solid red" }}
            >
              <h2>Informações do comprador</h2>
              <form>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Email..."
                  />
                  <input type="text" />
                  <input type="text" />
                  <input type="text" />
                </div>
                <div className="mb-3 row">
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                  <input type="text" />
                </div>
                <div>
                  <input type="text" />
                  <input type="text" />
                  <input type="text" />
                  <input type="text" />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
            <div className="col-4">
              <p>col 3</p>
            </div>
          </div>
          <h1>resumo das compras</h1>
        </div>
      )}
    </>
  );
}

export default ShoppingSummary;
