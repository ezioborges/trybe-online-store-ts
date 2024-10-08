import { useEffect, useState } from "react";
import { getProducts } from "../utils/localProducts";
import { useNavigate } from "react-router-dom";
import {
  AdressInfo,
  Dispatch,
  ProductsReducerType,
  ProductsType,
} from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  actionPayment,
  actionPurchaseCompleted,
  actionSetLoading,
} from "../redux/actions";

function ShoppingSummary() {
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();

  const loading = useSelector(
    (state: ProductsReducerType) => state.productsReducer.isLoading
  );

  const [productsArray, setProductsArray] = useState<ProductsType[]>();
  const [payment, setPayment] = useState<string | null>(null);

  const [adressInfo, setAdressInfo] = useState<AdressInfo>({
    name: "",
    cpf: "",
    email: "",
    phone: "",
    cep: "",
    adress: "",
    complemente: "",
    number: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    dispatch(actionSetLoading(true));
    const data = getProducts();
    setProductsArray(data);
    dispatch(actionSetLoading(false));
  }, []);

  const handleChangeAdress = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setAdressInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    dispatch(
      actionPurchaseCompleted({
        ...adressInfo,
        [name]: value,
      })
    );
  };

  const handlePaymentClick = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = target;

    setPayment((prev) => {
      const newPayment = prev === name ? null : name;
      dispatch(actionPayment(newPayment));
      return newPayment;
    });
  };

  const initialValue = 0;
  const productsPrices =
    productsArray && productsArray?.map((product) => product.price);
  const productsTotalPrices = productsPrices?.reduce(
    (acc, prices) => acc + prices,
    initialValue
  );

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      {!loading && (
        <form
          className="container-fluid overflow-y-scroll overflow-auto"
          style={{ height: "100vh" }}
        >
          <div className="row">
            <button className="btn btn-success" onClick={() => navigate("/")}>
              Voltar
            </button>
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
                    value={adressInfo.name}
                    className="form-control m-1"
                    style={{ width: "60vw" }}
                    placeholder="Nome Completo"
                    onChange={handleChangeAdress}
                  />
                  <input
                    type="text"
                    name="cpf"
                    value={adressInfo.cpf}
                    className="form-control m-1"
                    style={{ width: "60vw" }}
                    placeholder="CPF"
                    onChange={handleChangeAdress}
                  />
                  <input
                    type="email"
                    value={adressInfo.email}
                    name="email"
                    className="form-control m-1"
                    style={{ width: "60vw" }}
                    placeholder="Email"
                    onChange={handleChangeAdress}
                  />
                  <input
                    type="text"
                    name="phone"
                    value={adressInfo.phone}
                    className="form-control m-1"
                    style={{ width: "60vw" }}
                    placeholder="Telefone"
                    onChange={handleChangeAdress}
                  />
                </div>
                <div className="d-flex">
                  <input
                    type="text"
                    name="cep"
                    value={adressInfo.cep}
                    className="form-control m-1"
                    style={{ width: "38vw" }}
                    placeholder="CEP"
                    onChange={handleChangeAdress}
                  />
                  <input
                    type="text"
                    name="adress"
                    value={adressInfo.adress}
                    className="form-control m-1"
                    style={{ width: "116vw" }}
                    placeholder="Endereço"
                    onChange={handleChangeAdress}
                  />
                </div>
                <div className="d-flex">
                  <input
                    type="text"
                    name="complemente"
                    value={adressInfo.complemente}
                    className="form-control m-1"
                    style={{ width: "60vw" }}
                    placeholder="Complemento"
                    onChange={handleChangeAdress}
                  />
                  <input
                    name="number"
                    value={adressInfo.number}
                    style={{ width: "20vw" }}
                    className="form-control m-1"
                    placeholder="Número"
                    onChange={handleChangeAdress}
                  />
                  <input
                    type="text"
                    name="city"
                    style={{ width: "98vw" }}
                    value={adressInfo.city}
                    className="form-control m-1"
                    placeholder="Cidade"
                    onChange={handleChangeAdress}
                  />
                  <input
                    type="text"
                    name="state"
                    value={adressInfo.state}
                    className="form-control m-1"
                    style={{ width: "60vw" }}
                    placeholder="Estado"
                    onChange={handleChangeAdress}
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
                      checked={payment === "ticket"}
                      onChange={handlePaymentClick}
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
                      checked={payment === "credit"}
                      onChange={handlePaymentClick}
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
                      checked={payment === "debit"}
                      onChange={handlePaymentClick}
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
            <button
              onClick={() => navigate("/purchase-completed")}
              className="btn btn-primary btn-lg"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default ShoppingSummary;
