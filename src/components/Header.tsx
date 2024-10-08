import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch } from "../types";
import { useDispatch, useSelector } from "react-redux";
import {
  actionRequestProductsBySearch,
  actionSetLoading,
  actionSetProductsBySearch,
} from "../redux/actions";
import { getProductsByQuery } from "../services/api";
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch: Dispatch = useDispatch();
  const navigate = useNavigate();

  const searchProduct = useSelector(
    (state: { productsReducer: { searchProduct: string } }) =>
      state.productsReducer.searchProduct
  );

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    dispatch(actionRequestProductsBySearch(value));
  };

  const handleSearchProducts = async () => {
    dispatch(actionSetLoading(true));
    const searchedProducts = await getProductsByQuery(searchProduct);

    // if (searchedProducts.length === 0) {
    //   setNotFound(true);
    // }

    dispatch(actionSetProductsBySearch(searchedProducts || []));
  };

  const handleClick = () => {
    navigate("/shopping-cart");
  };

  return (
    <div className="row d-flex align-items-center px-4 pb-4">
      <div className="col d-flex justify-content-around">
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
        <div className="d-flex flex-column align-items-end w-25">
          <button className="btn btn-primary btn-lg" onClick={handleClick}>
            <span>
              <FontAwesomeIcon icon={faCartShopping} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
