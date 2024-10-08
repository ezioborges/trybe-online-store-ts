import { useEffect } from "react";
import { getCategories } from "../services/api";
import { Dispatch, ProductsReducerType } from "../types";

import "../styles/home.css";
import { getQuantity } from "../utils/getQuantity";
import { useDispatch, useSelector } from "react-redux";
import {
  actionResquestCategoriesSuccessful,
  actionUpdateQauntity,
} from "../redux/actions";
import Categories from "../components/Categories";
import Header from "../components/Header";
import ProductsList from "../components/ProductsList";

function Home() {
  const dispatch: Dispatch = useDispatch();

  const isLoading = useSelector(
    (state: ProductsReducerType) => state.productsReducer.isLoading
  );
  console.log("🚀 ~ Home ~ isLoading:", isLoading);
  const productsQuantity = useSelector(
    (state: ProductsReducerType) => state.productsReducer.productsQuantity
  );

  // const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const getFetchCategories = async () => {
      const data = await getCategories();
      dispatch(actionResquestCategoriesSuccessful(data));
    };

    const initializeCarQuantity = () => {
      const quant = getQuantity() ?? 0;
      dispatch(actionUpdateQauntity(quant));
    };

    getFetchCategories();
    initializeCarQuantity();
  }, []);

  if (isLoading) return <h1>é meu bom...</h1>;

  return (
    <div className="container-fluid">
      <div className="d-flex">
        <Categories />
        <div className="w-100">
          <div className="d-flex justify-content-end">
            <div className="d-flex justify-content-center align-items-center quantity-position rounded-circle bg-danger text-white fw-bold">
              <span>{productsQuantity}</span>
            </div>
          </div>
            <Header />
            <ProductsList />
        </div>
      </div>
    </div>
  );
}

export default Home;
