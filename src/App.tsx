import "./App.css";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import ShoppingCart from "./pages/ShoppingCart";
import ProductDetails from "./pages/ProductDetails";
import ShoppingSummary from "./pages/ShoppingSummary";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route index element={<Home />} />
        <Route path='/product-details/:id' element={ <ProductDetails /> }/>
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/shopping-summary" element={ <ShoppingSummary /> } />
      </Route>
      <Route path="/*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
