import { Routes, Route } from "react-router-dom";
import LoginPage from "./screens/LoginPage/LoginPage";
import RegisterPage from "./screens/RegisterPage/RegisterPage";
import ErrorPage from "./screens/ErrorPage/ErrorPage";
import ForgotPassPage from "./screens/ForgotPage/ForgotPassPage";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ResetPass from "./component/ForgotPass/ResetPass";
import FoodScreen from "./screens/Homepage/FoodScreen";
import AdminDashboard from "./screens/AdminPage/AdminDashboard";
import Profiles from "./component/Admin/Profile/Profiles";
import Orders from "./component/Admin/Orders/Orders";
import AddItmes from "./component/Admin/AddItems/AddItmes";
import CartPage from "./screens/CartPage/CartPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FoodScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/password-reset" element={<ForgotPassPage />} />
        <Route path="/forgotpassword/:id/:token" element={<ResetPass />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/userdetails" element={<Profiles />} />
        <Route path="/orderdetails" element={<Orders />} />
        <Route path="/additems" element={<AddItmes />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
