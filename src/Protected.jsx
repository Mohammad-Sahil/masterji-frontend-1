import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ Role, element: Element }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.User);
  if (loading === false) {
    if (isAuthenticated === false) {
      return <Navigate to="/login" />;
    }
    if(Role){

        if ((Role.includes('admin') ? ( user && user.role !== "admin") : true) && (Role.includes('developer') ? ( user && user.role !== "developer") : true) && (Role.includes('analyser') ? ( user && user.role !== "analyser") : true) && (Role.includes('manager') ? ( user && user.role !== "manager") : true) && (Role.includes('user_manager') ? ( user && user.role !== "user_manager") : true) && (Role.includes('sales') ? ( user && user.role !== "sales") : true) && (Role.includes('customer') ? ( user && user.role !== "customer") : true) && (Role.includes('booking_manager') ? ( user && user.role !== "booking_manager") : true) && (Role.includes('fabric_sourcing') ? ( user && user.role !== "fabric_sourcing") : true) && (Role.includes('fashion_consultant') ? ( user && user.role !== "fashion_consultant") : true) && (Role.includes('tailor') ? ( user && user.role !== "tailor") : true) && (Role.includes('delivery_partner') ? ( user && user.role !== "delivery_partner") :true)) {
            return <Navigate to="/error" />;
        }
    }
        return <Element />;
  }
};

export default Protected;
