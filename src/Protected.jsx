import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ Role, element: Element }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.User);
  if (loading === false) {
    if (isAuthenticated === false) {
      return <Navigate to="/login" />;
    }
    if(Role){

        if ((Role.includes('Admin') ? ( user && user.role !== "Admin") : true) && (Role.includes('Developer') ? ( user && user.role !== "Developer") : true) && (Role.includes('Analyser') ? ( user && user.role !== "Analyser") : true) && (Role.includes('Manager') ? ( user && user.role !== "Manager") : true) && (Role.includes('User Manager') ? ( user && user.role !== "User Manager") : true) && (Role.includes('Sales') ? ( user && user.role !== "Sales") : true) && (Role.includes('Customer') ? ( user && user.role !== "Customer") : true) && (Role.includes('Booking Manager') ? ( user && user.role !== "Booking Manager") : true) && (Role.includes('Fabric Sourcing') ? ( user && user.role !== "Fabric Sourcing") : true) && (Role.includes('Fashion Consultant') ? ( user && user.role !== "Fashion Consultant") : true) && (Role.includes('Tailor') ? ( user && user.role !== "Tailor") : true) && (Role.includes('Delivery Partner') ? ( user && user.role !== "Delivery Partner") :true)) {
            return <Navigate to="/error" />;
        }
    }
        return <Element />;
  }
};

export default Protected;
