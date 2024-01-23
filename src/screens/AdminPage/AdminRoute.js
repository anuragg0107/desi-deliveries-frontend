import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminRoute = (isAdmin) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin, navigate]);
};

export default AdminRoute;
