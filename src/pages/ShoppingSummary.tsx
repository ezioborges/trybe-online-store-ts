import { useEffect, useState } from "react";
import { getProducts } from "../utils/localProducts";
import { useNavigate } from "react-router-dom";
import { ProductsType } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode, faCreditCard } from "@fortawesome/free-solid-svg-icons";

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
        <form
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
            <div className="col-4 my-1 p-3 w-100">
              <h2>Informações do comprador</h2>
              <div>
                <div className="d-flex">
                  <input
                    type="text"
                    name="name"
                    // value={}
                    className="form-control m-1"
                    style={{ width: "60vw" }}
                    placeholder="Nome Completo"
                  />
                  <input
                    type="text"
                    name="cpf"
                    // value={}
                    className="form-control m-1"
                    style={{ width: "60vw" }}
                    placeholder="CPF"
                  />
                  <input
                    type="email"
                    // value={}
                    name="email"
                    className="form-control m-1"
                    style={{ width: "60vw" }}
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    name="phone"
                    // value={}
                    className="form-control m-1"
                    style={{ width: "60vw" }}
                    placeholder="Telefone"
                  />
                </div>
                <div className="d-flex">
                  <input
                    type="text"
                    name="cep"
                    // value={}
                    className="form-control m-1"
                    style={{ width: "38vw" }}
                    placeholder="CEP"
                  />
                  <input
                    type="text"
                    name="adress"
                    // value={}
                    className="form-control m-1"
                    style={{ width: "116vw" }}
                    placeholder="Endereço"
                  />
                </div>
                <div className="d-flex">
                  <input
                    type="text"
                    name="complemente"
                    // value={}
                    className="form-control m-1"
                    style={{ width: "60vw" }}
                    placeholder="Complemento"
                  />
                  <input
                    name="number"
                    // value={}
                    style={{ width: "20vw" }}
                    className="form-control m-1"
                    placeholder="Número"
                  />
                  <input
                    type="text"
                    name="city"
                    style={{ width: "98vw" }}
                    // value={}
                    className="form-control m-1"
                    placeholder="Cidade"
                  />
                  <input
                    type="text"
                    name="state"
                    // value={}
                    className="form-control m-1"
                    style={{ width: "60vw" }}
                    placeholder="Estado"
                  />
                </div>
              </div>
            </div>
            <h2>Método de pagamento</h2>
            <div className="col-4 w-100 d-flex flex-column align-items-start justify-content-center p-5 bg-light">
              <div className="w-75 d-flex justify-content-around">
                <div className="w-100 d-flex flex-column">
                  <label htmlFor="ticket" className="form-label">
                    Boleto
                  </label>
                  <div className="w-50 d-flex justify-content-around align-items-center">
                    <input
                      type="radio"
                      name="ticket"
                      className="form-check-input"
                    />
                    <span>
                      <FontAwesomeIcon icon={faBarcode} size="6x" />
                    </span>
                  </div>
                </div>
                <div className="w-100 d-flex flex-column">
                  <label htmlFor="credit" className="form-label">
                    Crédito
                  </label>
                  <div className="w-50 d-flex justify-content-around align-items-center">
                    <input
                      type="radio"
                      name="credit"
                      className="form-check-input"
                      placeholder="Disabled input"
                    />
                    <span>
                      <FontAwesomeIcon
                        icon={faCreditCard}
                        className="text-primary"
                        size="6x"
                      />
                    </span>
                  </div>
                </div>
                <div className="w-100 d-flex flex-column">
                  <label htmlFor="debit" className="form-label">
                    Débito
                  </label>
                  <div className="w-50 d-flex justify-content-around align-items-center">
                    <input
                      id="debit"
                      type="radio"
                      name="debit"
                      className="form-check-input"
                    />
                    <span>
                      <FontAwesomeIcon
                        icon={faCreditCard}
                        className="text-success"
                        size="6x"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-100 p-2 d-flex justify-content-center align-items-center">
            <button type="submit" className="btn btn-primary btn-lg">
              Submit
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default ShoppingSummary;
