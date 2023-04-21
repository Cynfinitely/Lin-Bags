import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Open from "pages/Open";
import Login from "pages/Login";
import AddProduct from "pages/AddProduct";
import UpdateProduct from "pages/UpdateProduct";
import DeleteProduct from "pages/DeleteProduct";
import PrivateRoute from "../PrivateRoute";
import Dashboard from "pages/Dashboard";
import NavigationBar from "../Navbar/Navbar";
import "./Styles/App.css";
import Header from "../Header/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Open />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/deleteProduct" element={<DeleteProduct />} />
        <Route path="/updateProduct/:productId" element={<UpdateProduct />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
