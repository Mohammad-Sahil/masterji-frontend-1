import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ Role, element: Element }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.User);
  if (loading === false) {
    if (isAuthenticated === false) {
      return <Navigate to="/login" />;
    }
    if(Role){

        if ((Role.includes('admin') ? ( user && user.Role !== "admin") : true) && (Role.includes('developer') ? ( user && user.Role !== "developer") : true) && (Role.includes('analyser') ? ( user && user.Role !== "analyser") : true) && (Role.includes('manager') ? ( user && user.Role !== "manager") : true) && (Role.includes('user_manager') ? ( user && user.Role !== "user_manager") : true) && (Role.includes('sales') ? ( user && user.Role !== "sales") : true) && (Role.includes('customer') ? ( user && user.Role !== "customer") : true) && (Role.includes('booking_manager') ? ( user && user.Role !== "booking_manager") : true) && (Role.includes('fabric_sourcing') ? ( user && user.Role !== "fabric_sourcing") : true) && (Role.includes('fashion_consultant') ? ( user && user.Role !== "fashion_consultant") : true) && (Role.includes('tailor') ? ( user && user.Role !== "tailor") : true) && (Role.includes('delivery_partner') ? ( user && user.Role !== "delivery_partner") :true)) {
            return <Navigate to="/login" />;
        }
    }
        return <Element />;
  }
};

export default Protected;
