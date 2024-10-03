import { useDispatch, useSelector } from "react-redux";
import { CategoriesStateType } from "../types";
import { useState } from "react";
import { actionSetProductsByCategories } from "../redux/actions";
import { getProductsByCategoryId } from "../services/api";

function Categories() {
  const dispatch = useDispatch();

  const categories = useSelector(
    (state: { categoriesReducer: { categories: CategoriesStateType } }) =>
      state.categoriesReducer.categories
  );
  console.log("🚀 ~ Categories ~ é aonde eu quero memo:", categories);

  const [isLoad, setIsLoad] = useState(false);

  const handleGetProductByCategoryId = async (categoryId: string) => {
    setIsLoad(true);
    const productsByCategory = await getProductsByCategoryId(categoryId);

    dispatch(actionSetProductsByCategories(productsByCategory || []));
    setIsLoad(false);
  };

  if (isLoad) return <h1>Carregando...</h1>;

  return (
    <div
      className="overflow-y-scroll overflow-auto border-end"
      style={{ flex: "0 0 15%", height: "100vh" }}
    >
      <h2 className="text-center">Categorias</h2>
      {/* o Array.isArray() verica se categories é um array. Está sendo utilizado por problemas na tipagem */}
      {Array.isArray(categories) && categories.length > 0 ? (
        categories.map((categorie) => (
          <button
            className="w-100 btn btn-light"
            key={categorie.id}
            onClick={() => handleGetProductByCategoryId(categorie.id)}
          >
            {categorie.name}
          </button>
        ))
      ) : (
        <p>Nenhuma categoria disponível</p>
      )}
    </div>
  );
}

export default Categories;
