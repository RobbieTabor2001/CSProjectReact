import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
  const { currentUser } = useSelector((state) => state.usersReducer);
  if (currentUser && currentUser.role === "ADMIN") {
    return children;
  }else if(currentUser){
    return <Navigate to="/project/account" />;
  }
  return <Navigate to="/project/signin" />;
}

export default ProtectedAdminRoute;
